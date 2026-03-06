import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

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

const folders: FolderItem[] = [
  { id: '1', name: 'Notas Fiscais', files: '12 arquivos', icon: 'file-text', accent: '#2A8CFF' },
  { id: '2', name: 'Manuais', files: '8 arquivos', icon: 'book-open', accent: '#55A5FF' },
  { id: '3', name: 'Contratos', files: '6 arquivos', icon: 'briefcase', accent: '#8F9FB8' },
];

const recentFiles: FileItem[] = [
  {
    id: '1',
    name: 'Nota_Fiscal_iPhone_15.pdf',
    meta: 'IPHONE 15 PRO MAX • 1.2 MB',
    date: 'Enviado em 12 Out, 2023',
    icon: 'file-text',
    iconBg: '#2B1521',
    iconColor: '#EF4444',
  },
  {
    id: '2',
    name: 'Garantia_Monitor_Dell.jpg',
    meta: 'MONITOR DELL U2723QE • 4.5 MB',
    date: 'Enviado em 05 Nov, 2023',
    icon: 'image',
    iconBg: '#2B2415',
    iconColor: '#F59E0B',
  },
  {
    id: '3',
    name: 'Contrato_Aluguel_Sede.pdf',
    meta: 'IMÓVEL COMERCIAL • 850 KB',
    date: 'Enviado em 28 Set, 2023',
    icon: 'file-minus',
    iconBg: '#2B1521',
    iconColor: '#F43F5E',
  },
  {
    id: '4',
    name: 'Manual_Usuario_Tesla_M3.pdf',
    meta: 'TESLA MODEL 3 • 12.4 MB',
    date: 'Enviado em 15 Ago, 2023',
    icon: 'file',
    iconBg: '#152340',
    iconColor: '#3B82F6',
  },
];

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
          <Text className="text-[16px] font-bold text-[#EAF0F8]" numberOfLines={1}>{item.name}</Text>
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
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#060D1A]">
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
              <TouchableOpacity className="h-10 w-10 items-center justify-center"><Feather name="search" size={24} color="#8FA3C0" /></TouchableOpacity>
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
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
