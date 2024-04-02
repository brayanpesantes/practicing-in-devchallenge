import Logo from "./Logo";
import SwitchDarkMode from "./SwitchDarkMode";

const links = [
  {
    label: "About Us",
    href: "#",
  },
  {
    label: "Product",
    href: "#",
  },
  {
    label: "Resource",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
];
type Props = {
  readonly mode: boolean;
  readonly toggle: () => void;
};
export default function Header({ mode, toggle }: Props) {
  return (
    <header className="py-7 h-20  px-9 lg:px-[72px] ">
      <div className="flex flex-row gap-10 justify-between items-center h-full">
        <div className="">
          <Logo mode={mode} />
        </div>
        <nav className="lg:inline-flex space-x-10 hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-[#52525A]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <SwitchDarkMode mode={mode} toggle={toggle} />
        </div>
        <button className="h-5 w-6 flex flex-col justify-between p-px lg:hidden">
          <span className="h-0.5 w-full bg-[#111729]"></span>
          <span className="h-0.5 w-full bg-[#111729]"></span>
          <span className="h-0.5 w-full bg-[#111729]"></span>
        </button>
      </div>
    </header>
  );
}
