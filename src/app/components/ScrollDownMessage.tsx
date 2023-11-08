"use client";

import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";

interface ScrollDownMessageProps {
  firstScrollRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
  lng: string;
}

export const ScrollDownMessage = ({
  firstScrollRef,
  isVisible,
  lng,
}: ScrollDownMessageProps) => {
  const { t } = useTranslation(lng, "scrolldown");
  return (
    <div
      onClick={() =>
        firstScrollRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      className={`${
        isVisible ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-2"
      }
duration-1000 z-6
flex flex-col h-screen justify-center items-center color-white fixed top-0 z-10`}
    >
      {/* Arrow pointing down */}
      <div className="w-6 h-6 mb-2 mt-[55vh] z-10 color-white cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300">
        <svg
          xmlns="https://www.w3.org/2000/svg"
          className="h-full w-full text-1xl text-white animate-pulse"
          fill="white"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      {/* Text */}
      <p className="text-white text-1xl animate-pulse cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300">
        {t("scrolldown")}
      </p>
    </div>
  );
};
