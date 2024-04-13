import LogoImage from "../../images/logo-country.svg";
import Image from "next/image";
export default function Logo() {
  return <Image src={LogoImage} alt="Hola mundo" quality={75} />;
}
