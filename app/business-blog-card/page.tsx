import Image from "next/image";
import ImageHeroBusiness from "../images/hero-image-business-card.webp";
import ImageBusiness from "../images/avatar-image-business-card.webp";
export default function BusinessBlogCardPage() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-[#F2F5F9]">
      <article className="w-[416px] bg-white rounded-xl">
        <div className="relative w-full h-[280px] ">
          <Image
            src={ImageHeroBusiness}
            alt="image business for card"
            className="rounded-t-xl h-full w-full p-0 m-0"
            height={280}
            width={ImageHeroBusiness.width}
            quality={75}
          />
          <div
            className="absolute w-full h-full bg-no-repeat bg-bottom -bottom-1 left-0"
            style={{ backgroundImage: `url(./images/white-overlay.svg)` }}
          ></div>
        </div>
        <div className="px-8">
          <h1 className="text-2xl font-poppins font-medium">
            Perfect solution for small business
          </h1>
          <p className="mt-3 text-base font-lato text-[#677489]">
            Small businesses need to generate leads to grow. You can use tools
            like Ringy.
          </p>
        </div>
        <hr className="my-6" />
        <div className="px-8 pb-6 flex items-center gap-3">
          <Image
            src={ImageBusiness}
            alt="image business for card"
            className="rounded-full  size-9 ring-2 ring-[#F2F5F9] "
            height={ImageBusiness.height / 2}
            width={ImageBusiness.width / 2}
            quality={75}
          />
          <div className="">
            <h3 className="font-medium font-poppins text-base">Amy Burgess</h3>
            <span className="font-normal font-lato text-base text-[#677489]">
              Customer Manger, Solution Oy
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
