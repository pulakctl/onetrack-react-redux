import { FC } from 'react'

type Props = {
    src: string
}

export const AlbumArtDisplay: FC<Props> = (props: Props) => {
    return (
        <div>
            <img src={props.src} style={{ width: 80, height: 80 }} alt="Album art" />
        </div>
    )
}