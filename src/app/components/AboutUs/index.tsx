import { useState } from "react";
import { AnimatedCards } from "../AnimatedCards";
import { useAnimatedCardHooks } from "@/hooks/animatedCardHook";
import { useTranslation } from "@/app/i18n/client";

interface AboutUsProps {
  lng: string;
}
export const AboutUs = ({ lng }: AboutUsProps) => {
  const { videoErik, videoLars, videochanger, setErikVideo, setLarsVideo } =
    useAnimatedCardHooks();
  const { t } = useTranslation(lng, "aboutus");
  return (
    <section className="flex-1 w-full py-10 bg-black py-16 text-gray-100 z-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">{t("whoarewe")}</h2>
        <h2 className="my-[5%] text-gray-100 m-5 p-0">
          {t("aboutusdescription")}
        </h2>
        <div>
          <div className="flex justify-evenly ">
            <AnimatedCards
              video={videoLars}
              name="LARS CHRISTENSEN"
              image="/content/card1.jpg"
              setVideo={setLarsVideo}
              videochanger={videochanger}
            />
            <AnimatedCards
              video={videoErik}
              name="ERIK HANSEN"
              image="/content/card2.jpg"
              setVideo={setErikVideo}
              videochanger={videochanger}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
