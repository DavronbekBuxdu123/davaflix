import { fetchPersonDetail, fetchPersonMovie, image342 } from "@/api";
import Loader from "@/components/loader";
import UpcomingMovie from "@/components/UpcomingMovie";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
const { width, height } = Dimensions.get("window");
export default function Person() {
  useEffect(() => {
    getPersonDetail();
    getPersonMovies();
  }, [id]);
  const [personDetail, setPersonDetail] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [like, isLike] = useState(false);
  const { params: item } = useRoute();
  const id = item.id;
  const getPersonDetail = async () => {
    try {
      const data = await fetchPersonDetail(id);
      setPersonDetail(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getPersonMovies = async () => {
    try {
      const data = await fetchPersonMovie(id);

      setPersonMovies(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      className="bg-slate-900 flex-1"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
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
      {loading ? (
        <Loader />
      ) : (
        <View className="mt-10">
          <View
            style={{ elevation: 10 }}
            className="flex-row justify-center shadow-lg  "
          >
            <View className=" items-center  rounded-full  h-72 w-72 overflow-hidden border-neutral-500 border-2">
              <Image
                style={{ width: width * 0.74, height: height * 0.43 }}
                source={{ uri: image342(personDetail?.profile_path) }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-white text-center text-3xl font-bold">
              {personDetail?.name}
            </Text>
            <Text className="text-neutral-400 text-center text-base font-bold">
              {personDetail?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 items-center flex-row justify-between rounded-full bg-slate-700 ">
            <View className="border-r-2 border-r-neutral-400  px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-400 text-sm">
                {personDetail?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400  px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-400 text-sm">
                {personDetail?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400  px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-400 text-sm">
                {personDetail?.known_for_department}
              </Text>
            </View>
            <View className="  px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-400 text-sm">
                {personDetail?.popularity?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <View className="mx-4 space-y-2 my-6">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personDetail?.biography}
            </Text>
          </View>
          {personDetail?.id && personMovies.length > 0 && (
            <UpcomingMovie title={"Movies"} upcoming={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
