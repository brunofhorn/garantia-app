import { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { ApiError, Item, itemsApi } from '../services';
import { formatDatePtBr } from '../utils/date';

type FolderItem = {
  id: string;
  name: string;
  files: string;
  icon: keyof typeof Feather.glyphMap;
  accent: string;
};

type FileItem = {
  id: string;
  name: string;
  meta: string;
  date: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
};

function toRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as Record<string, unknown>;
}

function readString(record: Record<string, unknown> | null, key: string): string | null {
  if (!record) {
    return null;
  }

  const value = record[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function resolveDocumentType(item: Item): string {
  const metadata = toRecord(item.metadata);
  return readString(metadata, 'documentType') ?? item.providerName ?? 'Documento';
}

function resolveFolderVisual(name: string): { icon: keyof typeof Feather.glyphMap; accent: string } {
  const normalized = name.toLowerCase();
  if (normalized.includes('nota')) {
    return { icon: 'file-text', accent: '#2A8CFF' };
  }

  if (normalized.includes('contrato') || normalized.includes('procuração')) {
    return { icon: 'briefcase', accent: '#60A5FA' };
  }

  if (normalized.includes('manual')) {
    return { icon: 'book-open', accent: '#55A5FF' };
  }

  return { icon: 'file', accent: '#8F9FB8' };
}

function resolveFileVisual(item: Item): { icon: keyof typeof Feather.glyphMap; iconBg: string; iconColor: string } {
  const type = resolveDocumentType(item).toLowerCase();
  if (type.includes('passaporte')) {
    return { icon: 'globe', iconBg: '#2B1521', iconColor: '#F43F5E' };
  }

  if (type.includes('nota')) {
    return { icon: 'file-text', iconBg: '#2B1521', iconColor: '#EF4444' };
  }

  if (type.includes('cnh') || type.includes('rg')) {
    return { icon: 'file', iconBg: '#152340', iconColor: '#3B82F6' };
  }

  return { icon: 'folder', iconBg: '#2B2415', iconColor: '#F59E0B' };
}

function mapDocumentsToFolders(items: Item[]): FolderItem[] {
  const grouped = new Map<string, number>();

  for (const item of items) {
    const type = resolveDocumentType(item);
    grouped.set(type, (grouped.get(type) ?? 0) + 1);
  }

  return Array.from(grouped.entries()).map(([name, count]) => {
    const visual = resolveFolderVisual(name);
    return {
      id: name,
      name,
      files: `${count} ${count === 1 ? 'arquivo' : 'arquivos'}`,
      ...visual,
    };
  });
}

function mapItemToFile(item: Item): FileItem {
  const visual = resolveFileVisual(item);
  const documentType = resolveDocumentType(item).toUpperCase();
  const descriptor = item.description ? item.description.replace(/^Nº\s*/i, '') : 'Sem identificação';
  const sentDate = item.updatedAt ?? item.createdAt ?? item.startDate ?? item.expiryDate;

  return {
    id: item.id,
    name: item.title,
    meta: `${documentType} • ${descriptor}`,
    date: `Enviado em ${formatDatePtBr(sentDate)}`,
    ...visual,
  };
}

function FolderCard({ item }: { item: FolderItem }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      className="mr-3 w-[165px] rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-4"
      style={{ borderLeftWidth: 3, borderLeftColor: item.accent }}
    >
      <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#12223C]">
        <Feather name={item.icon} size={17} color={item.accent} />
      </View>
      <Text className="mt-5 text-[16px] font-bold text-[#EAF0F8]">{item.name}</Text>
      <Text className="mt-1 text-[14px] text-[#73839D]">{item.files}</Text>
    </TouchableOpacity>
  );
}

function FileRow({ item }: { item: FileItem }) {
  return (
    <TouchableOpacity activeOpacity={0.88} className="mb-3 rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-3">
      <View className="flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: item.iconBg }}>
          <Feather name={item.icon} size={20} color={item.iconColor} />
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-[16px] font-bold text-[#EAF0F8]" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="mt-0.5 text-[12px] font-semibold tracking-[0.4px] text-[#5D6D86]">{item.meta}</Text>
          <Text className="mt-1 text-[13px] text-[#9AA8BE]">{item.date}</Text>
        </View>

        <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.75}>
          <Feather name="more-vertical" size={18} color="#8EA0BA" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export function DocumentsScreen({ navigation }: { navigation: any }) {
  const [documents, setDocuments] = useState<Item[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const loadDocuments = useCallback(async () => {
    try {
      const result = await itemsApi.list(
        {
          type: 'DOCUMENT',
          sortBy: 'updatedAt',
          sortOrder: 'desc',
          pageSize: 100,
        },
        {
          retry: { enabled: true, retries: 1 },
        }
      );

      setDocuments(result.items);
      setApiError(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError('Falha ao carregar documentos.');
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadDocuments();
    }, [loadDocuments])
  );

  const folders = useMemo(() => mapDocumentsToFolders(documents), [documents]);
  const recentFiles = useMemo(() => documents.map(mapItemToFile), [documents]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('UserProfile')} className="flex-row items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full border border-[#1DE2FF]/60 bg-[#0E243D]">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#112C4A]">
                  <Feather name="user" size={20} color="#8BD9FF" />
                </View>
              </View>
              <View className="ml-4">
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#5F7391]">BEM-VINDO</Text>
                <Text className="text-[18px] font-bold text-[#F8FAFC]">Documentos</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center">
                <Feather name="search" size={24} color="#8FA3C0" />
              </TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center">
                <Feather name="bell" size={24} color="#8FA3C0" />
                <View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
              </TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center" onPress={() => navigation.navigate('Settings')}>
                <Feather name="settings" size={24} color="#8FA3C0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {apiError ? (
          <View className="mt-4 rounded-lg border border-[#3A2431] bg-[#25131C] p-3">
            <Text className="text-[13px] text-[#FF8899]">API: {apiError}</Text>
          </View>
        ) : null}

        <AnimatedEntrance delay={40}>
          <View className="mt-5 flex-row items-center justify-between">
            <Text className="text-[15px] font-bold tracking-[1.5px] text-[#7F8FA9]">PASTAS RECENTES</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-[15px] font-semibold text-[#2A8CFF]">Ver tudo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10, paddingBottom: 3 }}>
            {folders.map((item) => (
              <FolderCard key={item.id} item={item} />
            ))}
            {folders.length === 0 ? (
              <View className="rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-4 py-5">
                <Text className="text-[14px] text-[#91A3BE]">Nenhuma pasta disponível.</Text>
              </View>
            ) : null}
          </ScrollView>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mt-5 flex-row items-center justify-between">
            <Text className="text-[15px] font-bold tracking-[1.5px] text-[#7F8FA9]">ARQUIVOS RECENTES</Text>
            <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.8}>
              <Feather name="filter" size={16} color="#8FA3C0" />
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            {recentFiles.map((item) => (
              <FileRow key={item.id} item={item} />
            ))}
            {recentFiles.length === 0 ? (
              <View className="rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-4">
                <Text className="text-[15px] text-[#90A3BF]">Nenhum documento cadastrado.</Text>
              </View>
            ) : null}
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
