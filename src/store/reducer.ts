import * as actionTypes from "./actionTypes"

const initialState: PlayerState = {
    title: "",
    fileUrl: ""
}

const reducer = (
    state: PlayerState = initialState,
    action: PlayerAction
): PlayerState => {
    switch (action.type) {
        case actionTypes.LOAD_FILE:
            return {
                title: action.title,
                fileUrl: action.url
            }
    }

    return state;
}

export default reducer