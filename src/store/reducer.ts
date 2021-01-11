import * as actionTypes from "./actionTypes"

const initialState: PlayerState = {
    title: '',
    fileName: ''
}

const reducer = (
    state: PlayerState = initialState,
    action: PlayerAction
): PlayerState => {
    switch (action.type) {
        case actionTypes.LOAD_FILE:
            return {
                title: action.title,
                fileName: action.fileName
            }
    }

    return state;
}

export default reducer