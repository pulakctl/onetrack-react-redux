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
    let title = 'N/A', trackArtists = 'N/A', album = 'N/A', albumArtists = 'N/A'
    if (props.metadata.title !== '') {
        title = props.metadata.title
    }
    if (props.metadata.trackArtists !== '') {
        trackArtists = props.metadata.trackArtists
    }
    if (props.metadata.album !== '') {
        album = props.metadata.album
    }
    if (props.metadata.albumArtists !== '') {
        albumArtists = props.metadata.albumArtists
    }
    
    return (
        <div id={props.id}>
            <div className="track-detail">
                <div className="track-detail-label">FILENAME</div>
                <p className="track-detail-content">{props.fileName}</p>
            </div>
            <div className="track-detail">
                <div className="track-detail-label">TITLE</div>
                <p className="track-detail-content">{title}</p>
            </div>
            <div className="track-detail">
                <div className="track-detail-label">BY</div>
                <p className="track-detail-content">{trackArtists}</p>
            </div>
            <div className="track-detail">
                <div className="track-detail-label">ALBUM</div>
                <p className="track-detail-content">{album}</p>
            </div>
            <div className="track-detail">
                <div className="track-detail-label">BY</div>
                <p className="track-detail-content">{albumArtists}</p>
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