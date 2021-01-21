import { connect } from 'react-redux'
import './TrackDetailsDisplay.css'

type Props = {
    id: string,
    metadata: {
        title: string,
        album: string,
        trackArtists: string,
        albumArtists: string,
    },
    fileName: string
}

const TrackDetailsDisplay = (props: Props) => {
    return (
        <div id={props.id}>
            <div className="track-detail">
                    <p className="track-detail-content">{props.fileName}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state: PlayerState) => {
    return {
        metadata: state.metadata,
        fileName: state.fileName
    }
}

export default connect(mapStateToProps)(TrackDetailsDisplay)