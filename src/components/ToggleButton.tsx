import { FC } from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'

import { togglePlayback } from '../store/actionCreators'

type Props = {
    id: string,
    file: File,
    playing: boolean,
    playimg: string,
    pauseimg: string
}

export const ToggleButton: FC<Props> = (props: Props) => {
    const dispatch: Dispatch<any> = useDispatch()

    let toggle = () => {
        dispatch(togglePlayback())
    }

    let displayimg = props.playing ? props.pauseimg : props.playimg

    return (
        <button id={props.id} disabled={props.file.name === ""} onClick={toggle}>
            <img src={displayimg}></img>
        </button>
    )
}