import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { loadFile } from './store/actionCreators';

import * as mm from 'music-metadata-browser'

function App() {
  const dispatch: Dispatch<any> = useDispatch()

  const onFileSelected = React.useCallback(
    (event) => {
      const file = event.target.files[0]
      mm.parseBlob(file).then((metadata) => {
        const title = (metadata.common.title) ? metadata.common.title : ""
        dispatch(loadFile(file.name, title))
      })
    },
    [dispatch]
  )

  return (
    <div className="App">
      <input type="file" onChange={onFileSelected} accept="audio/*"/>
    </div>
  );
}

export default App;
