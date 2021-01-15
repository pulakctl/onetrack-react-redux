import { FC } from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'

import { togglePlayback } from '../store/actionCreators'

type Props = {
    className: string,
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
        <button className={props.className} disabled={props.file.name === ""} onClick={toggle}>
            <img src={displayimg} style={{width: '50%', height: '50%'}}></img>
        </button>
    )
}