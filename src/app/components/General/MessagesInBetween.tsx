export const MessagesInBetween = ({
  text,
  size,
  inverted,
  firstScrollRef,
  gradient,
  gradienttext,
  highlightwords,
}: {
  text: string;
  size?: string;
  inverted?: boolean;
  firstScrollRef?: React.RefObject<HTMLDivElement>;
  gradient?: boolean;
  gradienttext?: boolean;
  highlightwords?: string[];
}) => {
  const words = highlightwords ? text.split(" ") : [];
  const sizeClass = size ? "text-" + size : "text-1xl";
  return inverted || gradient ? (
    <header
      ref={firstScrollRef}
      className={
        gradient
          ? "bg-gradient-to-r from-blue-500 to-teal-400 w-full py-20 mb-400 "
          : "bg-transparent w-full py-20 mb-400 bg-gray-800 border-gray-700 text-white"
      }
    >
      <div className="mx-auto text-center flex flex-col justify-between">
        <h1
          className={
            gradienttext && !highlightwords
              ? sizeClass +
                " text-white bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-teal-400  m-5 p-0"
              : sizeClass + " font-bold text-white m-5 p-0"
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
