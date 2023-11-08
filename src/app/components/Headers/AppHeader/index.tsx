"use client";

import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
interface AppHeaderProps {
  contactRef?: React.RefObject<HTMLDivElement>;
  servicesRef?: React.RefObject<HTMLDivElement>;
  lng: string;
  main?: boolean;
}

export const AppHeader = ({
  contactRef,
  servicesRef,
  lng,
  main,
}: AppHeaderProps) => {
  const handleClick = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { t } = useTranslation(lng, "headers");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  useEffect(() => {
    // Check screen width and set initial state
    const screenWidth = window.innerWidth;
    setMobile(screenWidth <= 640); // Adjust the breakpoint as needed
  }, []);
  return (
    <header className="flex w-screen text-1xl text-white justify-between mt-9">
      {main ? (
        <div className="flex-1  self-start" />
      ) : (
        <Link href={"/"} className="flex-1  self-start">
          <button className="sm:w-40 h-14 text-2xl flex justify-center items-center transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black">
            <AiOutlineHome />
          </button>
        </Link>
      )}

      {mobile && (
        <div
          className={`lg:hidden p-12 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 absolute top-[90px] right-4 p-2 bg-black flex flex-col justify-evenly h-[50%] 
        transition-transform origin-top-right ${
          mobileMenuOpen ? "scale-100" : "scale-0"
        } duration-300 ease-in-out
         `}
        >
          {contactRef ? (
            <button
              onClick={() => handleClick(contactRef)}
              className="sm:w-40 h-14 border-2 rounded-1xl border-white  transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black"
            >
              {t("contact")}
            </button>
          ) : (
            <div className="hidden" />
          )}
          {servicesRef ? (
            <button
              onClick={() => handleClick(servicesRef)}
              className="sm:w-40 h-14 text-1xl rounded-1xl border-2 border-white   transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black"
            >
              {t("services")}
            </button>
          ) : (
            <div className="hidden" />
          )}

          <Link href={"/aboutus"} className="">
            <button className="sm:w-40 px-12 h-14 text-1xl rounded-1xl border-2 border-white  transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black">
              {t("aboutus")}
            </button>
          </Link>
        </div>
      )}
      <div className="sm:hidden flex justify-center">
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="https://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="https://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1  hidden sm:flex justify-between sm:justify-end ">
        {contactRef ? (
          <button
            onClick={() => handleClick(contactRef)}
            className="sm:w-40 h-14  transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black"
          >
            {t("contact")}
          </button>
        ) : (
          <div className="hidden" />
        )}
        {servicesRef ? (
          <button
            onClick={() => handleClick(servicesRef)}
            className="sm:w-40 h-14 text-1xl  transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black"
          >
            {t("services")}
          </button>
        ) : (
          <div className="hidden" />
        )}
        <Link href={"/aboutus"}>
          <button
            className={`sm:w-40 h-14 text-1xl ${
              main ? "border-white border-2 bg-black mr-8 rounded-xl" : ""
            } transition-colors rounded duration-350 ease-in-out  hover:bg-white hover:text-black`}
          >
            {t("aboutus")}
          </button>
        </Link>
      </div>
    </header>
  );
};
