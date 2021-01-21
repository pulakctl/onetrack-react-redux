import React from 'react';
import './App.css';
import { useSelector } from 'react-redux'

import Waveform from './components/Waveform'
import { ToggleButton } from './components/ToggleButton'
import OpenButton from './components/OpenButton'
import { AlbumArtDisplay } from './components/AlbumArtDisplay'
import { TrackDetailsDisplay } from './components/TrackDetailsDisplay'
import Background from './components/Background';

import * as Assets from './Assets'

function App() {
  const albumArtUrl: string = useSelector(
    (state: PlayerState) => state.albumArtUrl
  )
  const ready: boolean = useSelector(
    (state: PlayerState) => state.ready
  )
  const playing: boolean = useSelector(
    (state: PlayerState) => state.playing
  )
  const currentTrack: string = useSelector(
    (state: PlayerState) => state.title
  )

  return (
    <div className="App">
      <div className="container-trackdetails">
        <AlbumArtDisplay id="AlbumArt" src={albumArtUrl} />
        <TrackDetailsDisplay id="TrackDetails" name={currentTrack} />
      </div>
      <div className="container-controls">
          <ToggleButton
            className="ActionButton"
            enabled={ready}
            playing={playing}
            playimg={Assets.ICON_PLAY}
            pauseimg={Assets.ICON_PAUSE}
          />
          <OpenButton
            className="ActionButton"
            openimg={Assets.ICON_ADD}
            />
        </div>
      <Waveform id="waveform" />
      <Background id="background" />
    </div>
  );
}

export default App;
