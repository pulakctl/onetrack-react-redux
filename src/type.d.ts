type PlayerState = {
    title: string,
    albumArt: string,
    currentFile: File,
    playing: boolean
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

type PlayerAction = LoadAction | TogglePlaybackAction

type DispatchType = (args: PlayerAction) => PlayerAction