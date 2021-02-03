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
    fileName: string,
    colors: number[][]
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

    const vibrant = props.colors[0]
    const muted = props.colors[1]
    document.getElementById("details-table")?.style.setProperty(
        '--color-vibrant', `${vibrant[0]}, ${vibrant[1]}, ${vibrant[2]}`
    )
    document.getElementById("details-table")?.style.setProperty(
        '--color-muted', `${muted[0]}, ${muted[1]}, ${muted[2]}`
    )
    
    return (
        <div id={props.id}>
            <table id="details-table">
                <tbody>
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
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state: PlayerState) => {
    return {
        metadata: state.metadata,
        fileName: state.fileName,
        colors: state.bgColors
    }
}

export default connect(mapStateToProps)(TrackDetailsDisplay)