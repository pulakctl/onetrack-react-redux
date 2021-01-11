import { Component } from 'react'
import WaveSurfer from 'wavesurfer.js'

type Props = {
    file: File
}

class Waveform extends Component<Props> {
    waveform: WaveSurfer | undefined

    componentDidMount() {
        this.waveform = WaveSurfer.create({
            container: '#waveform',
            responsive: true,
            cursorWidth: 1,
            barWidth: 3
        })
        
    }

    componentDidUpdate() {
        this.waveform?.loadBlob(this.props.file)
    }

    render() {
        return (
            <div id="waveform">
            </div>
        )
    }
}

export default Waveform