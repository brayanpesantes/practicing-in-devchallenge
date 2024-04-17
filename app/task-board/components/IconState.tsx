import cn from "@/utils/cn";
import IconCloseRing from "./IconCloseRing";
import IconDone from "./IconDone";
import IconTimeAtack from "./IconTimeAtack";
import { Status } from "./TaskForm";
type IconStateProps = {
  readonly icon?: string;
};

export default function IconState({ icon = "completed" }: IconStateProps) {
  const typeIcons: { [key: string]: JSX.Element } = {
    COMPLETED: <IconDone />,
    IN_PROGRESS: <IconTimeAtack />,
    WONT_DO: <IconCloseRing />,
  };

  return (
    <div
      className={cn(
        "p-3 rounded-lg",
        {
          "bg-[#32D657]": icon === Status.COMPLETED,
        },
        {
          "bg-[#E9A23B]": icon === Status.IN_PROGRESS,
        },
        {
          "bg-[#DD524C]": icon === Status.WONT_DO,
        }
      )}
    >
      {typeIcons[icon]}
    </div>
  );
}
