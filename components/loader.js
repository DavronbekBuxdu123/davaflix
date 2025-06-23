import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Loader() {
  return (
    <View className="flex-1 h-screen  items-center justify-center ">
      <View className="">
        <LottieView
          source={require("./loader.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
