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
                <Image className="rounded-ful" source={heart} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Emotional well being</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
            Emotional wellness is the ability to successfully handle life's stresses and adapt to change and difficult times.
            </Text>
        </View>
        <View className="bg-purple-200 p-4 rounded-xl space-y-2 w-11/12 mx-auto">
            <View className="flex-row items-center space-x-1">
                <Image className="rounded-ful" source={mentalHealth} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Mental Health</Text>
            </View>
            
            <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
            Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make healthy choices. 
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