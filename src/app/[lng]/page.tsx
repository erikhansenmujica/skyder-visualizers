"use client";
import React, { use, useEffect, useState } from "react";
import { LogoParallax } from "../components/Parallaxs/LogoParallax";
import { useTranslation } from "../i18n/client";
import { Footer } from "../components/Footers/ClientFooter";
import localFont from "next/font/local";
import { Spinner } from "../components/Spinner";
import { AppHeader } from "../components/Headers/AppHeader";
import { MessagesInBetween } from "../components/General/MessagesInBetween";
import { InputAndPayment } from "../components/InputAndPayment";
import { LatestCustomers } from "../components/LatestCustomers";
import { YoutubePlaylist } from "../components/YoutubePlaylist";
import Image from "next/image";
import { GetJobs } from "@/actions/jobs";
import { Job } from "@/lib/definitions";

const calibri = localFont({ src: "../../fonts/calibri-regular.ttf" });
const druk = localFont({ src: "../../fonts/druk.wide.ttf" });

interface HomeProps {
  params: {
    lng: string;
  };
}

const Home = ({ params: { lng } }: HomeProps) => {
  const [selectedStyle, setSelectedStyle] = useState<number>();
  const [banner] = useState<string>("/content/bannermobile.mp4");
  const { t } = useTranslation(lng, "titlesandsubtitles");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const jobs = await GetJobs();
      if (jobs) setJobs(jobs);
      setLoading(false);
    })();
  }, []);
  const imageStyles =
    "object-contain w-full h-full rounded-xl shadow cursor-pointer hover:scale-[110%] hover:border-2 hover:border-white transition-all duration-500 ease-in-out";
  const imageBoxes = "h-[25%] md:h-[32%] w-[25%] md:w-32% p-3";
  return (
    <div
      className={`${calibri.className} flex flex-col items-center justify-around`}
    >
      <LogoParallax isVisible={false} main />
      <AppHeader lng={lng} main />
      <div className="absolute top-0 z-[-1]">
        {banner && (
          <video autoPlay playsInline className="w-screen" muted loop>
            <source src={banner} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="mt-[6%]"></div>
      <MessagesInBetween
        inverted
        text={t("title")}
        highlightwords={[t("AI"), "48", "Skyder"]}
        size="3xl"
      ></MessagesInBetween>
      <div className="w-screen flex flex-col flex-wrap justify-center items-center ">
        <InputAndPayment lng={lng} selectedStyle={selectedStyle} />
        <div className="flex-1 z-10">
          <div className="flex flex-col ">
            <h1 className="text-center text-white text-2xl my-8">
              {t("pickstyle")}
            </h1>
            <div className="flex flex-wrap wrap flex-1 justify-evenly ">
              <div
                className={imageBoxes}
                onClick={() => setSelectedStyle(selectedStyle !== 1 ? 1 : 0)}
              >
                <Image
                  alt=""
                  src="/content/cyberpunk.jpeg"
                  width={"1000"}
                  height={0}
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
      </div>
      <MessagesInBetween
        inverted
        text={t("jobscompleted")}
        highlightwords={["50", t("jobs")]}
        size="3xl"
      ></MessagesInBetween>
      <div className="w-full flex-wrap flex flex-col md:flex-row space-y-4 justify-evenly">
        {!loading ? (
          <LatestCustomers lng={lng} jobs={jobs} />
        ) : (
          <Spinner></Spinner>
        )}
        {!loading ? (
          <LatestCustomers lng={lng} jobs={jobs} youtube />
        ) : (
          <Spinner></Spinner>
        )}
      </div>

      <MessagesInBetween
        inverted
        text={t("jobsaremade")}
        highlightwords={["48"]}
        size="3xl"
      ></MessagesInBetween>
      <h2 className="text-center text-white text-2xl my-8">
        {t("playlistyoutube")}
      </h2>
      <YoutubePlaylist
        lng={lng}
        src="https://www.youtube.com/embed/videoseries?si=QYwMGy4mI6Nr1O21&amp;list=PLou2miqXrKvkpOB7pKPPFqJPDYt4GLiFX"
      />
      <div className="mt-[5%]">
        <Footer lng={lng} />
      </div>
      {/* <script src="https://apps.elfsight.com/p/platform.js" defer></script>
      <div className="elfsight-app-839c650c-48f3-4599-9175-328b6d45e507 "></div> */}
    </div>
  );
};

export default Home;
