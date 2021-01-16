import React from 'react';
import './App.css';
import { useSelector } from 'react-redux'

import Waveform from './components/Waveform'
import { ToggleButton } from './components/ToggleButton'
import OpenButton from './components/OpenButton'
import { AlbumArtDisplay } from './components/AlbumArtDisplay'
import { TrackNameDisplay } from './components/TrackNameDisplay'
import Background from './components/Background';

import * as Assets from './Assets'

function App() {
  const albumArtUrl: string = useSelector(
    (state: PlayerState) => state.albumArtUrl
  )
  const currentFileUrl: string = useSelector(
    (state: PlayerState) => state.currentFileUrl
  )
  const playing: boolean = useSelector(
    (state: PlayerState) => state.playing
  )
  const currentTrack: string = useSelector(
    (state: PlayerState) => state.title
  )

  return (
    <div className="App">
      <div className="container-outer">
        <AlbumArtDisplay id="AlbumArt" src={albumArtUrl} />
        <div className="container-details">
          <div className="container-trackdetails">
            <TrackNameDisplay id="TrackName" name={currentTrack} />
          </div>
          <div className="container-trackbuttons">
            <ToggleButton
              className="ActionButton"
              file={currentFileUrl}
              playing={playing}
              playimg={Assets.ICON_PLAY}
              pauseimg={Assets.ICON_PAUSE}
            />
            <OpenButton
              className="ActionButton"
              openimg={Assets.ICON_ADD}
              />
          </div>
        </div>
      </div>
      <Waveform id="waveform" />
      <Background id="background" />
    </div>
  );
}

export default App;
