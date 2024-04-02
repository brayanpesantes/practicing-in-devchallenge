import LogoLight from "../../images/alarado-icon-homepage.svg";
import LogoDark from "../../images/alarado-icon-homepage-dark.svg";
import Image from "next/image";
export default function Logo({ mode }: { readonly mode: boolean }) {
  return (
    <Image
      src={mode ? LogoDark : LogoLight}
      className="w-full h-full"
      alt="logo alarado home page"
      width={70}
      height={24}
    />
  );
}
