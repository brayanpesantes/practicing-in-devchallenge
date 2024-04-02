import cn from "@/utils/cn";

type Props = {
  readonly isActive: boolean;
  readonly label: string;
  readonly href: string;
  readonly className?: string;
};

export default function LinkNavigation({
  href,
  isActive,
  label,
  className,
}: Props) {
  return (
    <a
      href={href}
      className={cn([
        "text-[#223344]/70 dark:text-[#909193] text-sm font-bold",
        className,
        { "text-[#111729] dark:text-white": isActive },
      ])}
    >
      {label}
    </a>
  );
}
