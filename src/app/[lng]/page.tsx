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
import { useDetectAdBlock } from "adblock-detect-react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const adBlockDetected = useDetectAdBlock();
  useEffect(() => {
    if (adBlockDetected) {
      alert(
        "We have detected that you are using an adblocker. Please disable it to use our website."
      );
    }
    (async () => {
      setLoading(true);
      const jobs = await GetJobs();
      if (jobs) setJobs(jobs);
      setLoading(false);
    })();
  }, []);

  return adBlockDetected ? (
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
      <MessagesInBetween
        inverted
        text={t("disableadblock")}
        size="3xl"
      ></MessagesInBetween>
    </div>
  ) : (
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
      <div className="absolute z-0 bg-gradient-to-t from-transparent to-black top-0 w-full h-full md:h-[500px] z-0"></div>
      <div className="mt-[6%]"></div>
      <MessagesInBetween
        inverted
        text={t("title")}
        highlightwords={[t("AI"), "48", "Skyder"]}
        size="3xl"
      ></MessagesInBetween>
      <div className="w-screen flex flex-col flex-wrap justify-center items-center ">
        <InputAndPayment lng={lng} style={selectedStyle} />
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
        video={"/content/flores.mp4"}
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
