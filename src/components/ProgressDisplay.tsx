import { FC } from 'react'

type Props = {
    id: string,
    progress: number,
    duration: number
}

export const ProgressDisplay: FC<Props> = (props: Props) => {
    let totSeconds = Math.floor(props.duration)
    let totMinutes = Math.floor(totSeconds / 60)
    let totHours = Math.floor(totMinutes / 60)

    let countDigits = (n: number) => { return Math.log(n) * Math.LOG10E + 1 | 0 }

    let toDisplayFormat = (timeStamp: number)  => {
        let hours = 0
        let minutes = 0
        let seconds = Math.floor(timeStamp)
        let milliseconds = Math.round((timeStamp - seconds) * 1000)
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60)
            seconds = seconds % 60
        }
        if (minutes >= 60) {
            hours = Math.floor(minutes / 60)
            minutes = minutes % 60
        }

        let displayHMS = ""
        if (totHours > 0) {
            displayHMS += hours.toString().padStart(countDigits(totHours), '0') + ':'
        }
        if (totMinutes > 0) {
            displayHMS += minutes.toString().padStart(countDigits(totMinutes % 60), '0') + ':'
        }
        displayHMS += seconds.toString().padStart(2, '0')

        let displayMs = milliseconds.toString().padStart(3, '0')
        displayMs = displayMs.slice(0, 2) + '.' + displayMs.slice(2)

        return displayHMS + ":" + displayMs
    }

    let display = (<p id={props.id}>{toDisplayFormat(props.progress)}/{toDisplayFormat(props.duration)}</p>)

    if (props.duration === 0.0) {
        display = (<p id={props.id}>--/--</p>)
    }

    return (
        <div>
            {display}
        </div>
    )
}