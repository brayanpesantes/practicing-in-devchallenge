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
        "text-sm font-bold transition-colors duration-150 ease-in-out", // Base styles
        "text-gray-600 dark:text-gray-400", // Default colors for inactive links
        "hover:text-blue-600 dark:hover:text-blue-400", // Hover styles
        className,
        { "text-blue-600 dark:text-white": isActive }, // Active styles - blue for light, white for dark
      ])}
    >
      {label}
    </a>
  );
}
