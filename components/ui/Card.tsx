import Link from "next/link";

type Props = {
  readonly title: string;
  readonly image: string;
  readonly github_url: string;
  readonly slug: string;
};
export default function Card({
  image,
  title,
  github_url,

  slug,
}: Props) {
  const preview = window.location.origin + "/" + slug;
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
      <Link
        href={slug}
        className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white  bg-clip-border rounded-xl h-52"
      >
        <picture>
          <img
            src={image}
            alt={title}
            className="bg-cover bg-center drop-shadow-sm transition-all duration-500 scale-125 hover:scale-150"
          />
        </picture>
      </Link>
      <div className="p-6 text-center">
        <h4 className="block mb-2 text-start font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-800">
          {title}
        </h4>
      </div>
      <div className="flex justify-center p-6 pt-2 gap-10 ">
        <a
          href={github_url}
          target="_blank"
          className="block font-sans text-xl antialiased font-normal leading-relaxed  hover:bg-gray-100 p-2 rounded-md cursor-pointer"
        >
          <span className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32M200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.81 43.81 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.81 43.81 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.72 41.72 0 0 1 7 22.52Z"
              ></path>
            </svg>
          </span>
        </a>

        <a
          href={preview}
          target="_blank"
          className="block font-sans text-xl antialiased font-normal leading-relaxed  hover:bg-gray-100 p-2 rounded-md cursor-pointer"
        >
          <span className="text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M24 36c11.046 0 20-12 20-12s-8.954-12-20-12S4 24 4 24s8.954 12 20 12Z"></path>
                <path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"></path>
              </g>
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
