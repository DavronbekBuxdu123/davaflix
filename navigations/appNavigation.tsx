import Home from "@/screens/Home";
import Movie from "@/screens/Movie";
import Person from "@/screens/Person";
import Search from "@/screens/Search";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
const Stack = createNativeStackNavigator();
export default function AppNavigations() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Person"
        component={Person}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
