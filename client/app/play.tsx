import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Chessboard from 'react-native-chessboard'

const { width } = Dimensions.get('window')

const Play = () => {
    return (
        <View className="flex-1 bg-[#121212] items-center justify-evenly py-5 overflow-x-hidden">
            {/* Top Player Info */}
            <View className="w-[90%] bg-[#1E1E1E] rounded-xl p-3 flex-row justify-between items-center shadow-md">
                <Text className="text-white text-lg font-semibold">Opponent</Text>
                <Text className="text-gray-400 text-base">1200</Text>
            </View>

            {/* Chessboard */}
            <View
                style={{ width: width * 0.9, height: width * 0.9 }}
                className="items-center justify-center shadow-lg bg-black"
            >
                <Chessboard />
            </View>

            {/* Bottom Player Info */}
            <View className="w-[90%] bg-[#1E1E1E] rounded-xl p-3 flex-row justify-between items-center shadow-md">
                <Text className="text-white text-lg font-semibold">You</Text>
                <Text className="text-gray-400 text-base">1250</Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-evenly w-[90%] mt-3">
                <TouchableOpacity className="flex-1 mx-1 bg-[#2E2E2E] py-2 rounded-lg items-center">
                    <Text className="text-white text-base font-medium">Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 mx-1 bg-[#2E2E2E] py-2 rounded-lg items-center">
                    <Text className="text-white text-base font-medium">Draw</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 mx-1 bg-[#B22222] py-2 rounded-lg items-center">
                    <Text className="text-white text-base font-medium">Resign</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Play
