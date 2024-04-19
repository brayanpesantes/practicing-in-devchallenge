import InputSearch from "../components/InputSearch";
import Navbar from "../components/Navbar";

export default function SearchPage() {
  return (
    <div className="max-w-screen-xl min-h-screen">
      <Navbar />
      <div className="bg-collection-gradient h-20 relative">
        <div className="top-12 absolute inset-0">
          {/* <InputSearch className="mx-auto" onChange={() => {}} /> */}
        </div>
      </div>
      <div className="mt-[78px]"></div>
    </div>
  );
}
