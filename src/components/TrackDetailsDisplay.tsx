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
    let title = 'N/A', trackArtists = 'N/A', album = 'N/A', albumArtists = 'N/A',
        fileName = 'N/A'

    if (props.fileName !== '') {
        fileName = props.fileName
    }
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
            <table>
                <tr>
                    <td>FILENAME</td>
                    <td>{fileName}</td>
                </tr>
                <tr>
                    <td>TITLE</td>
                    <td>{title}</td>
                </tr>
                <tr>
                    <td>TRACK BY</td>
                    <td>{trackArtists}</td>
                </tr>
                <tr>
                    <td>ALBUM</td>
                    <td>{album}</td>
                </tr>
                <tr>
                    <td>ALBUM BY</td>
                    <td>{albumArtists}</td>
                </tr>
            </table>
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