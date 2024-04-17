import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function TaskBoardPage() {
  return (
    <div className="max-w-screen-xl h-screen bg-[#F8FAFC] mx-auto font-outfit relative overflow-hidden ">
      <Navbar />
      <Main />
    </div>
  );
}
