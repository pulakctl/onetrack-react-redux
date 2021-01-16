import { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import WaveSurfer from 'wavesurfer.js'

import { updateDuration, updateProgress } from '../store/actionCreators'

type Props = {
    id: string,
    dispatch: Dispatch<any>,
    file: File,
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
        this.onProgress = this.onProgress.bind(this)
        this.onReady = this.onReady.bind(this)

        this.waveform.on("ready", this.onReady)
        this.waveform.on("finish", this.playIfEnabled)
        this.waveform.on("seek", this.onSeek)
        this.waveform.on("audioprocess", this.onProgress)
    }

    componentDidUpdate() {
        this.props.dispatch(updateDuration(0.0))
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
        let duration = (this.waveform?.getDuration() ? this.waveform.getDuration() : 0.0)
        let newProgress = seekPercentage * duration
        
        this.props.dispatch(updateProgress(newProgress))
        this.toggle(this.props.playing)
    }

    onProgress(progress: number) {
        this.props.dispatch(updateProgress(progress))
    }

    onReady() {
        let duration = (this.waveform?.getDuration() ? this.waveform.getDuration() : 0.0)
        this.props.dispatch(updateDuration(duration))
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
        file: state.currentFile,
        playing: state.playing
    }
}

export default connect(mapStateToProps)(Waveform)