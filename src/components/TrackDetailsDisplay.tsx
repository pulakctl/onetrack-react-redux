import './TrackDetailsDisplay.css'
import { FC } from 'react'

type Props = {
    id: string,
    name: string
}

export const TrackDetailsDisplay: FC<Props> = (props: Props) => {
    let display = 'N/A'

    if (props.name.length > 0) {
        display = props.name
    }

    return (
        <div id={props.id}>
            <div className="track-detail-wrapper">
                <p className="track-detail-content">{display}</p>
            </div>
        </div>
    )
}