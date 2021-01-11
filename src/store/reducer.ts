import * as actionTypes from "./actionTypes"
import blank_album_art from "../assets/blank_album.svg"

const initialState: PlayerState = {
    currentFile: new File([], ""),
    title: '',
    albumArt: blank_album_art
}

const reducer = (
    state: PlayerState = initialState,
    action: PlayerAction
): PlayerState => {
    switch (action.type) {
        case actionTypes.LOAD_FILE:
            return {
                currentFile: action.file,
                title: action.title,
                albumArt: action.albumArt
            }
    }

    return state;
}

export default reducer