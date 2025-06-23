import Loader from "@/components/loader";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

export default function Search() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-slate-900 flex-1">
      <View className="mx-4 border border-neutral-400  rounded-full flex-row justify-between items-center mt-16 ">
        <TextInput
          onChangeText={handleSearch}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className=" pl-6 flex-1 text-white font-semibold text-base tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-slate-500 text-white"
        >
          <XMarkIcon color={"white"} size={25} />
        </TouchableOpacity>
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
}
