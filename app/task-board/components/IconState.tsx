import cn from "@/utils/cn";
import IconCloseRing from "./IconCloseRing";
import IconDone from "./IconDone";
import IconTimeAtack from "./IconTimeAtack";
type IconStateProps = {
  readonly icon?: string;
  readonly color?: string;
};

export default function IconState({ icon = "completed" }: IconStateProps) {
  const typeIcons: { [key: string]: JSX.Element } = {
    completed: <IconDone />,
    "in-progress": <IconTimeAtack />,
    "not-started": <IconCloseRing />,
  };

  return (
    <div
      className={cn("p-3 rounded-lg", { "bg-[#32D657]": icon === "completed" })}
    >
      {typeIcons[icon]}
    </div>
  );
}
