type PlayerState = {
    title: string,
    albumArt: string,
    currentFile: File
}

type LoadAction = {
    type: string,
    file: File,
    title: string,
    albumArt: string
}

type PlayerAction = LoadAction

type DispatchType = (args: PlayerAction) => PlayerAction