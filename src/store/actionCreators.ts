import * as actionTypes from "./actionTypes"

export function loadFile(fileName: string, title: string, albumArt: string) {
    let action: LoadAction = {
        type: actionTypes.LOAD_FILE,
        fileName: fileName,
        title: title,
        albumArt: albumArt
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}