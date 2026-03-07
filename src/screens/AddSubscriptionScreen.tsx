import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ApiError, CreateItemRequest, itemsApi } from '../services';
import { formatDateInput, parseBrDateInputToIso } from '../utils/date';

const categories = ['Streaming', 'Software', 'Educação', 'Outros'];
const frequencies = ['Mensal', 'Anual', 'Semanal', 'Trimestral'];

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

function parseAmount(amountValue: string): number | null {
  const normalized = amountValue.replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  if (!normalized) {
    return null;
  }

  const amount = Number(normalized);
  if (!Number.isFinite(amount)) {
    return null;
  }

  return amount;
}

export function AddSubscriptionScreen({ navigation }: { navigation: any }) {
  const [serviceName, setServiceName] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0]);
  const [nextBillingDate, setNextBillingDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showFrequencyMenu, setShowFrequencyMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isFormValid = useMemo(
    () => serviceName.trim().length > 0 && amountInput.trim().length > 0 && nextBillingDate.trim().length > 0,
    [serviceName, amountInput, nextBillingDate]
  );

  const handleSave = async () => {
    setFormError(null);

    const parsedAmount = parseAmount(amountInput);
    if (parsedAmount === null || parsedAmount < 0) {
      setFormError('Informe um valor válido.');
      return;
    }

    const parsedNextBillingDate = parseBrDateInputToIso(nextBillingDate);
    if (!parsedNextBillingDate) {
      setFormError('Informe a próxima cobrança em formato válido (DD/MM/AAAA).');
      return;
    }

    const payload: CreateItemRequest = {
      type: 'SUBSCRIPTION',
      title: serviceName.trim(),
      expiryDate: parsedNextBillingDate,
      amount: parsedAmount,
      currency: 'BRL',
      providerName: serviceName.trim(),
      metadata: {
        source: 'mobile',
        frequency: selectedFrequency,
        category: selectedCategory,
        paymentMethod: paymentMethod.trim() || null,
      },
    };

    setIsSubmitting(true);
    try {
      await itemsApi.create(payload, { retry: false });
      Alert.alert('Assinatura salva', 'Sua assinatura foi cadastrada com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError('Não foi possível salvar a assinatura. Tente novamente.');
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
            <Text className="ml-2 text-[18px] font-bold text-[#F8FAFC]">Nova Assinatura</Text>
          </View>
          <TouchableOpacity className="h-9 w-9 items-center justify-center" onPress={() => navigation.navigate('Settings')}>
            <Feather name="settings" size={20} color="#8FA3C0" />
          </TouchableOpacity>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <View className="mx-3 flex-1">
        <ScrollView className="flex-1 px-1 pt-4" contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <FieldLabel>Serviço</FieldLabel>
          <View className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3">
            <View className="h-6 w-6 items-center justify-center rounded-md bg-[#132746]">
              <Feather name="home" size={13} color="#4FA0FF" />
            </View>
            <TextInput
              className="ml-2 flex-1 text-[15px] text-[#EAF0F8]"
              placeholder="Ex: Netflix, Spotify, iCloud"
              placeholderTextColor="#6E7F9B"
              value={serviceName}
              onChangeText={setServiceName}
              autoCapitalize="words"
            />
            <Feather name="search" size={16} color="#8EA0BA" />
          </View>
          <Text className="mb-4 mt-1 text-[12px] italic text-[#6E7F9B]">Digite o nome do serviço para identificar melhor.</Text>

          <View className="mb-4 flex-row justify-between">
            <View className="w-[47%]">
              <FieldLabel>Valor</FieldLabel>
              <View className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3">
                <Text className="text-[16px] font-semibold text-[#8EA0BA]">R$</Text>
                <TextInput
                  className="ml-2 flex-1 text-[15px] text-[#EAF0F8]"
                  placeholder="0,00"
                  placeholderTextColor="#6E7F9B"
                  keyboardType="numeric"
                  value={amountInput}
                  onChangeText={setAmountInput}
                />
              </View>
            </View>

            <View className="w-[47%]">
              <FieldLabel>Frequência</FieldLabel>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowFrequencyMenu((prev) => !prev)}
                className="h-12 flex-row items-center justify-between rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3"
              >
                <Text className="text-[15px] text-[#EAF0F8]">{selectedFrequency}</Text>
                <Feather name="chevron-down" size={17} color="#8EA0BA" />
              </TouchableOpacity>
            </View>
          </View>

          {showFrequencyMenu ? (
            <View className="mb-4 rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-2">
              {frequencies.map((frequency) => (
                <TouchableOpacity
                  key={frequency}
                  onPress={() => {
                    setSelectedFrequency(frequency);
                    setShowFrequencyMenu(false);
                  }}
                  className={`rounded-lg px-3 py-2 ${selectedFrequency === frequency ? 'bg-[#123350]' : ''}`}
                >
                  <Text className={`text-[14px] ${selectedFrequency === frequency ? 'text-[#19D6FF]' : 'text-[#D6E2F2]'}`}>{frequency}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <FieldLabel>Próxima Cobrança</FieldLabel>
          <DarkInput
            placeholder="DD/MM/AAAA"
            icon="calendar"
            keyboardType="numeric"
            value={nextBillingDate}
            onChangeText={(value) => setNextBillingDate(formatDateInput(value))}
            autoCapitalize="none"
          />

          <View className="mt-3">
            <FieldLabel>Método de Pagamento</FieldLabel>
            <DarkInput
              placeholder="Ex: Cartão Visa final 4422"
              icon="credit-card"
              value={paymentMethod}
              onChangeText={setPaymentMethod}
            />
          </View>

          <FieldLabel>Categoria</FieldLabel>
          <View className="mb-6 flex-row flex-wrap gap-2">
            {categories.map((category) => {
              const selected = selectedCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.85}
                  onPress={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 ${selected ? 'border-[#19D6FF] bg-[#123350]' : 'border-[#24354F] bg-[#0F1A2E]'}`}
                >
                  <Text className={`text-[13px] font-semibold ${selected ? 'text-[#19D6FF]' : 'text-[#7E8FA8]'}`}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

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
            {isSubmitting ? <ActivityIndicator color="#031529" /> : <Text className="text-[17px] font-bold text-[#031529]">Salvar Assinatura</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
