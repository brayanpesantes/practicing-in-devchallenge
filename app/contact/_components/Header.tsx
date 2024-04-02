import Image from "next/image";
import LogoImage from "../../images/contact-form-icon.svg";

export const Header = () => {
  return (
    <header className="px-6 md:px-[72px] py-5">
      <Image src={LogoImage} alt="Logo Contact Page" />
    </header>
  );
};
