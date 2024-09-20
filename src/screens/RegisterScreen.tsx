import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { registrarUsuario } from '../auth/authService'; // Importa o serviço de registro

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      await registrarUsuario(username, password); // Chama o serviço de registro
      setErrorMessage(null);
      navigation.navigate('Login'); // Redireciona para a tela de login após o registro
    } catch (error) {
      setErrorMessage('Erro ao registrar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <Text style={styles.subtitle}>Crie sua conta</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Já tem uma conta?{' '}
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
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 10,
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
  registerButton: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
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

export default RegisterScreen;
