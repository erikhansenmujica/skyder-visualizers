import localFont from "next/font/local";
import { useEffect, useState } from "react";
const druk = localFont({ src: "../../../fonts/druk.wide.ttf" });

export const Title = ({ text }: { text: string }) => {
  const [font, setFont] = useState(false);
  const [color, setColor] = useState(false);

  useEffect(() => {
    const c = setTimeout(() => {
      setColor(true);
    }, 500);
    const f = setTimeout(() => {
      setFont(true);
    }, 1000);
    return () => {
      clearTimeout(c);
      clearTimeout(f);
    };
  }, []);

  return (
    <div className="h-screen w-screen fixed top-0 z-0">
      <div className="flex justify-center w-screen">
        <div
          className={`rounded-xl mt-[25%] md:mt-[15%] lg:mt-[10%] ${
            color ? "text-black bg-black " : "text-black bg-white"
          } transition duration-500 ease-in-out`}
        >
          <h1
            className={`p-6 text-1xl transition duration-1000 ease-in-out ${
              font ? druk.className + " text-white text-2xl" : ""
            } `}
          >
            {text}
          </h1>
        </div>
      </div>
    </div>
  );
};
