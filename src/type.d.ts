type PlayerState = {
    title: string,
    fileUrl: string
}

type LoadAction = {
    type: string,
    url: string,
    title: string
}

type PlayerAction = LoadAction

type DispatchType = (args: PlayerAction) => PlayerAction