import { Status } from "@/types/task";
import cn from "@/utils/cn";
import IconCloseRing from "./IconCloseRing";
import IconDone from "./IconDone";
import IconTimeAtack from "./IconTimeAtack";

type IconStateProps = {
  readonly icon?: string;
};

const iconMap: { [key: string]: JSX.Element } = {
  [Status.COMPLETED]: <IconDone />,
  [Status.IN_PROGRESS]: <IconTimeAtack />,
  [Status.WONT_DO]: <IconCloseRing />,
};

const colorMap: { [key: string]: string } = {
  [Status.COMPLETED]: "bg-[#32D657]",
  [Status.IN_PROGRESS]: "bg-[#E9A23B]",
  [Status.WONT_DO]: "bg-[#DD524C]",
};

export default function IconState({ icon = "completed" }: IconStateProps) {
  const iconComponent = iconMap[icon] || null;
  const backgroundColor = colorMap[icon] || "";

  return (
    <div className={cn("p-3 rounded-lg", backgroundColor)}>{iconComponent}</div>
  );
}
