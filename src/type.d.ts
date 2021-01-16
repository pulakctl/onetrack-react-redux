type PlayerState = {
    title: string,
    albumArtUrl: string,
    currentFileUrl: string,
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

type UpdateBgColorsAction = {
    type: string,
    colors: number[][]
}

type PlayerAction = LoadAction
        | UpdateBgColorsAction
        | TogglePlaybackAction

type DispatchType = (args: PlayerAction) => PlayerAction