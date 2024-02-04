import { StatusBar } from 'expo-status-bar';


import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import React, {useState, useEffect} from 'react';
import { StyleSheet, Keyboard, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import {Note} from './src/models';
import NoteList from './src/components/NoteList';



export default function App() {
  return(
    <NoteList></NoteList>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    borderWidth: 1,
    width: 350,
    marginBottom: 10
  },
  buttons: {
    marginTop: 50,
  },
  noteButton: {
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#f5f7fa", 
    paddingVertical: 5, 
    paddingHorizontal: 5,
    borderRadius: 5, 
    borderWidth: 1,
    marginTop: 10,
    width: "100%"
  },
});
