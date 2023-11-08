"use client";

interface FullScreenVideoProps {
  video: string;
  children?: React.ReactNode;
}

export const FullScreenVideo = ({ video, children }: FullScreenVideoProps) => {
  return (
    <div className="h-full w-full z-10 bg-black">
      {children ? (
        children
      ) : (
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
