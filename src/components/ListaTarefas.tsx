// importa o react e componentes necessários da biblioteca native-base
import React from 'react';
import { FlatList, Text, Box, IconButton, Input } from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

// define a interface para as propriedades do item de tarefa
interface TarefaItemProps {
  id: number; // id único da tarefa
  tarefa: string; // descrição da tarefa
}

// componente funcional para exibir e editar uma tarefa
const TarefaItem: React.FC<TarefaItemProps> = ({ id, tarefa }) => {
  // usa o hook personalizado para acessar as funções de edição e exclusão
  const { editarTarefa, excluirTarefa } = useEstadoGlobal();
  // estado para controlar se o item está em modo de edição
  const [editando, setEditando] = React.useState(false);
  // estado para armazenar o novo título da tarefa durante a edição
  const [novoTitulo, setNovoTitulo] = React.useState(tarefa);

  // função para alternar entre modo de edição e exibição
  const handleEditar = () => {
    // se estiver editando, atualiza o título da tarefa
    if (editando) {
      editarTarefa(id, novoTitulo);
    }
    // alterna o estado de edição
    setEditando(!editando);
  };

  return (
    // container para o item de tarefa
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" style={styles.taskItem}>
      {/* se estiver editando, mostra um campo de entrada; caso contrário, mostra o texto */}
      {editando ? (
        <Input flex={3} value={novoTitulo} onChangeText={setNovoTitulo} fontSize={18} />
      ) : (
        <Text flex={3} fontSize={18}>{tarefa}</Text>
      )}

      {/* botão para alternar entre modo de edição e exibição */}
      <IconButton
        icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#fff" />}
        onPress={handleEditar}
        style={styles.editButton}
      />

      {/* botão para excluir a tarefa */}
      <IconButton
        icon={<Ionicons name="trash" size={14} color="#fff" />}
        onPress={() => excluirTarefa(id)}
        style={styles.deleteButton}
      />
    </Box>
  );
};

// componente funcional para exibir a lista de tarefas
const ListaTarefas: React.FC = () => {
  // usa o hook personalizado para acessar a lista de tarefas
  const { tarefas } = useEstadoGlobal();

  return (
    // exibe a lista de tarefas usando FlatList
    <FlatList
      data={tarefas} // dados para a lista
      renderItem={({ item }) => <TarefaItem id={item.id} tarefa={item.tarefa} />} // renderiza cada item
      keyExtractor={(item) => item.id.toString()} // chave única para cada item
      contentContainerStyle={{ flexGrow: 1 }} // faz com que o conteúdo preencha a área disponível
      style={{ width: '100%' }} // define a largura da lista
    />
  );
};

// estilos dos componentes
const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 5, 
    marginHorizontal: 10, 
  },
  editButton: {
    backgroundColor: '#FF8C00', 
    borderRadius: 10, 
    marginLeft: 10, 
    padding: 10, 
  },
  deleteButton: {
    backgroundColor: '#FF0000', 
    borderRadius: 10, 
    marginLeft: 10, 
    padding: 10, 
  },
});

// exporta o componente ListaTarefas como padrã o
export default ListaTarefas;
