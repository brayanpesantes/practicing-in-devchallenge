import Image from "next/image";
import ImageLogo from "../../images/logo-qr-generator.svg";

export default function Logo() {
  return (
    <Image
      src={ImageLogo}
      alt="logo code qr"
      className="object-cover"
      priority
      width={150}
      height={32}
    />
  );
}
