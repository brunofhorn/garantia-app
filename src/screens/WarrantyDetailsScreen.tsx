import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';
import { ApiError, Item, ItemFile, filesApi, itemsApi } from '../services';
import { RootStackParamList } from '../types';
import { calculateProgress, daysUntil, formatDatePtBr } from '../utils/date';

type Props = NativeStackScreenProps<RootStackParamList, 'WarrantyDetails'>;

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

function getRemainingLabel(expiryDate?: string): string {
  const diff = daysUntil(expiryDate);

  if (diff === null) {
    return 'Sem data de validade';
  }

  if (diff < 0) {
    const absolute = Math.abs(diff);
    return absolute === 1 ? 'Expirada há 1 dia' : `Expirada há ${absolute} dias`;
  }

  if (diff === 0) {
    return 'Expira hoje';
  }

  if (diff >= 30) {
    const months = Math.floor(diff / 30);
    const days = diff % 30;
    if (months > 0) {
      return `${months} ${months === 1 ? 'mês' : 'meses'} e ${days} dias restantes`;
    }
  }

  return diff === 1 ? '1 dia restante' : `${diff} dias restantes`;
}

function resolveMainImage(item: Item): string | null {
  const metadata = toRecord(item.metadata);
  return readString(metadata, 'imageUrl');
}

function resolveDocumentImage(item: Item, files: ItemFile[]): string | null {
  const metadata = toRecord(item.metadata);
  const metadataDocument = readString(metadata, 'documentUrl');
  if (metadataDocument) {
    return metadataDocument;
  }

  const firstFile = files[0];
  if (!firstFile) {
    return null;
  }

  if (firstFile.storageKey.startsWith('http://') || firstFile.storageKey.startsWith('https://')) {
    return firstFile.storageKey;
  }

  return null;
}

export function WarrantyDetailsScreen({ navigation, route }: Props) {
  const [warranty, setWarranty] = useState<Item | null>(null);
  const [files, setFiles] = useState<ItemFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const loadWarrantyDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const [item, fileResult] = await Promise.all([
        itemsApi.getById(route.params.warrantyId, { retry: { enabled: true, retries: 1 } }),
        filesApi.listByItem(route.params.warrantyId, { retry: { enabled: true, retries: 1 } }),
      ]);

      setWarranty(item);
      setFiles(fileResult.items);
      setApiError(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError('Falha ao carregar detalhes da garantia.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [route.params.warrantyId]);

  useEffect(() => {
    void loadWarrantyDetails();
  }, [loadWarrantyDetails]);

  const mainImage = useMemo(() => (warranty ? resolveMainImage(warranty) : null), [warranty]);
  const documentImage = useMemo(() => (warranty ? resolveDocumentImage(warranty, files) : null), [warranty, files]);
  const progress = useMemo(() => {
    if (!warranty) {
      return 0;
    }

    return Math.max(0.06, calculateProgress(warranty.startDate, warranty.expiryDate));
  }, [warranty]);

  const isExpired = warranty?.status === 'EXPIRED' || (daysUntil(warranty?.expiryDate) ?? 0) < 0;
  const statusText = isExpired ? 'Fora da Validade' : 'Dentro da Validade';
  const statusBg = isExpired ? '#FEE2E2' : '#DCFCE7';
  const statusColor = isExpired ? '#B91C1C' : '#15803D';

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#E5E7EB]">
        <StandardPageHeader title="Detalhes da Garantia" navigation={navigation} showBack />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1D4ED8" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Detalhes da Garantia" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] px-4">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          {apiError ? (
            <View className="mt-4 rounded-lg border border-[#E6B0B0] bg-[#FDECEC] p-3">
              <Text className="text-[13px] text-[#B42318]">API: {apiError}</Text>
            </View>
          ) : null}

          {warranty ? (
            <>
              <AnimatedEntrance delay={30}>
                <View className="mt-3 flex-row justify-end gap-2">
                  <TouchableOpacity className="h-9 w-9 items-center justify-center rounded-lg border border-appBorder bg-white">
                    <Feather name="edit-2" size={18} color="#111827" />
                  </TouchableOpacity>
                  <TouchableOpacity className="h-9 w-9 items-center justify-center rounded-lg border border-appBorder bg-white">
                    <Feather name="trash-2" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                {mainImage ? (
                  <Image source={{ uri: mainImage }} className="mt-3 h-52 w-full rounded-3xl" />
                ) : (
                  <View className="mt-3 h-52 w-full items-center justify-center rounded-3xl border border-[#D8DEE8] bg-[#E6EBF3]">
                    <Feather name="image" size={34} color="#95A3B8" />
                    <Text className="mt-2 text-[14px] text-[#78879D]">Sem foto do produto</Text>
                  </View>
                )}
              </AnimatedEntrance>

              <AnimatedEntrance delay={90}>
                <View className="mt-5 flex-row items-center">
                  <View style={{ backgroundColor: '#0F766E' }} className="h-14 w-14 items-center justify-center rounded-full">
                    <Text className="text-[11px] font-bold text-white">
                      {(warranty.providerName ?? 'LOJA').slice(0, 4).toUpperCase()}
                    </Text>
                  </View>
                  <Text className="ml-3 text-[28px] font-semibold text-appText">{warranty.providerName ?? 'Loja'}</Text>
                </View>
                <Text className="mt-3 text-[34px] font-bold leading-[40px] text-appText">{warranty.title}</Text>
              </AnimatedEntrance>

              <AnimatedEntrance delay={130}>
                <View className="mt-5 rounded-3xl border border-appBorder bg-[#F7F7F8] p-5">
                  <Text className="text-[16px] font-semibold text-[#64748B]">Status da Garantia</Text>
                  <View className="mt-4 h-3 rounded-full bg-[#D1D5DB]">
                    <View className="h-3 rounded-full" style={{ width: `${progress * 100}%`, backgroundColor: isExpired ? '#EF4444' : '#22C55E' }} />
                  </View>
                  <Text className="mt-5 text-[30px] font-bold leading-[36px] text-appText">{getRemainingLabel(warranty.expiryDate)}</Text>
                  <View className="mt-4 self-start rounded-full px-4 py-2" style={{ backgroundColor: statusBg }}>
                    <Text className="text-[14px] font-semibold" style={{ color: statusColor }}>
                      {statusText}
                    </Text>
                  </View>
                  <View className="my-5 h-[1px] bg-appBorder" />
                  <View className="flex-row justify-between">
                    <View>
                      <Text className="text-[14px] text-appMuted">Início da Garantia</Text>
                      <Text className="mt-1 text-[18px] font-semibold text-appText">{formatDatePtBr(warranty.startDate)}</Text>
                    </View>
                    <View>
                      <Text className="text-[14px] text-appMuted">Fim da Garantia</Text>
                      <Text className="mt-1 text-[18px] font-semibold text-appText">{formatDatePtBr(warranty.expiryDate)}</Text>
                    </View>
                  </View>
                </View>
              </AnimatedEntrance>

              <AnimatedEntrance delay={170}>
                <View className="mt-5 rounded-3xl border border-appBorder bg-[#F7F7F8] p-5">
                  <Text className="text-[20px] font-bold text-appText">Documento da Garantia</Text>
                  {documentImage ? (
                    <Image source={{ uri: documentImage }} className="mt-4 h-64 w-full rounded-3xl" />
                  ) : (
                    <View className="mt-4 h-40 w-full items-center justify-center rounded-3xl border border-[#D8DEE8] bg-[#E6EBF3]">
                      <Feather name="file-text" size={30} color="#95A3B8" />
                      <Text className="mt-2 text-[14px] text-[#78879D]">
                        {files[0]?.fileName ?? 'Nenhum documento anexado'}
                      </Text>
                    </View>
                  )}
                  <Text className="mt-3 text-center text-[16px] text-appMuted">
                    {files.length > 0 ? 'Toque para ampliar' : 'Adicione um documento para visualização'}
                  </Text>
                </View>
              </AnimatedEntrance>
            </>
          ) : (
            <View className="mt-6 rounded-xl border border-[#D7DCE4] bg-white p-4">
              <Text className="text-[15px] text-[#64748B]">Garantia não encontrada.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
