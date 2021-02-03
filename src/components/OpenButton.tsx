import { ChangeEvent, Component } from 'react'
import { Dispatch } from 'redux'

import { loadFile, updateBgColors } from '../store/actionCreators'
import * as mm from 'music-metadata-browser'
import Vibrant from 'node-vibrant'
import { Vec3 } from 'node-vibrant/lib/color'
import * as Assets from '../Assets'
import { connect } from 'react-redux'

type Props = {
    dispatch: Dispatch<any>,
    className: string,
    openimg: string
}

type State = {
    file: File,
    fileUrl: string,
    art: Blob,
    artUrl: string
}

class OpenButton extends Component<Props, State>{
    defaultFile = new File([], '')
    defaultFileUrl = URL.createObjectURL(this.defaultFile)
    defaultArt = Assets.BLOB_BLANK_ALBUM
    defaultArtUrl = Assets.ICON_BLANK_ALBUM

    constructor(props: Props) {
        super(props)

        this.state = {
            file: this.defaultFile,
            fileUrl: this.defaultFileUrl,
            art: this.defaultArt,
            artUrl: ''
        }

        this.onFileSelected = this.onFileSelected.bind(this)
        this.onButtonClicked = this.onButtonClicked.bind(this)

        this.createFileUrl = this.createFileUrl.bind(this)
        this.createArtUrl = this.createArtUrl.bind(this)
        this.dropFileUrl = this.dropFileUrl.bind(this)
        this.dropArtUrl = this.dropArtUrl.bind(this)
    }

    createFileUrl(file: File) {
        const url = URL.createObjectURL(file)
        this.setState((state: State) => ({
            ...state,
            file: file,
            fileUrl: url
        }))

        return url
    }

    dropFileUrl() {
        if (this.state.fileUrl === '') {
            return
        }

        URL.revokeObjectURL(this.state.fileUrl)

        this.setState((state: State) => ({
            ...state,
            file: this.defaultFile,
            fileUrl: this.defaultFileUrl
        }))
    }

    createArtUrl(parts: BlobPart[], format: string) {
        const blob = new Blob(parts, { type: format })
        const url = URL.createObjectURL(blob)

        this.setState((state) => ({
            ...state,
            art: blob,
            artUrl: url
        }))

        return url
    }

    dropArtUrl() {
        if (this.state.artUrl === this.defaultArtUrl) {
            return
        }
        
        URL.revokeObjectURL(this.state.artUrl)

        this.setState((state) => ({
            ...state,
            art: this.defaultArt,
            artUrl: this.defaultArtUrl
        }))
    }

    onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files as FileList
        if (files.length === 0) {
            return
        }

        this.dropFileUrl()
        this.dropArtUrl()

        const file = files[0]
        const fileName = file.name
        const fileUrl = this.createFileUrl(file)
        mm.parseBlob(file).then((metadata) => {
            const tags = metadata.common
            const title = tags.title ? tags.title : ''
            const album = tags.album ? tags.album : ''
            const albumArtists = tags.albumartist ? tags.albumartist : ''
            const trackArtists = tags.artist ? tags.artist : ''
            
            let artUrl = Assets.ICON_BLANK_ALBUM
            if (tags.picture) {
                artUrl = this.createArtUrl(
                    [tags.picture[0].data.buffer],
                    tags.picture[0].format
                )

                Vibrant.from(artUrl).getPalette(
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

                            this.props.dispatch(updateBgColors(colors))
                        } else {
                            console.log("ERROR: " + err)
                            console.log("PALETTE: " + palette)
                        }
                    }
                )
            } else {
                this.props.dispatch(updateBgColors([]))
            }

            this.props.dispatch(
                loadFile(
                    fileUrl, fileName,
                    title, album, albumArtists, trackArtists,
                    artUrl
                )
            )
        })
    }
    
    onButtonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (event.target !== event.currentTarget)
            event.currentTarget?.click()
    }

    render () {
        return (
            <div>
                <input
                    id="open-file-button"
                    type="file" accept="audio/*"
                    onChange={this.onFileSelected}
                    style={{display: "none"}}
                />
                <button className={this.props.className} type="button" onClick={this.onButtonClicked}>
                    <label htmlFor="open-file-button">
                        <img
                            src={this.props.openimg}
                            alt="Open file"
                            style={{
                                width: '50%',
                                height: '50%'
                            }}
                        ></img>
                    </label>
                </button>
            </div>
        )
    }
}

export default connect()(OpenButton)