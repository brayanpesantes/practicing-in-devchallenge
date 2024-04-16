/* eslint-disable @next/next/no-img-element */
import EditDuotone from "../../images/edit-duotone.svg";
import LogoTask from "../../images/logo-task.svg";
export default function Navbar() {
  return (
    <header className="md:max-w-screen-md mx-auto text-center">
      <div className="inline-flex mt-12 gap-x-4 items-center">
        <img src={LogoTask.src} alt="logo task" />
        <h1 className="text-[40px] font-normal">My Task Board</h1>
        <img src={EditDuotone.src} alt="logo edit" />
      </div>
      <p className="mt-3 -ml-16 font-normal">Tasks to keep organised</p>
    </header>
  );
}
