import PersonalInfo from "./_components/PersonalInfo";

export default function MultiStepRegisterPage() {
  return (
    <div className="relative h-screen max-w-screen-xl bg-left mx-auto bg-[#121826] bg-no-repeat overflow-hidden">
      <div className="absolute bg-[url('/images/blur-radial.svg')] bg-no-repeat -left-[400px] -top-[400px]  size-[800px] bg-cover  z-10"></div>

      <div className="absolute bg-[url('/images/blur-radial.svg')] bg-no-repeat -bottom-[400px] -right-[400px] size-[800px] bg-cover z-10 "></div>

      <div className="absolute inset-0 z-20">
        <div className="flex items-center justify-center w-full h-full p-3 md:p-0">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
}
