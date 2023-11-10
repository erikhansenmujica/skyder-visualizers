"use client";
import { use, useEffect, useState } from "react";
import { StripeForm } from "../Stripe";
import { createOrder } from "@/actions";
import Lottie from "lottie-react";
import animationTick from "@/lottie/tick.json";
import animationCross from "@/lottie/cross.json";
import { useTranslation } from "@/app/i18n/client";
import localFont from "next/font/local";
import { StripeModal } from "../Modals/StripeModal";
import { PickStyle } from "../PickStyle";

const druk = localFont({ src: "../../../fonts/druk.wide.ttf" });
const calibri = localFont({ src: "../../../fonts/calibri-regular.ttf" });

const optionalStyles: { [key: string]: string } = {
  1: "Cyberpunk",
  2: "Photorealistic",
  3: "Pixel Art",
  4: "Watercolor",
  5: "Pop Art",
  6: "Anime",
  7: "Futuristic",
  8: "Neon",
  9: "Pencildrawing",
  10: "Surrealism",
  11: "Comic",
  12: "Graffiti",
};

interface IInputAndPayment {
  lng: string;
  style: number | undefined;
}

export const InputAndPayment = ({ lng, style }: IInputAndPayment) => {
  const [selectedStyle, setSelectedStyle] = useState<number>(style ? style : 0);
  const [activeTab, setActiveTab] = useState(1);
  const [songFile, setSongFile] = useState<File>();
  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState<number>();
  const { t } = useTranslation(lng, "form");
  const [stripeModal, setStripeModal] = useState(false);
  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (selectedOption && songFile && songName && songDescription && artistName)
      setStripeModal(true);
  }, [activeTab, selectedOption]);
  const validateEmail = (email: string) => {
    return !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkIfFieldsAreFilled = (TAB?: number, end?: string) => {
    if (end && activeTab === 2) {
      return !(
        !!(songFile && songName && songDescription && artistName) &&
        !validateEmail(email)
      );
    }
    if (TAB) {
      if (TAB === 1) {
        return !(songFile && songName && songDescription && artistName);
      } else if (TAB === 2) return validateEmail(email);
      else if (TAB === 3) return !selectedOption;
      else return false;
    } else {
      if (activeTab === 1) {
        return !(songFile && songName && songDescription && artistName);
      } else if (activeTab === 2) return validateEmail(email);
      else if (activeTab === 3) return !selectedOption;
      else return false;
    }
  };
  const boxes = "flex flex-col justify-center w-[100%] m-4";
  const boxandtick = "flex justify-between items-center w-[100%]";
  const btns =
    "flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600";
  const btngreen =
    "flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white bg-green-500 hover:bg-green-600";
  const btnsnohover =
    "flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-200 cursor-not-allowed";
  const inputs =
    "w-[90%] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4  dark:bg-gray-800 dark:border-gray-700 dark:text-white";
  return (
    <div
      className={
        !selectedOption
          ? ""
          : "text-xl z-10 dark:bg-opacity-80  w-[100%]  md:w-[70%]  mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8  dark:bg-gray-800 dark:border-gray-700 dark:text-white flex flex-col justify-between"
      }
    >
      {!selectedOption && (
        <h1 className="text-center text-white text-2xl">{t("chooseoption")}</h1>
      )}
      {!selectedOption ? (
        <div className="flex flex-col md:flex-row items-center justify-between md:justify-evenly">
          <div className="relative flex flex-col items-center mt-8  w-[100%] md:w-[45%] ">
            <video
              autoPlay
              playsInline
              muted
              loop
              className="w-full border-2 border-white"
            >
              <source src={"/content/cover.mp4"} type="video/mp4" />
            </video>
            <div
              onClick={() => {
                setSelectedOption(25);
                if (selectedOption === 25) {
                  setStripeModal(true);
                }
              }}
              className="absolute bg-gradient-to-r hover:to-[rgba(255,255,255,0.5)] from-transparent to-[rgba(0,0,0,0.5)] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex justify-center items-center top-0 left-0  w-full h-full cursor-pointer"
            >
              <h2
                className={"text-white text-xl text-center " + druk.className}
              >
                SKYDER COVER <br></br>
                <span className="text-lg">({t("animatedimage")})</span>
                <br></br>
                <span
                  className={
                    "line-through decoration-red-500 decoration-2 text-3xl " +
                    calibri.className
                  }
                >
                  €39
                </span>
                <br></br> €25
              </h2>
            </div>
          </div>
          <div className="relative flex flex-col items-center mt-8 w-[100%] md:w-[45%] ">
            <video
              autoPlay
              playsInline
              muted
              loop
              className="w-full border-2 border-white"
            >
              <source src={"/content/visualizer.mp4"} type="video/mp4" />
            </video>
            <div
              onClick={() => {
                setSelectedOption(69);
                if (selectedOption === 69) {
                  setStripeModal(true);
                }
              }}
              className="absolute bg-gradient-to-l  hover:to-[rgba(255,255,255,0.5)] from-transparent to-[rgba(0,0,0,0.5)] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] flex justify-center items-center top-0 left-0 w-full h-full cursor-pointer"
            >
              <h2
                className={"text-white text-center text-xl " + druk.className}
              >
                SKYDER VISUALIZER <br></br>{" "}
                <span className="text-lg">({t("fullanimatedvideo")})</span>
                <br></br>
                <span
                  className={
                    "line-through decoration-red-500 decoration-2 text-3xl " +
                    calibri.className
                  }
                >
                  €89
                </span>
                <br></br> €69
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="shadow-md p-4 rounded-md">
          <button
            className="border-2 border-white mb-5 p-3 px-6"
            onClick={() => setSelectedOption(0)}
          >
            {"<- Back"}
          </button>
          <div className="flex justify-evenly md:space-x-8 mb-[15%] md:mb-[5%]">
            <div
              className={`cursor-pointer  text-center flex justify-center ${
                activeTab === 1 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() =>
                !checkIfFieldsAreFilled(1) ? handleTabChange(1) : ""
              }
            >
              {t("songdetails")}{" "}
              {!checkIfFieldsAreFilled(1) ? (
                <span>
                  <Lottie
                    className="h-5 w-5 "
                    animationData={animationTick}
                    loop={false}
                  />
                </span>
              ) : (
                <span className="text-red-600">*</span>
              )}
            </div>
            <div
              className={`cursor-pointer flex text-center justify-center ${
                activeTab === 2 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() =>
                !checkIfFieldsAreFilled(1) || !checkIfFieldsAreFilled(2)
                  ? handleTabChange(2)
                  : ""
              }
            >
              {t("youremail")}{" "}
              {!checkIfFieldsAreFilled(2) ? (
                <span>
                  <Lottie
                    className="h-5 w-5 "
                    animationData={animationTick}
                    loop={false}
                  />
                </span>
              ) : (
                <span className="text-red-600">*</span>
              )}
            </div>
            <div
              className={`cursor-pointer text-center ${
                activeTab === 3 ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() =>
                !checkIfFieldsAreFilled(1) && !checkIfFieldsAreFilled(2)
                  ? handleTabChange(3)
                  : ""
              }
            >
              {t("payment")}
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-xl text-center">
              {activeTab !== 1
                ? t("videoreceivemessage")
                : t("allfilesrequired")}
            </h1>
            {activeTab === 1 && (
              <div className="flex flex-col items-center content-center">
                <div className={boxes}>
                  <label htmlFor="25">{t("songname")} *</label>
                  <div className={boxandtick}>
                    <input
                      required
                      className={inputs}
                      type="text"
                      placeholder={t("songname")}
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                    />

                    {songName ? (
                      <Lottie
                        className="h-10 w-10 "
                        animationData={animationTick}
                        loop={false}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                <div className={boxes}>
                  <label htmlFor="25">{t("mp3orwav")} *</label>
                  {songFile ? (
                    <div className={boxes}>
                      <div className={boxandtick}>
                        <p className="w-[90%] text-gray-500">
                          {t("selectedfile")} {songFile.name}
                        </p>
                        {songFile ? (
                          <Lottie
                            className="h-10 w-10 "
                            animationData={animationTick}
                            loop={false}
                          />
                        ) : (
                          <div />
                        )}
                      </div>
                      <button
                        className=" text-blue-500"
                        onClick={() => setSongFile(undefined)}
                      >
                        {t("chooseotherone")}
                      </button>
                    </div>
                  ) : (
                    <input
                      required
                      className={inputs}
                      type="file"
                      accept=".mp3,.wav"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSongFile(e.target.files[0]);
                        }
                      }}
                    />
                  )}
                </div>
                <div className={boxes}>
                  <label htmlFor="25">{t("artists")} *</label>
                  <div className={boxandtick}>
                    <input
                      required
                      className={inputs}
                      placeholder={t("artistnames")}
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                    {artistName ? (
                      <Lottie
                        className="h-10 w-10 "
                        animationData={animationTick}
                        loop={false}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                <div className={boxes}>
                  <label htmlFor="25">{t("whatabout")} *</label>
                  <div className={boxandtick}>
                    <textarea
                      className={inputs}
                      placeholder={t("description")}
                      value={songDescription}
                      onChange={(e) => setSongDescription(e.target.value)}
                    />
                    {songDescription ? (
                      <Lottie
                        className="h-10 w-10 "
                        animationData={animationTick}
                        loop={false}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="flex flex-col items-center content-center">
                <div className={boxes}>
                  <label htmlFor="25">{t("email")} *</label>
                  <div className={boxandtick}>
                    <input
                      required
                      className={inputs}
                      type="email"
                      placeholder={t("youremail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {email ? (
                      validateEmail(email) ? (
                        <Lottie
                          className="h-10 w-10"
                          animationData={animationCross}
                          loop={false}
                        />
                      ) : (
                        <Lottie
                          className="h-10 w-10"
                          animationData={animationTick}
                          loop={false}
                        />
                      )
                    ) : (
                      <div />
                    )}
                  </div>
                  <PickStyle
                    lng={lng}
                    selectedStyle={selectedStyle}
                    setSelectedStyle={setSelectedStyle}
                  />
                </div>
              </div>
            )}
            {activeTab === 3 && (
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={() => setStripeModal(true)}
                  className={btngreen + " text-xl bg-green"}
                >
                  PAY
                </button>
              </div>
            )}
            {activeTab === 3 &&
              selectedOption &&
              songFile &&
              songName &&
              songDescription &&
              artistName &&
              email && (
                <div className="z-50">
                  <StripeModal
                    showModal={stripeModal}
                    setShowModal={setStripeModal}
                  >
                    <StripeForm
                      songFile={songFile}
                      songName={songName}
                      songDescription={songDescription}
                      artistName={artistName}
                      email={email}
                      selectedOption={selectedOption}
                      optionalStyle={
                        optionalStyles[selectedStyle ? selectedStyle : ""]
                      }
                      lng={lng}
                    ></StripeForm>
                  </StripeModal>
                </div>
              )}
          </div>
        </div>
      )}
      {selectedOption && (
        <div className="flex flex-col items-center content-center">
          <div className="flex justify-between mt-5 w-full">
            <div className="group relative  flex justify-center">
              <button
                className={activeTab === 1 ? "invisible " + btns : btns}
                onClick={() => setActiveTab(activeTab - 1)}
              >
                {t("previousstep")}
              </button>
            </div>
            <div className="group relative flex justify-center">
              <button
                disabled={checkIfFieldsAreFilled(0, "end")}
                className={
                  activeTab === 3
                    ? "invisible self-end" + btns
                    : checkIfFieldsAreFilled(0, "end")
                    ? btnsnohover
                    : btns
                }
                onClick={() => setActiveTab(activeTab + 1)}
              >
                {t("nextstep")}
              </button>
              {checkIfFieldsAreFilled(0, "end") ? (
                <span className="w-[180%] absolute top-[43px] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  ✨ {t("uncompletedfields")}
                </span>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
