import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

import React from 'react';
import NoteList from './src/components/NoteList';



export default function App() {
  return(
    <NoteList></NoteList>
  )
}

