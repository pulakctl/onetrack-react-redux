import React from 'react';
import './App.css';
import { useSelector } from 'react-redux'

import Waveform from './components/Waveform'
import { ToggleButton } from './components/ToggleButton'
import { OpenButton } from './components/OpenButton'
import { AlbumArtDisplay } from './components/AlbumArtDisplay'
import { ProgressDisplay } from './components/ProgressDisplay'
import { TrackNameDisplay } from './components/TrackNameDisplay'

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
  const progress: number = useSelector(
    (state: PlayerState) => state.progress
  )
  const duration: number = useSelector(
    (state: PlayerState) => state.duration
  )
  const currentTrack: string = useSelector(
    (state: PlayerState) => state.title
  )

  return (
    <div className="App">
      <AlbumArtDisplay id="AlbumArt" src={albumArt} />
      <TrackNameDisplay id="TrackName" name={currentTrack} />
      <ProgressDisplay id="Progress" progress={progress} duration={duration} />
      <OpenButton id="OpenButton" />
      <ToggleButton id="ToggleButton" file={currentFile} playing={playing} />
      <Waveform id="waveform" file={currentFile} playing={playing} />
    </div>
  );
}

export default App;
