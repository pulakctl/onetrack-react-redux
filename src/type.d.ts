type PlayerState = {
    title: string,
    albumArt: string,
    fileName: string
}

type LoadAction = {
    type: string,
    fileName: string,
    title: string,
    albumArt: string
}

type PlayerAction = LoadAction

type DispatchType = (args: PlayerAction) => PlayerAction