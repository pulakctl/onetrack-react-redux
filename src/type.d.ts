type PlayerState = {
    fileName: string,
    albumArtUrl: string,
    metadata: {
        title: string,
        album: string,
        trackArtists: string,
        albumArtists: string,
    },
    currentFileUrl: string,
    ready: boolean,
    playing: boolean,
    bgColors: number[][]
}

type LoadAction = {
    type: string,
    fileName: string,
    metadata: {
        title: string,
        album: string,
        trackArtists: string,
        albumArtists: string,
    },
    albumArtUrl: string
    fileUrl: string,
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