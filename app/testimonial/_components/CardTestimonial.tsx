import { FC } from "react";
import LogoGoogle from "../../images/google-testimonial.webp";
import IconStarFill from "../../images/Star_fill.svg";
import IconStarFillGray from "../../images/Star_fill_gray.svg";
import Image, { type StaticImageData } from "next/image";
import cn from "@/utils/cn";

type Props = {
  title: string;
  description: string;
  image: StaticImageData;
  fill: number;
  className?: string;
};
export const CardTestimonial: FC<Props> = ({
  title,
  description,
  fill,
  image,
  className,
}) => {
  return (
    <article
      className={cn([
        "px-5 md:px-10  py-3.5 md:py-7 bg-white shadow-minimal-card rounded-lg md:w-[366px]",
        className,
      ])}
    >
      <div className="flex gap-5">
        <Image
          src={image}
          alt="Testimonial Google"
          width={88}
          height={34}
          quality={75}
        />
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) =>
            i < fill ? (
              <Image
                key={i}
                src={IconStarFill}
                alt="icon start fill"
                width={24}
                height={24}
              />
            ) : (
              <Image
                key={i}
                src={IconStarFillGray}
                alt="icon start fill gray incomplete"
                width={24}
                height={24}
              />
            )
          )}
        </div>
      </div>
      <h1 className="mt-4 font-bold text-[#18181B]">{title}</h1>
      <p className="mt-2 text-[#52525A]">{description}</p>
    </article>
  );
};
