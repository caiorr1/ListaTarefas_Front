import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { ProvedorEstadoGlobal, useEstadoGlobal } from '../hooks/EstadoGlobal'; // Usa o estado global
import AdicionarTarefa from '../components/AdicionarTarefa';
import ListaTarefas from '../components/ListaTarefas';
import { realizarLogout } from '../auth/authService'; // Serviço de logout

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { tarefas } = useEstadoGlobal();

  const handleLogout = async () => {
    await realizarLogout(); // Realiza o logout removendo o token
    navigation.navigate('Login'); // Redireciona para a tela de login
  };

  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <View style={styles.container}>
          <Text style={styles.title}>To-Do List</Text>
          <Text style={styles.subtitle}>Gerencie suas tarefas</Text>
          <AdicionarTarefa />
          <ListaTarefas />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    alignItems: 'center',
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
  logoutButton: {
    width: '100%',
    maxWidth: 360,
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default HomeScreen;
