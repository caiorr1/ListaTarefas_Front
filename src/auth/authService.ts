import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@usuario';

// Função para criar um usuário de teste no AsyncStorage
export const criarUsuarioTeste = async () => {
  try {
    const usuario = {
      username: 'usuarioTeste',
      password: 'senhaTeste',
    };
    await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error);
  }
};

// Função para autenticar o usuário (verifica nome de usuário e senha)
export const autenticarUsuario = async (username: string, password: string) => {
  try {
    const usuario = JSON.parse(await AsyncStorage.getItem(USUARIO_KEY) || '{}');
    if (usuario.username === username && usuario.password === password) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return false;
  }
};

// Função para registrar um novo usuário
export const registrarUsuario = async (username: string, password: string) => {
  try {
    const novoUsuario = { username, password };
    await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(novoUsuario));
    return true;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return false;
  }
};

// Função para verificar se o usuário está logado
export const verificarAutenticacao = async () => {
  try {
    const usuario = await AsyncStorage.getItem(USUARIO_KEY);
    return usuario !== null;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
};

// Função para realizar logout (remover usuário do AsyncStorage)
export const realizarLogout = async () => {
  try {
    await AsyncStorage.removeItem(USUARIO_KEY);
  } catch (error) {
    console.error('Erro ao realizar logout:', error);
  }
};

// Função para recuperar senha (simulação)
export const recuperarSenha = async (username: string) => {
  try {
    const usuario = JSON.parse(await AsyncStorage.getItem(USUARIO_KEY) || '{}');
    if (usuario.username === username) {
      // Aqui você poderia enviar um e-mail ou exibir uma mensagem com a senha
      return `A senha do usuário ${username} é: ${usuario.password}`;
    }
    return 'Usuário não encontrado';
  } catch (error) {
    console.error('Erro ao recuperar senha:', error);
    return 'Erro ao recuperar senha';
  }
};
