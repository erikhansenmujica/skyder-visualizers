export const MessagesInBetween = ({
  text,
  size,
  inverted,
  firstScrollRef,
  gradient,
  gradienttext,
  highlightwords,
  video,
}: {
  text: string;
  size?: string;
  inverted?: boolean;
  firstScrollRef?: React.RefObject<HTMLDivElement>;
  gradient?: boolean;
  gradienttext?: boolean;
  highlightwords?: string[];
  video?: string;
}) => {
  const words = highlightwords ? text.split(" ") : [];
  const sizeClass = size ? "text-" + size : "text-1xl";
  return inverted || gradient ? (
    <header
      ref={firstScrollRef}
      className={
        video
          ? "relative w-screen"
          : "" +
            (gradient
              ? "bg-gradient-to-r from-blue-500 to-teal-400 w-full py-20 mb-400 "
              : "bg-transparent w-full py-20 mb-400 bg-gray-800 border-gray-700 text-white")
      }
    >
      {video && (
        <div className="absolute top-0 w-full z-[-1]">
          <video autoPlay playsInline className=" w-full" muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      {video && (
        <div className="absolute bg-gradient-to-t from-transparent to-black top-0 w-full h-full md:h-[500px] z-0"></div>
      )}
      <div className="mx-auto text-center flex flex-col justify-between">
        <h1
          className={
            gradienttext && !highlightwords
              ? sizeClass +
                "  text-white bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-teal-400  m-5 p-0"
              : sizeClass + " z-10 font-bold text-white m-5 p-0"
          }
        >
          {highlightwords
            ? words.map((word, i) => {
                const className =
                  " bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-teal-400";
                if (highlightwords.includes(word)) {
                  if (words.indexOf(word) === 0) {
                    return (
                      <span className={className} key={i}>
                        {word}{" "}
                      </span>
                    );
                  } else if (
                    highlightwords.indexOf(word) ===
                    highlightwords.length - 1
                  ) {
                    return (
                      <span key={i} className={className}>
                        {" "}
                        {word}
                      </span>
                    );
                  } else
                    return (
                      <span key={i} className={className}>
                        {" "}
                        {word}{" "}
                      </span>
                    );
                } else
                  return words.indexOf(word) === 0
                    ? word + " "
                    : words.indexOf(word) === words.length - 1
                    ? " " + word
                    : " " + word + " ";
              })
            : text}
        </h1>
      </div>
    </header>
  ) : (
    <header ref={firstScrollRef} className="bg-gray-100 w-full py-20 mb-400 ">
      <div className="mx-auto text-center flex flex-col justify-between">
        <h1
          className={
            gradienttext && !highlightwords
              ? sizeClass +
                " font-black bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-teal-400  m-5 p-0"
              : sizeClass + " font-bold text-gray-800 m-5 p-0"
          }
        >
          {highlightwords
            ? words.map((word, i) => {
                const className =
                  "font-black bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-teal-400";
                if (highlightwords.includes(word)) {
                  if (words.indexOf(word) === 0) {
                    return (
                      <span className={className} key={i}>
                        {word}{" "}
                      </span>
                    );
                  } else if (
                    highlightwords.indexOf(word) ===
                    highlightwords.length - 1
                  ) {
                    return (
                      <span key={i} className={className}>
                        {" "}
                        {word}
                      </span>
                    );
                  } else
                    return (
                      <span key={i} className={className}>
                        {" "}
                        {word}{" "}
                      </span>
                    );
                } else
                  return words.indexOf(word) === 0
                    ? word + " "
                    : words.indexOf(word) === words.length - 1
                    ? " " + word
                    : " " + word + " ";
              })
            : text}
        </h1>
      </div>
    </header>
  );
};
