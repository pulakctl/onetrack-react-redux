import { FC } from 'react'

type Props = {
    id: string,
    src: string
}

export const AlbumArtDisplay: FC<Props> = (props: Props) => {
    return (
        <div id={props.id}>
            <img style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "auto"
            }} src={props.src} alt="Album art" />
        </div>
    )
}