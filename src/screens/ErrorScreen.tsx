import React from 'react';
import { Box, Text, Center } from 'native-base'; // Importa componentes da biblioteca Native Base
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importa o tipo para navegação de pilha (stack) nativa
import { RouteProp } from '@react-navigation/native'; // Importa o tipo para as propriedades de rota
import CustomButton from '../components/CustomButton'; // Importa um botão personalizado de um componente local

// Define o tipo RootStackParamList que lista as telas na pilha de navegação
type RootStackParamList = {
  Login: undefined; // Tela de Login não recebe parâmetros
  Home: undefined; // Tela Home não recebe parâmetros
  Error: { message: string }; // Tela de Erro recebe um parâmetro chamado 'message'
};

// Define o tipo para as propriedades que o componente ErrorScreen espera receber
type ErrorScreenProps = {
  route: RouteProp<RootStackParamList, 'Error'>; // A propriedade 'route' vem da tela 'Error'
  navigation: NativeStackNavigationProp<RootStackParamList>; // A propriedade 'navigation' permite navegar entre as telas
};

// Define o componente funcional ErrorScreen
const ErrorScreen: React.FC<ErrorScreenProps> = ({ route, navigation }) => {
  const { message } = route.params; // Extrai o parâmetro 'message' da rota

  return (
    // Center alinha o conteúdo no centro da tela com flexbox e define um fundo vermelho claro
    <Center flex={1} bg="#FFCDD2">
      {/* Box é um contêiner com padding, largura máxima e sombra, usado para agrupar os textos e botão */}
      <Box p="6" py="8" w="90%" maxW="300" bg="white" borderRadius="10" shadow="3">
        {/* Texto de título com estilo em negrito e cor vermelha */}
        <Text fontSize="xl" fontWeight="bold" color="red.500" textAlign="center" mb="4">
          Ocorreu um erro
        </Text>
        {/* Texto da mensagem de erro com cor vermelha clara */}
        <Text fontSize="md" color="red.400" textAlign="center" mb="4">
          {message}
        </Text>
        {/* Botão personalizado para tentar novamente, que redireciona para a tela de Login */}
        <CustomButton onPress={() => navigation.navigate('Login')} bg="red.500" borderRadius="5">
          Tentar Novamente
        </CustomButton>
      </Box>
    </Center>
  );
};

export default ErrorScreen; // Exporta o componente para ser usado em outras partes da aplicação
