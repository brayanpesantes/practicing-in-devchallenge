// useTaskForm.ts
import { useTaskContext } from "@/context/TasksContext";
import { Status, Task } from "@/types/task";
import { useEffect, useState } from "react";

interface FormData extends Omit<Task, "id"> {}

export const useTaskForm = () => {
  const { createTask, closeModal, selectedTask, updateTask, deleteTask } =
    useTaskContext();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    status: Status.DEFAULT,
    icon: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({ ...selectedTask });
    } else {
      setFormData({
        title: "",
        description: "",
        status: Status.DEFAULT,
        icon: "",
      });
    }
  }, [selectedTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIconChange = (icon: string) => {
    setFormData((prevData) => ({ ...prevData, icon }));
  };

  const handleStatusChange = (value: Status | string) => {
    const status = value as Status;
    setFormData((prevData) => ({ ...prevData, status }));
  };

  const handleSave = async () => {
    if (!validateData()) return;

    await createTask(formData);
    setFormData({
      title: "",
      description: "",
      status: Status.DEFAULT,
      icon: "",
    });
    closeModal();
  };

  const handleEdit = async () => {
    if (!validateData()) return;
    if (!selectedTask) return;
    await updateTask({ id: selectedTask.id, ...formData });
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    await deleteTask(selectedTask.id);
    closeModal();
  };

  const handleSaveAndEdit = async () => {
    if (!selectedTask) {
      await handleSave();
    } else {
      await handleEdit();
    }
  };

  const validateData = () => {
    if (formData.title.trim().length === 0) {
      alert("El título es requerido");
      return false;
    }
    if (formData.icon === "") {
      alert("El icono es requerido");
      return false;
    }
    return true;
  };

  return {
    formData,
    handleChange,
    handleIconChange,
    handleStatusChange,
    handleSaveAndEdit,
    handleDelete,
    selectedTask,
  };
};
