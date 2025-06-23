import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel-deprecated-prop-types";

import { Movie } from "@/types/types";
import MovieCard from "./MovieCard";
const { width, height } = Dimensions.get("window");
interface Props {
  trending: Movie[];
}
export default function TrendingMovie({ trending }: Props) {
  return (
    <View className="mb-5">
      <Carousel
        data={trending}
        renderItem={({ item }: { item: Movie }) => <MovieCard item={item} />}
        firstItem={1}
        sliderWidth={width}
        itemWidth={width * 0.7}
        inactiveSlideOpacity={0.6}
        loop={true}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
