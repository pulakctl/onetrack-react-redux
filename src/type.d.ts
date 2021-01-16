type PlayerState = {
    title: string,
    albumArt: string,
    currentFile: File,
    playing: boolean,
    bgColors: number[][]
}

type LoadAction = {
    type: string,
    file: File,
    title: string,
    albumArt: string
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