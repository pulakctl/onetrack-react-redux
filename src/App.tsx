import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { loadFile } from './store/actionCreators';

import * as mm from 'music-metadata-browser'
import blank_album_art from './assets/blank_album.svg'

function App() {
  const albumArt: string = useSelector(
    (state: PlayerState) => state.albumArt
  )

  const dispatch: Dispatch<any> = useDispatch()

  const onFileSelected = React.useCallback(
    (event) => {
      const file = event.target.files[0]
      mm.parseBlob(file).then((metadata) => {
        const title = (metadata.common.title) ? metadata.common.title : file.name
        
        var art = blank_album_art
        if (metadata.common.picture) {
          const blob = new Blob(
            [metadata.common.picture[0].data.buffer],
            {
              type: metadata.common.picture[0].format
            }
          )

          art = URL.createObjectURL(blob)
        }

        dispatch(loadFile(file, title, art))
      })
    },
    [dispatch]
  )

  return (
    <div className="App">
      <img src={albumArt} style={{ width: 80, height: 80 }} alt="Album art" />
      <input type="file" onChange={onFileSelected} accept="audio/*"/>
    </div>
  );
}

export default App;
