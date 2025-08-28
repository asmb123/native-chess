import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black gap-10">
      <Text className="text-3xl font-bold  text-white text-center">Click below to Play Chess</Text>
      <Link href="/play" className=" text-white text-3xl bg-gray-700 w-1/2 text-center rounded-xl">
        <TouchableOpacity>
          Play
        </TouchableOpacity>
      </Link>
    </View>
  );
}
