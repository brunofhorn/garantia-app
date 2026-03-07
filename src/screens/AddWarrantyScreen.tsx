import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ApiError, CreateItemRequest, itemsApi } from '../services';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddWarranty'>;
type DateField = 'purchase' | 'expiry';

function FieldLabel({ children }: { children: string }) {
  return <Text className="mb-2 text-[13px] font-semibold tracking-[0.4px] text-[#8FA3C0]">{children}</Text>;
}

type DarkInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon?: keyof typeof Feather.glyphMap;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

function DarkInput({
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: DarkInputProps) {
  return (
    <View className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="flex-1 text-[15px] text-[#EAF0F8]"
        placeholder={placeholder}
        placeholderTextColor="#6E7F9B"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {icon ? <Feather name={icon} size={16} color="#8EA0BA" /> : null}
    </View>
  );
}

type DateInputProps = {
  placeholder: string;
  value: Date | null;
  onPress: () => void;
};

function formatDateForDisplay(value: Date | null): string {
  if (!value) {
    return '';
  }

  const dd = String(value.getDate()).padStart(2, '0');
  const mm = String(value.getMonth() + 1).padStart(2, '0');
  const yyyy = String(value.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function toIsoDateOnly(value: Date): string {
  const dd = String(value.getDate()).padStart(2, '0');
  const mm = String(value.getMonth() + 1).padStart(2, '0');
  const yyyy = String(value.getFullYear());
  return `${yyyy}-${mm}-${dd}`;
}

function toStartOfDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function DateInput({ placeholder, value, onPress }: DateInputProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3"
    >
      <Text className={`flex-1 text-[15px] ${value ? 'text-[#EAF0F8]' : 'text-[#6E7F9B]'}`}>
        {value ? formatDateForDisplay(value) : placeholder}
      </Text>
      <Feather name="calendar" size={16} color="#8EA0BA" />
    </TouchableOpacity>
  );
}

function UploadBlock({ title, subtitle, icon }: { title: string; subtitle: string; icon: keyof typeof Feather.glyphMap }) {
  return (
    <TouchableOpacity activeOpacity={0.86} className="mb-4 rounded-xl border border-dashed border-[#2A8CFF]/60 bg-[#0F1A2E] px-4 py-8">
      <View className="items-center">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-[#132746]">
          <Feather name={icon} size={20} color="#4FA0FF" />
        </View>
        <Text className="mt-3 text-[16px] font-semibold text-[#EAF0F8]">{title}</Text>
        <Text className="mt-1 text-[13px] text-[#7E8FA8]">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function AddWarrantyScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [storeName, setStoreName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [activeDateField, setActiveDateField] = useState<DateField | null>(null);
  const [draftDate, setDraftDate] = useState<Date>(new Date());
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);
  const [showIosPickerModal, setShowIosPickerModal] = useState(false);

  const isFormValid = useMemo(() => title.trim().length > 0 && Boolean(expiryDate), [title, expiryDate]);

  const applyDate = (field: DateField, date: Date) => {
    const normalized = toStartOfDay(date);
    if (field === 'purchase') {
      setPurchaseDate(normalized);
    } else {
      setExpiryDate(normalized);
    }
  };

  const handleOpenDatePicker = (field: DateField) => {
    setFormError(null);
    setActiveDateField(field);
    const current = field === 'purchase' ? purchaseDate : expiryDate;
    setDraftDate(current ?? new Date());

    if (Platform.OS === 'ios') {
      setShowIosPickerModal(true);
      return;
    }

    setShowAndroidPicker(true);
  };

  const handleAndroidDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowAndroidPicker(false);
      return;
    }

    if (selectedDate && activeDateField) {
      applyDate(activeDateField, selectedDate);
    }

    setShowAndroidPicker(false);
  };

  const handleConfirmIosDate = () => {
    if (activeDateField) {
      applyDate(activeDateField, draftDate);
    }

    setShowIosPickerModal(false);
  };

  const handleSave = async () => {
    setFormError(null);

    if (!title.trim()) {
      setFormError('Informe o nome do produto.');
      return;
    }

    if (!expiryDate) {
      setFormError('Informe a data de fim da garantia.');
      return;
    }

    if (purchaseDate && expiryDate.getTime() < purchaseDate.getTime()) {
      setFormError('A data de fim da garantia não pode ser anterior à data de compra.');
      return;
    }

    const payload: CreateItemRequest = {
      type: 'WARRANTY',
      title: title.trim(),
      expiryDate: toIsoDateOnly(expiryDate),
      startDate: purchaseDate ? toIsoDateOnly(purchaseDate) : undefined,
      providerName: storeName.trim() || undefined,
      metadata: {
        source: 'mobile',
      },
    };

    setIsSubmitting(true);

    try {
      await itemsApi.create(payload, { retry: false });
      Alert.alert('Garantia salva', 'Sua garantia foi cadastrada com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError('Não foi possível salvar a garantia. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="flex-row items-center justify-between px-5 py-5">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={navigation.goBack} className="h-9 w-9 items-center justify-center">
              <Feather name="arrow-left" size={20} color="#8FA3C0" />
            </TouchableOpacity>
            <Text className="ml-2 text-[18px] font-bold text-[#F8FAFC]">Nova Garantia</Text>
          </View>
          <TouchableOpacity className="h-9 w-9 items-center justify-center" onPress={() => navigation.navigate('Settings')}>
            <Feather name="settings" size={20} color="#8FA3C0" />
          </TouchableOpacity>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <View className="mx-3 flex-1">
        <ScrollView className="flex-1 px-1 pt-4" contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <FieldLabel>Nome do Produto</FieldLabel>
          <DarkInput placeholder="Ex: Smartphone Samsung S23" value={title} onChangeText={setTitle} autoCapitalize="words" />

          <View className="mb-1 mt-4 flex-row justify-between">
            <View className="w-[48%]">
              <FieldLabel>Data da Compra</FieldLabel>
              <DateInput placeholder="DD/MM/AAAA" value={purchaseDate} onPress={() => handleOpenDatePicker('purchase')} />
            </View>
            <View className="w-[48%]">
              <FieldLabel>Fim da Garantia</FieldLabel>
              <DateInput placeholder="DD/MM/AAAA" value={expiryDate} onPress={() => handleOpenDatePicker('expiry')} />
            </View>
          </View>

          <View className="mt-2">
            <FieldLabel>Loja</FieldLabel>
            <DarkInput placeholder="Nome ou URL da loja" icon="shopping-bag" value={storeName} onChangeText={setStoreName} autoCapitalize="words" />
          </View>

          <View className="mt-4">
            <FieldLabel>Foto do Produto</FieldLabel>
            <UploadBlock title="Adicionar foto do produto" subtitle="Imagem clara para identificação" icon="image" />
          </View>

          <FieldLabel>Documento da Garantia</FieldLabel>
          <UploadBlock title="Enviar nota fiscal ou contrato" subtitle="PDF ou foto do comprovante" icon="file-text" />

          {formError ? (
            <View className="mt-1 rounded-lg border border-[#4B2632] bg-[#25131C] p-3">
              <Text className="text-[13px] text-[#FF8AA1]">{formError}</Text>
            </View>
          ) : null}
        </ScrollView>

        <View className="pb-8">
          <TouchableOpacity
            onPress={() => void handleSave()}
            disabled={!isFormValid || isSubmitting}
            activeOpacity={0.9}
            className="h-12 items-center justify-center rounded-xl bg-[#1BD5FF]"
            style={{
              borderWidth: 3,
              borderColor: '#060D1A',
              shadowColor: '#00D4FF',
              shadowOpacity: 0.35,
              shadowRadius: 10,
              elevation: 6,
              opacity: !isFormValid || isSubmitting ? 0.65 : 1,
            }}
          >
            {isSubmitting ? <ActivityIndicator color="#031529" /> : <Text className="text-[17px] font-bold text-[#031529]">Salvar Garantia</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {showAndroidPicker && activeDateField ? (
        <DateTimePicker
          value={draftDate}
          mode="date"
          display="default"
          onChange={handleAndroidDateChange}
        />
      ) : null}

      <Modal visible={showIosPickerModal} transparent animationType="slide" onRequestClose={() => setShowIosPickerModal(false)}>
        <View className="flex-1 justify-end bg-black/45">
          <View className="rounded-t-3xl border border-[#1F2C45] bg-[#0A1222] px-5 pb-8 pt-4">
            <View className="mb-2 h-1 w-14 self-center rounded-full bg-[#334155]" />
            <View className="mb-2 flex-row items-center justify-between">
              <TouchableOpacity onPress={() => setShowIosPickerModal(false)} className="px-2 py-2">
                <Text className="text-[15px] font-semibold text-[#8FA3C0]">Cancelar</Text>
              </TouchableOpacity>
              <Text className="text-[15px] font-semibold text-[#EAF0F8]">Selecionar data</Text>
              <TouchableOpacity onPress={handleConfirmIosDate} className="px-2 py-2">
                <Text className="text-[15px] font-semibold text-[#1BD5FF]">Confirmar</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={draftDate}
              mode="date"
              display="spinner"
              onChange={(_, selected) => {
                if (selected) {
                  setDraftDate(toStartOfDay(selected));
                }
              }}
              textColor="#EAF0F8"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
