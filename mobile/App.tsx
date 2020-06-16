import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {AppLoading} from 'expo';

import Routes from './src/routes';
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';
//Uma das diferenças entre react e react native é que:
//No react usamos jsx -- javascript com xml e temos as tags de html (div, h1, p, span e essas coisas)
//Ja no react-native temos outras tags como View (que representa div, main, section, header e essas coisas)
//Text representa h1, p, span, strong e essas tags de texto

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded){
    return <AppLoading />
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent></StatusBar>
      <Routes />
    </> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
});
