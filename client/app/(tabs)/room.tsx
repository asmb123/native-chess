import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@react-native-vector-icons/fontawesome';

const room = () => {
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
      <View className='w-[90vw] h-[30vh] mx-auto mt-20 rounded bg-[#42235C] items-center'>
        <Text className='text-white font-bold text-2xl p-4 text-center'>
          Challenge Friends
        </Text>
        <Image
          style={{ width: 90, height: 90 }}
          source={require('@/assets/images/victory.png')} />
        <TouchableOpacity className='w-[80vw] h-18 p-5 flex-row justify-between items-center rounded bg-green-600'>
          <Text className='text-white text-xl'>
            Challenge a friend
          </Text>
          <FontAwesome name="whatsapp" color="#EEEEEE" size={25} />
        </TouchableOpacity>
        <Text className='text-white mt-2'>
          Invite and Win Cash
        </Text>
      </View>
    </ScrollView>
  )
}

export default room