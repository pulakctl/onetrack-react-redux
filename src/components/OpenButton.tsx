import { FC, useCallback } from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'

import { loadFile } from '../store/actionCreators'
import * as mm from 'music-metadata-browser'

type Props = {
    id: string,
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
                }

                dispatch(loadFile(file, title, art))
            })
        },
        [dispatch]
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
            <button id={props.id} type="button" onClick={onButtonClicked}>
                <label htmlFor="open-file-button">
                    <img src={props.openimg} style={{width: '50%', height: '50%'}}></img>
                </label>
            </button>
        </div>
    )
}