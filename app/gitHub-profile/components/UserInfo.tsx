/* eslint-disable @next/next/no-img-element */
import { UserData } from "./Container";
import InfoButton from "./InfoButton";

interface UserInfoProps {
  readonly userData: UserData;
}
export default function UserInfo({ userData }: UserInfoProps) {
  return (
    <>
      <div className="md:h-[100px] pt-3 pb-5  flex gap-x-2 md:gap-x-9">
        <div className="size-[120px] bg-[#364153] rounded-2xl -mt-14 p-2">
          <img
            src={userData?.avatar_url}
            className="w-full h-full rounded-2xl aspect-square"
            alt="hola mundo"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-5 items-start ">
          <InfoButton name="Followers" label={userData.followers ?? 0} />
          <InfoButton name="Following" label={userData.following ?? 0} />
          <InfoButton name="Location" label={userData.location ?? ""} />
        </div>
      </div>
      <div className="">
        <h1 className="text-[#CDD5E0] text-[32px] font-bold">
          {userData.name}
        </h1>
        <p className="text-[#CDD5E0] text-xl mt-2">{userData.bio}</p>
      </div>
    </>
  );
}
