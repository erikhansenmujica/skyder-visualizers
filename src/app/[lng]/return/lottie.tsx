"use client";
import Lottie from "lottie-react";
import animationData from "@/lottie/blueTick.json";

export default function CustomTick() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Lottie
        animationData={animationData}
        className="flex justify-center items-center"
        loop={false}
      />
    </div>
  );
}
