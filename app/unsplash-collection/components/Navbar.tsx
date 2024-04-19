import Link from "next/link";
import LogoImage from "../../images/logo-unsplash-collection.svg";
/* eslint-disable @next/next/no-img-element */
export default function Navbar() {
  return (
    <header className="py-4 px-8 flex justify-between font-medium border-b border-[#E5E7EB] ">
      <div className="">
        <img src={LogoImage.src} alt="logo application" />
      </div>
      <nav className="space-x-2">
        <Link
          className="py-2 px-5 text-[#6C727F]"
          href={"/unsplash-collection"}
        >
          Home
        </Link>
        <Link className="py-2 px-5" href={"/unsplash-collection"}>
          Collection
        </Link>
      </nav>
    </header>
  );
}
