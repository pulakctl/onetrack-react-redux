import * as actionTypes from "./actionTypes"

export function loadFile(fileName: string) {
    let action: LoadAction = {
        type: actionTypes.LOAD_FILE,
        fileName: fileName
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}