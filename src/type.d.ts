type PlayerState = {
    title: string,
    fileName: string
}

type LoadAction = {
    type: string,
    fileName: string,
    title: string
}

type PlayerAction = LoadAction

type DispatchType = (args: PlayerAction) => PlayerAction