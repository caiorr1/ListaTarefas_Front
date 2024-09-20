import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTarefas, addTarefa as salvarTarefa, editarTarefa as atualizarTarefa, excluirTarefa as removerTarefa } from '../service/storageService';

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  tarefa: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

// Cria o contexto global de estado
const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => {},
  editarTarefa: () => {},
  excluirTarefa: () => {},
});

// Hook para acessar o contexto global de estado
export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

// Componente que fornece o contexto global de estado para seus filhos
export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para carregar as tarefas do AsyncStorage
  const carregarTarefas = async () => {
    try {
      const tarefasArmazenadas = await getTarefas();
      if (tarefasArmazenadas) {
        setTarefas(tarefasArmazenadas);
      }
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = async (tarefa: string) => {
    try {
      const novaTarefa = await salvarTarefa(tarefa);
      if (novaTarefa) {
        setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  // Função para editar o título de uma tarefa
  const editarTarefa = async (id: number, novoTitulo: string) => {
    try {
      const tarefasAtualizadas = await atualizarTarefa(id, novoTitulo);
      if (tarefasAtualizadas) {
        setTarefas(tarefasAtualizadas);
      }
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  // Função para excluir uma tarefa
  const excluirTarefa = async (id: number) => {
    try {
      const tarefasAtualizadas = await removerTarefa(id);
      if (tarefasAtualizadas) {
        setTarefas(tarefasAtualizadas);
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  // Carrega as tarefas do AsyncStorage na inicialização
  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
