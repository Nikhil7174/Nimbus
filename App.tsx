//@ts-nocheck
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation'
import { apiCall } from './src/api/openAiapi'

const App = () => {
  // useEffect(()=>{
  //   apiCall('create an image of a dog playing with cat')
  // })
  return (
    
    <Navigation/>
    
  )
}

export default App

// const styles = StyleSheet.create({})