import { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import WaveSurfer from 'wavesurfer.js'

type Props = {
    id: string,
    dispatch: Dispatch<any>,
    fileUrl: string,
    playing: boolean
}

class Waveform extends Component<Props> {
    waveform: WaveSurfer | undefined

    componentDidMount() {
        this.waveform = WaveSurfer.create({
            container: "#" + this.props.id,
            responsive: true,
            cursorWidth: 1,
            barWidth: 2,
            loopSelection: false,
            splitChannels: true
        })
        
        this.playIfEnabled = this.playIfEnabled.bind(this)
        this.onSeek = this.onSeek.bind(this)
        this.onReady = this.onReady.bind(this)

        this.waveform.on("ready", this.onReady)
        this.waveform.on("finish", this.playIfEnabled)
        this.waveform.on("seek", this.onSeek)
    }

    componentDidUpdate() {
        this.waveform?.load(this.props.fileUrl)
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

    onReady() {
        this.playIfEnabled()
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
            <div id={this.props.id}>
            </div>
        )
    }
}

const mapStateToProps = (state: PlayerState) => {
    return {
        fileUrl: state.currentFileUrl,
        playing: state.playing
    }
}

export default connect(mapStateToProps)(Waveform)