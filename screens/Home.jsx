import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
} from "@/api";
import Loader from "@/components/loader";
import TrendingMovie from "@/components/TrendingMovie";
import UpcomingMovie from "@/components/UpcomingMovie";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [toprated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getTopratedMovie();
    getPopularMovie();
  }, []);
  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie();
    setUpcoming(data.results);
  };
  const getTopratedMovie = async () => {
    const data = await fetchTopRatedMovie();
    setTopRated(data.results);
  };
  const getPopularMovie = async () => {
    const data = await fetchPopularMovie();
    setPopular(data.results);
  };
  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView className="">
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx pr-4 ">
          <Image
            className="w-[200px]  h-[70px] "
            source={require(".././assets/images/logo.png")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <AntDesign strokeWidth={2} name="search1" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {trending.length > 0 && <TrendingMovie trending={trending} />}
          {upcoming.length > 0 && (
            <UpcomingMovie upcoming={upcoming} title={"Upcoming Movies"} />
          )}
          {upcoming.length > 0 && (
            <UpcomingMovie
              upcoming={trending.reverse()}
              title={"Trending Movies"}
            />
          )}
          {popular.length > 0 && (
            <UpcomingMovie upcoming={popular} title={"Popular Movies"} />
          )}
          {toprated.length > 0 && <TrendingMovie trending={toprated} />}
        </ScrollView>
      )}
    </View>
  );
}
