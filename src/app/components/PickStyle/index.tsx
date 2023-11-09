import { useTranslation } from "@/app/i18n/client";
import Image from "next/image";

interface PickStyleProps {
  lng: string;
  selectedStyle: number;
  setSelectedStyle: (selectedStyle: number) => void;
}

export function PickStyle({
  lng,
  selectedStyle,
  setSelectedStyle,
}: PickStyleProps) {
  const { t } = useTranslation(lng, "titlesandsubtitles");
  const imageStyles =
    "object-contain w-full h-full rounded-xl shadow cursor-pointer hover:scale-[110%] hover:border-2 hover:border-white transition-all duration-500 ease-in-out";
  const imageBoxes = "h-[25%] md:h-[15%] w-[25%] md:w-[15%] p-3";
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-full h-full">
        <h1 className="text-center text-white text-xl my-8">
          {t("pickstyle")}
        </h1>
        <div className="flex flex-wrap wrap w-full justify-evenly h-[100%]">
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 1 ? 1 : 0)}
          >
            <Image
              alt=""
              src="/content/cyberpunk.jpeg"
              width={"1000"}
              height={"1000"}
              className={
                imageStyles +
                (selectedStyle === 1 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 2 ? 2 : 0)}
          >
            <Image
              alt=""
              src="/content/photorealistic.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 2 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 3 ? 3 : 0)}
          >
            <Image
              alt=""
              src="/content/pixelart.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 3 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 4 ? 4 : 0)}
          >
            <Image
              alt=""
              src="/content/watercolor.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 4 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 5 ? 5 : 0)}
          >
            <Image
              alt=""
              src="/content/popart.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 5 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 6 ? 6 : 0)}
          >
            <Image
              alt=""
              src="/content/anime.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 6 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 7 ? 7 : 0)}
          >
            <Image
              alt=""
              src="/content/futuristic.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 7 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 8 ? 8 : 0)}
          >
            <Image
              alt=""
              src="/content/neon.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 8 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 9 ? 9 : 0)}
          >
            <Image
              alt=""
              src="/content/pencildraw.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 9 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 10 ? 10 : 0)}
          >
            <Image
              alt=""
              src="/content/surrealism.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 10 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 11 ? 11 : 0)}
          >
            <Image
              alt=""
              src="/content/comic.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 11 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
          <div
            className={imageBoxes}
            onClick={() => setSelectedStyle(selectedStyle !== 12 ? 12 : 0)}
          >
            <Image
              alt=""
              src="/content/graffity.jpeg"
              width={"1000"}
              height={0}
              className={
                imageStyles +
                (selectedStyle === 12 ? " border-2 border-white" : "")
              }
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
