import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApiError } from '../services';
import { useAuth } from '../contexts/AuthContext';

export function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('bruno+demo@example.com');
  const [password, setPassword] = useState('StrongPass123!');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await signIn({
        email: email.trim(),
        password,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Não foi possível entrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#060D1A]">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 px-6">
        <View className="mt-10 rounded-2xl border border-[#1C2A45] bg-[#0D172B] p-5">
          <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#1687FF]/25">
            <Feather name="shield" size={24} color="#29A4FF" />
          </View>

          <Text className="mt-5 text-[26px] font-bold text-[#F3F7FF]">Entrar</Text>
          <Text className="mt-1 text-[15px] text-[#8090AA]">Use sua conta para acessar suas garantias e assinaturas.</Text>

          <View className="mt-6">
            <Text className="mb-2 text-[13px] font-semibold text-[#8CA0BF]">E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="seuemail@dominio.com"
              placeholderTextColor="#64748B"
              autoCapitalize="none"
              keyboardType="email-address"
              className="h-12 rounded-xl border border-[#223453] bg-[#0B1426] px-4 text-[15px] text-[#E7EDF8]"
            />
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-[13px] font-semibold text-[#8CA0BF]">Senha</Text>
            <View className="h-12 flex-row items-center rounded-xl border border-[#223453] bg-[#0B1426] px-4">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                placeholderTextColor="#64748B"
                secureTextEntry={!showPassword}
                className="flex-1 text-[15px] text-[#E7EDF8]"
              />
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} className="pl-3" activeOpacity={0.8}>
                <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color="#8CA0BF" />
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage ? <Text className="mt-3 text-[13px] text-[#FF6B6B]">{errorMessage}</Text> : null}

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading || !email.trim() || !password}
            activeOpacity={0.86}
            className="mt-6 h-12 items-center justify-center rounded-xl bg-[#1E90FF]"
            style={{ opacity: loading || !email.trim() || !password ? 0.6 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-[16px] font-bold text-white">Acessar conta</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
