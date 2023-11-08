interface YoutubePlaylistProps {
  lng: string;
  src: string;
}

export const YoutubePlaylist = ({ lng, src }: YoutubePlaylistProps) => {
  return (
    <iframe
      src={src}
      title="YouTube video player"
      className="z-10 border-black w-screen border-8 h-[250px] sm:h-[300px] sm:w-[500px]"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
      allowFullScreen
    ></iframe>
  );
};
