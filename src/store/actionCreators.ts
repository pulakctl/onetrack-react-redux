import * as actionTypes from "./actionTypes"

export function loadFile(fileName: string, title: string) {
    let action: LoadAction = {
        type: actionTypes.LOAD_FILE,
        fileName: fileName,
        title: title
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}