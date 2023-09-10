//@ts-nocheck
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import {React,useCallback} from 'react'
import Features from './Features'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState, useRef, useEffect } from 'react';
import bot from '../../assets/images/bot.png'
import loadingGif from '../../assets/images/loading.gif'
import voiceLoading from '../../assets/images/voiceLoading.gif'
import recordingIcon from '../../assets/images/recordingIcon.png'
import heart from '../../assets/images/heart-1077724_1280.jpg'
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';
import { dummyMessages } from '../constants/index.tsx';
import { apiCall } from '../api/openAiapi';
import { Alert } from 'react-native';

const HomeScreen = () => {
  const [result, setResult] = useState('');
  const [texts, setTexts] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(dummyMessages); //currently i am working here 
  const [speaking, setSpeaking] = useState(false);
  const scrollViewRef = useRef();

  // useEffect(() => {
  //   console.log('result has changed:', result);
  //   console.log('texts has changed:', texts);
  //   setResult(result)
  // }, [result, texts]);

  useEffect(() => {

    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;
    
    // text to speech events
    Tts.setDefaultLanguage('en-IE');
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {console.log('finish', event); setSpeaking(false)});
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    
    
    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const setResultsAndTexts = useCallback((value) => {
    setResult(prevResult => text);
    setTexts(value);
  }, []);
  const speechStartHandler = (e:any) => {
    console.log('speech start event', e);
  };
  const speechEndHandler = (e:any) => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const text2='';
  const speechResultsHandler = (e:any) => {
    console.log('speech event: ',e);
    const text = e.value[0];
    setResult(text);
    console.log("text :",text)
    console.log("texts :",texts)
    console.log("result2 :",result)
    
  };

  const speechErrorHandler = (e:any)=>{
    console.log('speech error: ',e);
  }

  
  const startRecording = async () => {
    setRecording(true);
    Tts.stop(); 
    try {
      await Voice.start('en-GB') // en-US
      

    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    
    try {
      await Voice.stop();
      setRecording(false);
      console.log('am i even reaching inside try block of stopRecording?')
      await fetchResponse();
      console.log('after fetch_response')
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    Tts.stop();
    setSpeaking(false);
    setLoading(false);
    setMessages([]);
  };



  const fetchResponse = async ()=>{
    if(result.trim().length>0){
      setLoading(true);
      console.log('am i reaching inside fetchResponse?')
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      console.log('are you even running? fetch response')

      // scroll to the bottom of the view
      updateScrollView();

      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then((res:any)=>{
        console.log('got api data');
        setLoading(false);
        if(res.success){
          setMessages([...res.data]);
          setResult('');
          updateScrollView();

          // now play the response to user
          startTextToSpeach(res.data[res.data.length-1]);
          
        }else{
          Alert.alert('Error', res.msg);
        }
        
      })
    }
  }


  const updateScrollView = ()=>{
    setTimeout(()=>{
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    },200)
  }

  const startTextToSpeach = (message:any)=>{
    if(!message.content.includes('https')){
      setSpeaking(true);
      // playing response with the voice id and voice speed
      Tts.speak(message.content, {
        iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.5,
      });
    }
  }
  

  const stopSpeaking = ()=>{
    Tts.stop();
    setSpeaking(false);
  }



  console.log("messages :",messages)
  console.log("result :",result)
  


  return (
      <View className="flex-1 bg-white">
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView className="flex-1 flex mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image  
              source={bot}
              style={{height: hp(15), width: hp(15)}}
          />
        </View>
        
        {/* features || message history */}
        {
          messages.length>0? (
            <View className="space-y-2 flex-1">
              <Text className="text-gray-700 font-semibold ml-1" style={{fontSize: wp(5)}}>Assistant</Text>
        
              <View 
                style={{height: hp(68)}} 
                className="bg-neutral-200 rounded-3xl p-4">
                  <ScrollView  
                    ref={scrollViewRef} 
                    bounces={false} 
                    className="space-y-4" 
                    showsVerticalScrollIndicator={false}
                  >
                    {
                      messages.map((message, index)=>{
                        if(message.role=='assistant'){
                          if(message.content.includes('https')){
                            // result is an ai image
                            return (
                              <View key={index} className="flex-row justify-start">
                                <View 
                                  className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                    <Image  
                                      source={{uri: message.content}} 
                                      className="rounded-2xl"  
                                      resizeMode="contain" 
                                      style={{height: wp(60), width: wp(60)}} 
                                    />
                                </View>
                              </View>
                              
                              
                            )
                          }else{
                            // chat gpt response
                            return (
                              <View 
                                key={index} style={{width: wp(70)}} 
                                className="bg-emerald-100 p-2 rounded-xl rounded-tl-none">
                                <Text className="text-neutral-800" style={{fontSize: wp(4)}}  >
                                  {message.content}
                                </Text>
                              </View>
                            )
                          }
                        }else{
                          // user input text
                          return (
                            <View key={index} className="flex-row justify-end">
                              <View 
                                style={{width: wp(70)}} 
                                className="bg-slate-100 p-2 rounded-xl rounded-tr-none">
                                <Text className="text-neutral-800" style={{fontSize: wp(4)}}  >
                                  {message.content}
                                </Text>
                              </View>
                            </View>
                          );
                        }
                        
                        
                      })
                    }
                  </ScrollView>
              </View>
            </View>
          ): (
              <Features />
          )
        }

        {/* recording, clear and stop buttons */}
        <View className="flex justify-center items-center">
          {
            loading? (
              <Image 
                source={loadingGif}
                style={{width: hp(10), height: hp(10)}}
              />
            ):
              recording ? (
                <TouchableOpacity className="space-y-2" onPress={stopRecording}>
                  {/* recording stop button */}
                  <Image 
                    className="rounded-full" 
                    source={voiceLoading}
                    style={{width: hp(10), height: hp(10)}}
                  />
                </TouchableOpacity>
                
              ) : (
                <TouchableOpacity onPress={startRecording}>
                  {/* recording start button */}
                  <Image 
                    className="rounded-full" 
                    source={recordingIcon}
                    style={{width: hp(10), height: hp(10)}}
                  />
                </TouchableOpacity>
              )
          }
          {
            messages.length>0 && (
              <TouchableOpacity 
                onPress={clear} 
                className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
              >
                <Text className="text-white font-semibold">Clear</Text>
              </TouchableOpacity>
            )
          }
          {
            speaking && (
              <TouchableOpacity 
                onPress={stopSpeaking} 
                className="bg-red-400 rounded-3xl p-2 absolute left-10"
              >
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            )
          }
            
            
          
        </View>
        
      </SafeAreaView>
    </View>
  
  )
}

export default HomeScreen

const styles = StyleSheet.create({})