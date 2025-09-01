import { View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from 'expo-router';

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      console.log("Signup success:", data);

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
      }

      Alert.alert("Success", "Account created successfully!");

    } catch (err: any) {
      console.error("Signup error:", err);
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  return (
    <View className="bg-black w-screen h-screen gap-2 overflow-y-auto">
      <View className="w-screen h-1/3">
        <View className='bg-[#262421] w-48 h-[66px] z-10 absolute top-[108px] left-28'></View>
        <Image
          source={require('@/assets/images/chessbg.png')}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <Text className='text-white p-2'>Username</Text>
      <TextInput
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-2xl mb-4"
        placeholder="John Doe"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      <Text className='text-white p-2'>Password</Text>
      <TextInput
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-2xl mb-6"
        placeholder="**********"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="w-full bg-green-600 py-3 rounded-2xl items-center mb-6"
        onPress={handleSignup}
      >
        <Text className="text-white text-lg font-semibold">Sign Up</Text>
      </TouchableOpacity>
      <Link href='/login'><Text className="text-gray-400 text-2xl mb-4 text-center underline">or Login</Text></Link>
    </View>
  )
}

export default Signup;
