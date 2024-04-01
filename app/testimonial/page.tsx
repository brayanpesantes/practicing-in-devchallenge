import LogoMeta from "../images/meta-testimonial.webp";
import LogoGoogle from "../images/google-testimonial.webp";
import { CardTestimonial } from "./_components/CardTestimonial";
import Image from "next/image";
import { ItemList } from "./_components/ItemList";

export default function TestimonialPage() {
  return (
    <div className="w-screen min-h-svh flex items-center  bg-[#FAFAF9] font-sora">
      <section className="max-w-screen-lg  mx-auto px-10 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 md:py-0">
          <div className="flex-none">
            <div className="">
              <span className="bg-[#F5C044] rounded-full size-12  flex items-center justify-center">
                ⭐
              </span>
              <h1 className="text-4xl font-bold mt-4">Reviewers</h1>
              <p className="text-xl mt-3 text-[#52525A]">
                Reviewers is where people can access guidelines, checklists, and
                other tools to assist them in reviewing papers or manuscripts.
                It provides a structured approach to ensure that the review
                process is thorough, efficient, and consistent.
              </p>
            </div>
            <ul className="text-sm mt-8 space-y-3">
              <ItemList text="Checklist to Review an Academic Paper" />
              <ItemList text="Peer Review Checklist" />
              <ItemList text="Checklist for Editors, Reviewers, and Authors of SPIE Journals" />
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8 md:gap-16 lg:gap-10  w-full ">
            <CardTestimonial
              title="Samantha Lee"
              description="The checklist ensures that the review process is thorough"
              image={LogoGoogle}
              fill={4}
              className="md:self-end"
            />
            <CardTestimonial
              title="Rachel Patel"
              description="I highly recommend the Writecream Business Description"
              image={LogoMeta}
              fill={5}
              className=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
