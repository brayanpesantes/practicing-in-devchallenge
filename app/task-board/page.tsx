import { TaskProvider } from "@/context/TasksContext";
import { Toaster } from "react-hot-toast";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function TaskBoardPage() {
  return (
    <TaskProvider>
      <div className="max-w-screen-xl h-screen bg-[#F8FAFC] mx-auto font-outfit relative overflow-hidden">
        <Navbar />
        <Main />
      </div>
      <Toaster />
    </TaskProvider>
  );
}
