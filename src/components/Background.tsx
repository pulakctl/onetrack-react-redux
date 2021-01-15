import Vibrant from 'node-vibrant'
import { Component } from 'react'

type Props = {
    id: string
    colors: number[][]
}

export class Background extends Component<Props> {
    width = 0
    height = 0
    deltaLightness = 15
    nRows = 20
    nColumns = 20

    updateDimensions = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight

        const canvas = document.getElementById(this.props.id) as HTMLCanvasElement
        if (canvas !== null && canvas.getContext('2d') !== null) {
            let context = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = this.width
            canvas.height = this.height

            this.renderBackground(context)

            document.body.style.background = "url(" + canvas.toDataURL() + ")";
        }
    }

    shiftColor(color: number[]) {
        let hsl = Vibrant.Util.rgbToHsl(color[0], color[1], color[2])
        let delta = Math.floor(Math.random() * this.deltaLightness) - Math.floor(this.deltaLightness / 2)
  
        return Vibrant.Util.hslToRgb(hsl[0], hsl[1], hsl[2] + (delta / 100))
    }

    renderBackground(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.width, this.height)
        const w = this.width / this.nColumns
        const h = this.height / this.nRows
        let i = 0, j = 0, r = 0
        let p1 = [0, 0], p2 = [0, 0], p3 = [0, 0], p4 = [0, 0], cl = [0, 0, 0]
        for (i = 0; i < this.nRows - 0; i++ ) {
            for (j = 0; j < this.nRows - 0; j++) {
                p1[0] = i * w
                p1[1] = j * h

                p2[0] = (i + 1) * w
                p2[1] = j * h

                p3[0] = i * w
                p3[1] = (j + 1) * h

                r = Math.floor(Math.random() * 2)
                cl = this.shiftColor(this.props.colors[r])
                ctx.fillStyle = `rgb(${cl[0]}, ${cl[1]}, ${cl[2]})`
                ctx.strokeStyle = `rgb(${cl[0]}, ${cl[1]}, ${cl[2]})`
                ctx.beginPath()
                ctx.moveTo(p1[0], p1[1])
                ctx.lineTo(p2[0], p2[1])
                ctx.lineTo(p3[0], p3[1])
                ctx.fill()
                
                p4[0] = (i + 1) * w
                p4[1] = (j + 1) * h
                r = Math.floor(Math.random() * 2)
                cl = this.shiftColor(this.props.colors[r])
                ctx.fillStyle = `rgb(${cl[0]}, ${cl[1]}, ${cl[2]})`
                ctx.strokeStyle = `rgb(${cl[0]}, ${cl[1]}, ${cl[2]})`
                ctx.beginPath()
                ctx.moveTo(p2[0], p2[1])
                ctx.lineTo(p3[0], p3[1])
                ctx.lineTo(p4[0], p4[1])
                ctx.fill()
            }
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.updateDimensions)
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.updateDimensions)
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        this.updateDimensions()
        return (
            <canvas id={this.props.id} style={{display: 'none'}}>
            </canvas>
        )
    }
}