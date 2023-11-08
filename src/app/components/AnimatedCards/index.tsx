"use client";
import Image from "next/image";

interface AnimatedCardsProps {
  videochanger: (who: string) => void;
  setVideo: (who: string) => void;
  image: string;
  video: string;
  name: string;
}

export const AnimatedCards = ({
  videochanger,
  setVideo,
  image,
  video,
  name,
}: AnimatedCardsProps) => {
  const handleOpenInNewTab = () => {
    window.open("https://www.linkedin.com/in/erik-hansen-488705180/", "_blank");
  };
  const commonclass =
    "cursor-pointer rounded-xl transition transform hover:shadow-3xl ease-in-out duration-300";
  return (
    <div
      onClick={() => {
        name === "ERIK HANSEN" && handleOpenInNewTab();
      }}
      onMouseEnter={() => {
        videochanger(name);
      }}
      className="relative"
      onMouseLeave={() => setVideo("")}
    >
      <Image
        width={"300"}
        height={"300"}
        alt=""
        className={commonclass}
        src={image}
      ></Image>
      {video && (
        <video
          className={`absolute top-0 ${commonclass} sm:min-w-[300px] sm:min-h-[300px]`}
          autoPlay
          loop
          onMouseOver={(event) => {
            const video = event.target as HTMLVideoElement;
            video.play();
          }}
          onMouseOut={(event: React.MouseEvent<HTMLVideoElement>) => {
            const video = event.target as HTMLVideoElement;
            video.pause();
            video.currentTime = 0;
          }}
          muted
          width={"300"}
          height={"300"}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      <h2 className={" mt-[20px]"}>{name}</h2>
    </div>
  );
};
