import { View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from 'expo-router';


const Auth = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login success:", data);

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
      }

      Alert.alert("Success", "Logged in successfully!");
      router.push('/play');

    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google OAuth");
    // logic
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
        className="w-full bg-blue-600 py-3 rounded-2xl items-center mb-6"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Link href='/signup'><Text className="text-gray-400 mb-4 text-2xl text-center underline">or Signup</Text></Link>
      <Text className="text-gray-400 mb-4 text-center">or continue with</Text>

      {/* Google Button */}
      <TouchableOpacity
        className="flex-row items-center justify-center w-full bg-white py-3 rounded-2xl"
        onPress={handleGoogleLogin}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          }}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <Text className="text-black text-lg font-semibold">Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Auth
