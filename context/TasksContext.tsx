"use client";
import { Status, Task } from "@/types/task";
import { createClient } from "@/utils/supebase/client";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

type InitialTasksContext = {
  tasks: Task[];
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  createTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};
const initialContext = {
  tasks: [],
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
};

export const TasksContext = createContext<InitialTasksContext | null>(
  initialContext
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    getTasks();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getTasks = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select();

      if (error) throw error;
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async ({
    title,
    description,
    icon,
    status,
  }: Omit<Task, "id">) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({ title, description, icon, status })
        .select()
        .single();
      if (error) throw error;
      setTasks((prevTask) => [...prevTask, data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async ({ id, title, description, icon, status }: Task) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ title, description, icon, status })
        .eq("id", id);
      if (error) throw error;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                title,
                description,
                icon,
                status,
              }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      setTasks((prevTasks) => prevTasks.filter((task) => task.id === id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        modalIsOpen,
        openModal,
        closeModal,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTaskContext = () => useContext(TasksContext);
