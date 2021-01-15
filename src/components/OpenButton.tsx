import { FC, useCallback } from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'

import { loadFile, updateBgColors } from '../store/actionCreators'
import * as mm from 'music-metadata-browser'
import Vibrant from 'node-vibrant'
import { Vec3 } from 'node-vibrant/lib/color'

type Props = {
    className: string,
    blankimg: string,
    openimg: string
}

export const OpenButton: FC<Props> = (props: Props) => {
    const dispatch: Dispatch<any> = useDispatch()

    const onFileSelected = useCallback(
        (event) => {
            if (event.target.files.length === 0) {
                return
            }

            const file = event.target.files[0]
            mm.parseBlob(file).then((metadata) => {
                const title = (metadata.common.title) ? metadata.common.title : file.name
            
                var art = props.blankimg
                if (metadata.common.picture) {
                    const blob = new Blob(
                        [metadata.common.picture[0].data.buffer],
                        {
                            type: metadata.common.picture[0].format
                        }
                    )
    
                    art = URL.createObjectURL(blob)

                    Vibrant.from(art).getPalette(
                        (err, palette) => {
                            /*
                            let c = palette?.DarkMuted?.rgb as Vec3
                            console.log('%c Dark Muted', `color: rgb(${c[0]}, ${c[1]}, ${c[2]})`)
                            c = palette?.Muted?.rgb as Vec3
                            console.log('%c Muted', `color: rgb(${c[0]}, ${c[1]}, ${c[2]})`)
                            c = palette?.LightMuted?.rgb as Vec3
                            console.log('%c Light Muted', `color: rgb(${c[0]}, ${c[1]}, ${c[2]})`)

                            c = palette?.DarkVibrant?.rgb as Vec3
                            console.log('%c Dark Vibrant', `color: rgb(${c[0]}, ${c[1]}, ${c[2]})`)
                            c = palette?.Vibrant?.rgb as Vec3
                            console.log('%c Vibrant', `color: rgb(${c[0]}, ${c[1]}, ${c[2]})`)
                            c = palette?.LightVibrant?.rgb as Vec3
                            console.log('%c Light Vibrant', `color: rgb(${c[0]}, ${c[1]}, ${c[2]})`)
                            */

                            if (palette?.Vibrant !== null && palette?.DarkMuted !== null) {
                                let a = palette?.Vibrant?.rgb as Vec3
                                let b = palette?.DarkMuted?.rgb as Vec3
                                let colors = [a, b]

                                dispatch(updateBgColors(colors))
                            } else {
                                console.log("ERROR: " + err)
                                console.log("PALETTE: " + palette)
                            }
                        }
                    )
                }

                dispatch(loadFile(file, title, art))
            })
        },
        [dispatch, props.blankimg]
    )
    
    const onButtonClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (event.target !== event.currentTarget)
          event.currentTarget?.click()
    }

    return (
        <div>
            <input
                id="open-file-button"
                type="file" accept="audio/*"
                onChange={onFileSelected}
                style={{display: "none"}}
            />
            <button className={props.className} type="button" onClick={onButtonClicked}>
                <label htmlFor="open-file-button">
                    <img src={props.openimg} alt="Open file" style={{width: '50%', height: '50%'}}></img>
                </label>
            </button>
        </div>
    )
}