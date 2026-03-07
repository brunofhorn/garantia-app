import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ApiError, CreateItemRequest, itemsApi } from '../services';
import { formatDateInput, parseBrDateInputToIso } from '../utils/date';

const documentTypes = ['RG', 'CNH', 'Passaporte', 'Procuração', 'Contrato', 'Nota Fiscal'];

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

export function AddDocumentScreen({ navigation }: { navigation: any }) {
  const [documentType, setDocumentType] = useState(documentTypes[0]);
  const [name, setName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isPermanent, setIsPermanent] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isFormValid = useMemo(
    () => name.trim().length > 0 && (isPermanent || expiryDate.trim().length > 0),
    [name, isPermanent, expiryDate]
  );

  const handleSave = async () => {
    setFormError(null);

    const parsedIssueDate = issueDate.trim() ? parseBrDateInputToIso(issueDate) : null;
    if (issueDate.trim() && !parsedIssueDate) {
      setFormError('Informe uma data de emissão válida (DD/MM/AAAA).');
      return;
    }

    let parsedExpiryDate: string | null = null;
    if (isPermanent) {
      parsedExpiryDate = '2999-12-31';
    } else {
      parsedExpiryDate = parseBrDateInputToIso(expiryDate);
      if (!parsedExpiryDate) {
        setFormError('Informe uma data de validade válida (DD/MM/AAAA).');
        return;
      }
    }

    const payload: CreateItemRequest = {
      type: 'DOCUMENT',
      title: name.trim(),
      description: documentNumber.trim() ? `Nº ${documentNumber.trim()}` : undefined,
      startDate: parsedIssueDate ?? undefined,
      expiryDate: parsedExpiryDate,
      providerName: documentType,
      metadata: {
        source: 'mobile',
        documentType,
        documentNumber: documentNumber.trim() || null,
        isPermanent,
      },
    };

    setIsSubmitting(true);
    try {
      await itemsApi.create(payload, { retry: false });
      Alert.alert('Documento salvo', 'Seu documento foi cadastrado com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError('Não foi possível salvar o documento. Tente novamente.');
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
            <Text className="ml-2 text-[18px] font-bold text-[#F8FAFC]">Novo Documento</Text>
          </View>
          <TouchableOpacity className="h-9 w-9 items-center justify-center" onPress={() => navigation.navigate('Settings')}>
            <Feather name="settings" size={20} color="#8FA3C0" />
          </TouchableOpacity>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <View className="mx-3 flex-1">
        <ScrollView className="flex-1 px-1 pt-4" contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={0.88} className="mb-4 rounded-xl border border-dashed border-[#2A8CFF]/60 bg-[#0F1A2E] px-4 py-8">
            <View className="items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-[#132746]">
                <Feather name="camera" size={20} color="#4FA0FF" />
              </View>
              <Text className="mt-3 text-[16px] font-semibold text-[#EAF0F8]">Adicionar Foto ou Arquivo</Text>
              <Text className="mt-1 text-[13px] text-[#7E8FA8]">Tire uma foto ou selecione um PDF</Text>
              <Pressable className="mt-4 h-10 items-center justify-center rounded-lg bg-[#1BD5FF] px-7">
                <Text className="text-[15px] font-semibold text-[#031529]">Selecionar</Text>
              </Pressable>
            </View>
          </TouchableOpacity>

          <FieldLabel>Tipo de Documento</FieldLabel>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setShowTypeMenu((prev) => !prev)}
            className="mb-2 h-12 flex-row items-center justify-between rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3"
          >
            <Text className="text-[15px] text-[#EAF0F8]">{documentType}</Text>
            <Feather name="chevron-down" size={17} color="#8EA0BA" />
          </TouchableOpacity>
          {showTypeMenu ? (
            <View className="mb-4 rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-2">
              {documentTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setDocumentType(type);
                    setShowTypeMenu(false);
                  }}
                  className={`rounded-lg px-3 py-2 ${documentType === type ? 'bg-[#123350]' : ''}`}
                >
                  <Text className={`text-[14px] ${documentType === type ? 'text-[#19D6FF]' : 'text-[#D6E2F2]'}`}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="mb-4" />
          )}

          <FieldLabel>Nome ou Apelido</FieldLabel>
          <DarkInput placeholder="Ex: Meu RG Principal" value={name} onChangeText={setName} autoCapitalize="words" />

          <View className="mt-3">
            <FieldLabel>Número do Documento</FieldLabel>
            <DarkInput placeholder="00.000.000-0" value={documentNumber} onChangeText={setDocumentNumber} autoCapitalize="none" />
          </View>

          <View className="mb-2 mt-4 flex-row justify-between">
            <View className="w-[48%]">
              <FieldLabel>Data de Emissão</FieldLabel>
              <DarkInput
                placeholder="DD/MM/AAAA"
                icon="calendar"
                keyboardType="numeric"
                value={issueDate}
                onChangeText={(value) => setIssueDate(formatDateInput(value))}
                autoCapitalize="none"
              />
            </View>
            <View className="w-[48%]">
              <FieldLabel>Data de Validade</FieldLabel>
              <DarkInput
                placeholder={isPermanent ? 'Permanente' : 'DD/MM/AAAA'}
                icon="calendar"
                keyboardType="numeric"
                value={isPermanent ? '' : expiryDate}
                onChangeText={(value) => setExpiryDate(formatDateInput(value))}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="mb-4 mt-2 flex-row items-center justify-between rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3 py-3">
            <View>
              <Text className="text-[15px] font-semibold text-[#EAF0F8]">Documento Permanente</Text>
              <Text className="text-[12px] text-[#7E8FA8]">Não possui data de validade</Text>
            </View>
            <Switch
              value={isPermanent}
              onValueChange={setIsPermanent}
              trackColor={{ false: '#24354F', true: '#1BD5FF' }}
              thumbColor={isPermanent ? '#031529' : '#8EA0BA'}
            />
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
            {isSubmitting ? <ActivityIndicator color="#031529" /> : <Text className="text-[17px] font-bold text-[#031529]">Salvar Documento</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
