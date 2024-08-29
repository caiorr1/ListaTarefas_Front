import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Importa componentes essenciais do React Native
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importa o tipo para navegação de pilha (stack) nativa
import { NativeBaseProvider } from 'native-base'; // Importa o provedor do Native Base para estilização e componentes
import { ProvedorEstadoGlobal } from '../hooks/EstadoGlobal'; // Importa o provedor de estado global personalizado
import AdicionarTarefa from '../components/AdicionarTarefa'; // Importa o componente para adicionar tarefas
import ListaTarefas from '../components/ListaTarefas'; // Importa o componente que lista as tarefas

// Define o tipo para as propriedades que o componente HomeScreen espera receber
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>; // A propriedade 'navigation' permite navegação entre telas
};

// Define o componente funcional HomeScreen
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Função para lidar com o logout, redirecionando para a tela de Login
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    // NativeBaseProvider envolve os componentes para fornecer temas e estilos do Native Base
    <NativeBaseProvider>
      {/* ProvedorEstadoGlobal envolve os componentes para fornecer estado global */}
      <ProvedorEstadoGlobal>
        {/* View principal que contém a estrutura da tela */}
        <View style={styles.container}>
          {/* Título da aplicação */}
          <Text style={styles.title}>To-Do List</Text>
          {/* Subtítulo da aplicação */}
          <Text style={styles.subtitle}>Manage your tasks effectively.</Text>
          {/* Componente para adicionar uma nova tarefa */}
          <AdicionarTarefa />
          {/* Componente que lista todas as tarefas */}
          <ListaTarefas />
        </View>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
};

// Estilos definidos usando StyleSheet do React Native
const styles = StyleSheet.create({
  container: {
    flex: 1, // O contêiner ocupa toda a altura da tela
    backgroundColor: '#f7f7f7', // Cor de fundo cinza claro
    padding: 20, // Espaçamento interno de 20 unidades
    alignItems: 'center', // Alinha os itens ao centro horizontalmente
  },
  title: {
    fontSize: 36, // Tamanho da fonte grande para o título
    fontWeight: 'bold', // O título é em negrito
    color: '#000', // Cor preta para o texto
    marginBottom: 10, // Margem inferior para espaçamento
    alignSelf: 'flex-start', // Alinha o título ao início horizontalmente
  },
  subtitle: {
    fontSize: 16, // Tamanho da fonte menor para o subtítulo
    color: '#888', // Cor cinza para o texto do subtítulo
    marginBottom: 20, // Margem inferior para espaçamento
    alignSelf: 'flex-start', // Alinha o subtítulo ao início horizontalmente
  },
});

export default HomeScreen; // Exporta o componente para ser usado em outras partes da aplicação
