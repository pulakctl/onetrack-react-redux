import React from 'react';
import './App.css';
import { useSelector } from 'react-redux'

import Waveform from './components/Waveform'
import { ToggleButton } from './components/ToggleButton'
import { OpenButton } from './components/OpenButton'
import { AlbumArtDisplay } from './components/AlbumArtDisplay'
import { TrackNameDisplay } from './components/TrackNameDisplay'
import Background from './components/Background';

import * as Assets from './Assets'

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
  const currentTrack: string = useSelector(
    (state: PlayerState) => state.title
  )

  return (
    <div className="App">
      <div className="container-outer">
        <AlbumArtDisplay id="AlbumArt" src={albumArt} />
        <div className="container-details">
          <div className="container-trackdetails">
            <TrackNameDisplay id="TrackName" name={currentTrack} />
          </div>
          <div className="container-trackbuttons">
            <ToggleButton
              className="ActionButton"
              file={currentFile}
              playing={playing}
              playimg={Assets.ICON_PLAY}
              pauseimg={Assets.ICON_PAUSE}
            />
            <OpenButton
              className="ActionButton"
              blankimg={Assets.ICON_BLANK_ALBUM}
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
