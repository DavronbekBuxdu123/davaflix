import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilar,
  image500,
} from "@/api";
import Cast from "@/components/Cast";
import Loader from "@/components/loader";
import UpcomingMovie from "@/components/UpcomingMovie";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Video from "./Video";
const { width, height } = Dimensions.get("window");

export default function Movie() {
  const [like, isLike] = useState(false);
  const [loading, setLoading] = useState(true);

  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const id = item.id;

  useEffect(() => {
    getMovieCredits(), getMovieDetails(), getMovieSimilar();
  }, []);

  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(id);
    setMovie(data);
    setLoading(false);
    console.log("Movie Details", data);
  };
  4;
  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(id);
    setCast(data.cast);
    console.log("Credits", data);
  };
  const getMovieSimilar = async () => {
    const data = await fetchMovieSimilar(id);
    setSimilar(data.results);
    console.log("Similar", data);
  };
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="bg-slate-900 flex-1 "
      >
        <View className="w-full relative ">
          <SafeAreaView className="flex-row items-center justify-between px-4 w-full z-20 absolute top-10 ">
            <TouchableOpacity>
              <ChevronLeftIcon
                onPress={() => navigation.goBack()}
                size={30}
                color={"white"}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <HeartIcon
                onPress={() => isLike(!like)}
                size={35}
                color={like ? "red" : "white"}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View>
            <Image 
              source={{ uri: image500(movie.poster_path) }}
              style={{ width: width, height: height * 0.5 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}

        <View className="space-y-4 -mt-[35px]">
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.title}
          </Text>
          {movie?.id ? (
            <Text className="text-neutral-400 text-semibold text-center text-base">
              {movie?.status} ● {movie?.release_date.split("-")[0]} ●{" "}
              {movie?.runtime} min
            </Text>
          ) : null}

          <View className="flex-row justify-evenly mx-4 space-x-2">
            {movie?.genres?.map((genre, ind) => (
              <Text
                key={ind}
                className="text-neutral-400 text-base text-center text-semibold "
              >
                {genre?.name} {ind + 1 !== movie.genres.length ? "●" : null}
              </Text>
            ))}
          </View>

          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
          <View className="mx-4">
            <Video id={id} />
          </View>
        </View>
        {movie?.id && cast.length > 0 && <Cast cast={cast} />}

        {movie?.id && similar.length > 0 && (
          <UpcomingMovie upcoming={similar} title={"Similar Movies"} />
        )}
      </ScrollView>
    </>
  );
}
