import * as actionTypes from "./actionTypes"

export function loadFile(file: File, title: string, albumArt: string) {
    let action: LoadAction = {
        type: actionTypes.LOAD_FILE,
        file: file,
        title: title,
        albumArt: albumArt
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}