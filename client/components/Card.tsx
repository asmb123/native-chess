import { View, Text } from 'react-native'
import React from 'react'

const Card = ({ leftTop, leftBottom, rightTop, rightBottom }: { leftTop: string, leftBottom: string, rightTop: string, rightBottom: string }) => {
    return (
        <View className='w-screen mb-1'>
            <View className='w-[85vw] h-8 rounded-t-2xl bg-[#2613DB] m-auto'><Text className='text-white ml-4 mt-1'>LAST PLAYED</Text></View>
            <View className='w-[85vw] h-28 bg-[#212020] flex-row justify-between items-center m-auto'>
                <View className='gap-1 ml-8 mt-2'>
                    <Text className='text-gray-500'>{leftTop}</Text>
                    <Text className='text-yellow-400 text-xl font-bold'>{leftBottom}</Text>
                </View>
                <View className='gap-1'>
                    <Text className='text-gray-500'>{rightTop}</Text>
                    <Text className='text-white mr-10 bg-green-500 px-3 py-1 rounded'>{rightBottom}</Text>
                </View>
            </View>
            <View className='w-[85vw] h-8 rounded-b-2xl bg-[#333333] m-auto'><Text className='text-white ml-4 mt-1'>LAST PLAYED</Text></View>
        </View>
    )
}

export default Card