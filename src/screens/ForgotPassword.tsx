import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recuperarSenha } from '../auth/authService'; // Usa o serviço de recuperação de senha

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMessage('Por favor, preencha o campo de e-mail');
      return;
    }

    try {
      await recuperarSenha(email); // Chama o serviço de recuperação de senha
      setErrorMessage(null);
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      setErrorMessage('Erro ao tentar recuperar senha');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueci minha senha</Text>
      <Text style={styles.subtitle}>Digite seu email para redefinir a senha</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Lembrou a senha?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Entrar
        </Text>
      </Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  resetButton: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#888',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
