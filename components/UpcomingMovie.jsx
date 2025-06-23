import { image185 } from "@/api";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default function UpcomingMovie({ upcoming, title }) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <Text className="text-red-500 text-xl font-semibold mx-6">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {upcoming.map((item) => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => {
              navigation.navigate("Movie", { id: item.id });
            }}
          >
            <View className="space-y-1 mr-4">
              <Image
                style={{ width: width * 0.3, height: height * 0.2 }}
                className="rounded-3xl"
                source={{ uri: image185(item.poster_path) }}
              />
              <Text className="text-white">
                {item.title.length > 12
                  ? item.title.slice(0, 12) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
