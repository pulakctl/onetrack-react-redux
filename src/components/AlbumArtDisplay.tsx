import { FC } from 'react'

type Props = {
    id: string,
    src: string
}

export const AlbumArtDisplay: FC<Props> = (props: Props) => {
    return (
        <div>
            <img id={props.id} src={props.src} alt="Album art" />
        </div>
    )
}