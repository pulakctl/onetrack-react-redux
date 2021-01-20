type PlayerState = {
    title: string,
    albumArtUrl: string,
    currentFileUrl: string,
    ready: boolean,
    playing: boolean,
    bgColors: number[][]
}

type LoadAction = {
    type: string,
    fileUrl: string,
    title: string,
    albumArtUrl: string
}

type TogglePlaybackAction = {
    type: string
}

type SetReadyAction = {
    type: string,
    ready: boolean
}

type UpdateBgColorsAction = {
    type: string,
    colors: number[][]
}

type PlayerAction = LoadAction
        | UpdateBgColorsAction
        | SetReadyAction
        | TogglePlaybackAction

type DispatchType = (args: PlayerAction) => PlayerAction