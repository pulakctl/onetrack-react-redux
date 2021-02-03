import * as actionTypes from "./actionTypes"

export function loadFile(
    fileUrl: string, fileName: string,
    title: string, album: string, albumArtists: string, trackArtists: string,
    albumArtUrl: string
) {
    let action: LoadAction = {
        type: actionTypes.LOAD_FILE,
        fileUrl: fileUrl,
        fileName: fileName,
        metadata: {
            title: title,
            album: album,
            albumArtists: albumArtists,
            trackArtists: trackArtists,
        },
        albumArtUrl: albumArtUrl
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}

export function togglePlayback() {
    let action: TogglePlaybackAction = {
        type: actionTypes.TOGGLE_PLAYBACK
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}

export function updateBgColors(colors: number[][]) {
    let action: UpdateBgColorsAction = {
        type: actionTypes.UPDATE_BGCOLORS,
        colors: colors
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}

export function setReady(ready: boolean) {
    let action: SetReadyAction = {
        type: actionTypes.SET_READY,
        ready: ready
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}