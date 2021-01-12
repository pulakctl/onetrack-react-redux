import { FC } from 'react'

type Props = {
    name: string
}

export const TrackNameDisplay: FC<Props> = (props: Props) => {
    let display = 'N/A'

    if (props.name.length > 0) {
        display = props.name
    }

    return (
        <div>
            <p>{display}</p>
        </div>
    )
}