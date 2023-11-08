import { useTranslation } from "@/app/i18n/client";
import localFont from "next/font/local";

const druk = localFont({ src: "../../../fonts/druk.wide.ttf" });

interface VideoTitleTranslateProps {
  lng: string;
  video: string;
  text: string;
  height?: string;
}

export const VideoTitleTranslate = ({
  lng,
  video,
  text,
  height,
}: VideoTitleTranslateProps) => {
  const { t } = useTranslation(lng, "titlesandsubtitles");

  return (
    <div className="relative">
      <video
        autoPlay
        playsInline
        muted
        loop
        className={height ? height : "h-[200px]"}
      >
        <source src={video} type="video/mp4" />
      </video>
      <p
        className={`${druk.className} ${
          text && lng !== "pt" ? "" : "invisible"
        } absolute text-xl bg-black text-white top-[43%] w-[100%] text-center`}
      >
        {t(lng + text)}
      </p>
    </div>
  );
};
