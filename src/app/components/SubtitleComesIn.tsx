interface SubtitlesComesInProps {
  firstScrollRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
  text: string;
}

export const SubtitlesComesIn = ({
  firstScrollRef,
  isVisible,
  text,
}: SubtitlesComesInProps) => (
  <div
    onClick={() =>
      firstScrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    className={`${
      isVisible ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-2"
    }
    p-6
    duration-1000 z-6
    flex flex-col h-screen justify-center items-center color-white fixed bottom-0 left-0 right-0 z-0 `}
  >
    <p className="text-white text-1xl cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300">
      {text}
    </p>
  </div>
);
