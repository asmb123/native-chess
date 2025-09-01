import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import Card from '@/components/Card'

const play = () => {
  return (
    <ScrollView className="w-screen h-screen bg-black">
      <View className="w-screen h-24 bg-[#232323] flex flex-row justify-between items-center p-4 mt-5">

        <View className="flex flex-row items-center gap-5">
          <Image
            source={require('@/assets/images/pf.png')}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <Text className="text-white">Username</Text>
        </View>

        <View className="w-14 h-10 bg-black border-gray-400 border-2 rounded-xl flex items-center justify-center">
          <Text className="text-white">26</Text>
        </View>
      </View>

      <View className="w-[85vw] h-24 bg-cyan-300 mx-auto mt-10 rounded-2xl flex-row justify-between items-center">
        <View className="justify-center m-5 items-start">
          <Text className="font-bold text-3xl">TUTORIAL</Text>
          <Text className="text-xs">Learn How to Play</Text>
        </View>
        <View>
          <Image style={{ width: 100, height: 100 }} source={require('@/assets/images/victory.png')} />
        </View>
      </View>
      <Text className="text-white ml-5 mt-5 font-semibold text-2xl">1v1 Chess Battle:</Text>
      <View className="gap-6">
        <Text className="text-white ml-10 mt-7 font-semibold text-xl">For you</Text>
        <Card leftTop="WIN" leftBottom="$10" rightTop="Entry Fees" rightBottom="$2" />
        <Card leftTop="WIN" leftBottom="$10" rightTop="Entry Fees" rightBottom="$2" />
        <Card leftTop="WIN" leftBottom="$10" rightTop="Entry Fees" rightBottom="$2" />
      </View>
    </ScrollView>
  )
}

export default play