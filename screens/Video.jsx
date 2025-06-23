import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Video({ id }) {
  //   const { movieId } = route.params;
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8a3ec54bda6dc03a0c759941f802aa32`
      );
      const data = await res.json();
      console.log(id);
      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) setVideoKey(trailer.key);
    };
    fetchVideo();
  }, []);

  return (
    <ScrollView className="bg-black">
      {videoKey && (
        <YoutubePlayer height={230} play={false} videoId={videoKey} />
      )}
    </ScrollView>
  );
}
