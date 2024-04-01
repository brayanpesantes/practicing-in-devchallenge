import Image from "next/image";
import ImageMinimal from "../images/cactus_img.jpg";
export default function MinimalBlogCardPage() {
  return (
    <div className="font-sora w-screen h-screen flex items-center justify-center bg-[#FAFAF9]">
      <article className="shadow-minimal-card w-[368px] pb-5 bg-white rounded-xl">
        <div className=" px-4 pt-4 ">
          <Image
            className="rounded-xl h-[152px]"
            src={ImageMinimal}
            alt="image minimal"
            width={ImageMinimal.width}
            height={ImageMinimal.height}
          />
          <span className="py-1.5 px-4 text-[10px] my-4 rounded-full bg-[#E6D6FC] text-[#883AE1] font-bold block w-max">
            Design
          </span>
          <h1 className="text-lg font-bold text-[#20293A]">
            Embracing Minimalism
          </h1>
          <p className="text-sm mt-1.5 text-[#6C727F]">
            From minimalist sculptures to minimalist paintings, this blog will
            inspire you to appreciate the beauty that lies in simplicity.
          </p>
        </div>
        <hr className="block h-px my-5 bg-gray-200" />
        <span className="text-xs text-[#6C727F] block px-4 ">Annie Spratt</span>
      </article>
    </div>
  );
}
