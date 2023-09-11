import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import heart from '../../assets/images/heart-1077724_1280.jpg'
import mentalHealth from '../../assets/images/mental-health-3332122_1280.png'
import chatgptIcon from '../../assets/images/chatgptIcon.png'
import dalleIcon from '../../assets/images/dalleIcon.png'
import smartaiIcon from '../../assets/images/smartaiIcon.png'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Features() {
  return (
    <ScrollView style={{height: hp(60)}} bounces={false} showsVerticalScrollIndicator={false} className="space-y-4">
        <Text style={{fontSize: wp(6.5)}} className="font-semibold text-gray-700">Features</Text>
        <View className="bg-emerald-200 p-4 rounded-xl space-y-2 w-11/12 mx-auto">
            <View className="flex-row items-center space-x-1">
                <Image className="rounded-ful" source={chatgptIcon} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">ChatGPT</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
            ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.
            </Text>
        </View>
        <View className="bg-purple-200 p-4 rounded-xl space-y-2 w-11/12 mx-auto">
            <View className="flex-row items-center space-x-1">
                <Image className="rounded-ful" source={dalleIcon} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Dall-E</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
            DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity. 
            </Text>
        </View>
        <View className="bg-cyan-200 p-4 rounded-xl space-y-2 w-11/12 mx-auto">
            <View className="flex-row items-center space-x-1">
                <Image className="rounded-ful" source={smartaiIcon} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Smart AI</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
                A powerful voice assistant with the abilities of generative AI, providing you the best of both worlds.
            </Text>
        </View>
    </ScrollView>
  )
}