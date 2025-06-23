import Detailed from "@/screens/Detailed";
import Home from "@/screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons.js";
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconname: string;
          if (route.name === "Home") {
            iconname = focused ? "home" : "home-outline";
          }
          if (route.name == "Detailed") {
            iconname = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconname} color={color} size={size} />;
        },
        tabBarActiveTintColor: "crimson",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Detailed"
        component={Detailed}
        options={{ headerShown: false, tabBarBadge: 10 }}
      />
    </Tab.Navigator>
  );
}
