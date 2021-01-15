type PlayerState = {
    title: string,
    albumArt: string,
    currentFile: File,
    playing: boolean,
    progress: number,
    duration: number,
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

type UpdateProgressAction = {
    type: string,
    progress: number
}

type UpdateDurationAction = {
    type: string,
    duration: number
}

type PlayerAction = LoadAction | UpdateProgressAction | UpdateDurationAction | TogglePlaybackAction

type DispatchType = (args: PlayerAction) => PlayerAction