import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000", // black background
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24, marginBottom: 40 }}>
        Chess App
      </Text>

      <Pressable
        onPress={() => router.push("/play")}
        style={{
          backgroundColor: "#1E90FF", // simple blue button
          paddingVertical: 15,
          paddingHorizontal: 50,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Play</Text>
      </Pressable>
    </View>
  );
}