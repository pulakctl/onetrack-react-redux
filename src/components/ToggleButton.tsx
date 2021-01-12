import { FC } from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'

import { togglePlayback } from '../store/actionCreators'

type Props = {
    file: File,
    playing: boolean
}

export const ToggleButton: FC<Props> = (props: Props) => {
    const dispatch: Dispatch<any> = useDispatch()

    let toggle = () => {
        dispatch(togglePlayback())
    }

    let display = props.playing ? "Pause" : "Play"

    return (
        <button disabled={props.file.name === ""} onClick={toggle}>{display}</button>
    )
}