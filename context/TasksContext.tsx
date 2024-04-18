"use client";
import { Task } from "@/types/task";
import { createClient } from "@/utils/supebase/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface InitialTasksContext {
  tasks: Task[];
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  createTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  selectedTask: null | Task;
  openModalForEdit: (task: Task) => void;
}
const initialContext = {
  tasks: [],
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  selectedTask: null,
  openModalForEdit: () => {},
};

export const TasksContext = createContext<InitialTasksContext>(initialContext);

export function TaskProvider({ children }: { readonly children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const supabase = createClient();

  useEffect(() => {
    getTasks();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const openModalForEdit = (task: Task) => {
    setSelectedTask(task);
    openModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTask(null);
  };

  const getTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .order("created_at", { ascending: false });

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
      setTasks((prevTask) => [data, ...prevTask]);
      toast.success("task add success");
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
      toast.success("task update success ", {
        icon: "🔃",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.error("delete task success");
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
        selectedTask,
        openModalForEdit,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTaskContext = () => useContext(TasksContext);
