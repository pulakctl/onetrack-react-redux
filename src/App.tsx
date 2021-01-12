import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import Waveform from './components/Waveform'
import { ToggleButton } from './components/ToggleButton'
import { OpenButton } from './components/OpenButton'

function App() {
  const albumArt: string = useSelector(
    (state: PlayerState) => state.albumArt
  )
  const currentFile: File = useSelector(
    (state: PlayerState) => state.currentFile
  )
  const playing: boolean = useSelector(
    (state: PlayerState) => state.playing
  )

  const dispatch: Dispatch<any> = useDispatch()

  return (
    <div className="App">
      <img src={albumArt} style={{ width: 80, height: 80 }} alt="Album art" />
      <OpenButton />
      <ToggleButton file={currentFile} playing={playing} />
      <Waveform file={currentFile} playing={playing} />
    </div>
  );
}

export default App;
