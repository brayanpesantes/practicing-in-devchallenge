"use client";
import { Task } from "@/types/task";
import { createClient } from "@/utils/supebase/client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import TaskList from "./TaskList";

export default function Main() {
  const supabase = createClient();
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const open = () => {
    setModalIsOpen(true);
  };
  const close = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    supabase
      .from("tasks")
      .select("*")
      .then((res) => {
        setTasks(res.data);
      });
  }, [modalIsOpen]);

  return (
    <div className="md:max-w-screen-md mx-auto mt-10">
      <TaskList tasks={tasks} open={open} />
      <Modal modalIsOpen={modalIsOpen} close={close} />
    </div>
  );
}
