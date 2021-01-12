import { Component } from 'react'
import WaveSurfer from 'wavesurfer.js'

type Props = {
    file: File,
    playing: boolean
}

class Waveform extends Component<Props> {
    waveform: WaveSurfer | undefined

    componentDidMount() {
        this.waveform = WaveSurfer.create({
            container: '#waveform',
            responsive: true,
            cursorWidth: 1,
            barWidth: 2,
            loopSelection: false,
            splitChannels: true
        })
        
        this.playIfEnabled = this.playIfEnabled.bind(this)
        this.onSeek = this.onSeek.bind(this)

        this.waveform.on("ready", this.playIfEnabled)
        this.waveform.on("finish", this.playIfEnabled)
        this.waveform.on("seek", this.onSeek)
    }

    componentDidUpdate() {
        this.waveform?.loadBlob(this.props.file)
    }

    shouldComponentUpdate(nextProps: Props, nextState: PlayerState) {
        if (nextProps.playing !== this.props.playing) {
            this.toggle(nextProps.playing)
            return false
        }
        return true
    }

    onSeek(seekPercentage: number) {
        this.toggle(this.props.playing)
    }

    toggle(playing = false) {
        if (playing) {
            this.waveform?.play()
        } else {
            this.waveform?.pause()
        }
    }

    playIfEnabled() {
        this.toggle(this.props.playing)
    }

    render() {
        return (
            <div id="waveform">
            </div>
        )
    }
}

export default Waveform