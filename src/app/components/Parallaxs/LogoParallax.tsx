"use client";
import Image from "next/image";
interface LogoParallaxProps {
  isVisible: boolean;
  main?: boolean;
}
export const LogoParallax = ({ isVisible, main }: LogoParallaxProps) => {
  return (
    <div
      className={`${
        main ? "w-screen absolute top-10" : "h-screen w-screen fixed top-0"
      } flex flex-col justify-center items-center  align-items-center  `}
    >
      <Image
        priority
        src={"/logo.png"}
        width={"225"}
        height={"100"}
        alt=""
        className="z-10"
      ></Image>
      <div
        className={`bg-black ${
          isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-2"
        } h-screen w-screen transform transition-opacity duration-1000 ease-out flex flex-col items-center fixed top-0 z-0`}
      ></div>
    </div>
  );
};
