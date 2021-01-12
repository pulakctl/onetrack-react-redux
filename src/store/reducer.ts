import * as actionTypes from "./actionTypes"
import blank_album_art from "../assets/blank_album.svg"

const initialState: PlayerState = {
    currentFile: new File([], ""),
    title: '',
    albumArt: blank_album_art,
    playing: true
}

function isLoadAction(action: PlayerAction): action is LoadAction {
    return (action as LoadAction).type === actionTypes.LOAD_FILE
}
function isTogglePlaybackAction(action: PlayerAction): action is TogglePlaybackAction {
    return (action as TogglePlaybackAction).type === actionTypes.TOGGLE_PLAYBACK
}

const reducer = (
    state: PlayerState = initialState,
    action: PlayerAction
): PlayerState => {
    if (isLoadAction(action)) {
        return {
            currentFile: action.file,
            title: action.title,
            albumArt: action.albumArt,
            playing: state.playing
        }
    } else if (isTogglePlaybackAction(action)) {
        return Object.assign({}, state, {
            playing: !state.playing
        })
    }

    return state;
}

export default reducer