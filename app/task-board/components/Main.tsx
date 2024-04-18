"use client";

import Modal from "./Modal";
import TaskList from "./TaskList";

export default function Main() {
  return (
    <div className="md:max-w-screen-md mx-auto mt-10">
      <TaskList />
      <Modal />
    </div>
  );
}
