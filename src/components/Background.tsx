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

    // https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
    rgbToHsl(col: number[]) {
        let normalized = [
            col[0] / 255,
            col[1] / 255,
            col[2] / 255
        ]
        let trgb = [normalized[0], normalized[1], normalized[2]]
        trgb.sort((a, b) => a - b)

        let max = trgb[2]
        let min = trgb[0]
        let L = (max + min) / 2
        let S = 0
        let diff = max - min
        if (max === min) {
            if (L <= 0.5) {
                S = diff / (max + min)
            } else {
                S = diff / (2.0 - diff)
            }
        }

        let H = 0
        if (max === normalized[0]) { // Red
            H = (normalized[1] - normalized[2]) / diff
        } else if (max === normalized[1]) { // Green
            H = 2.0 + (normalized[2] - normalized[0]) / diff
        } else {
            H = 4.0 + (normalized[0] - normalized[2]) / diff
        }

        //L = Math.round(L * 1000) / 1000
        //S = Math.round(L * 1000) / 1000
        H = Math.round(H * 60)
        if (H < 0) {
            H = H + 360
        }

        return [H, S, L]
    }

    testChannel(t1: number, t2: number, tC: number) {
        if (6 * tC < 1) {
            return t2 + (t1 - t2) * 6 * tC
        } else if (2 * tC < 1) {
            return t1
        } else if (3 * tC < 2) {
            return t2 + (t1 - t2) * (0.666 - tC) * 6
        } else {
            return t2
        }
    }

    // https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
    hslToRgb(H: number, S: number, L: number) {
        let R = 0, G = 0, B = 0, t1 = 0, t2 = 0
        if (S === 0) {
            R = Math.floor(L * 255)
            return [R, R, R]
        }

        if (L < 0.5) {
            t1 = L * (1.0 + S)
        } else {
            t1 = L + S - (L * S)
        }

        t2 = (2 * L) - t1

        let hue = H / 360
        let tR = hue + 0.333
        let tG = hue
        let tB = hue - 0.333
        tR = (tR > 1)? tR - 1 : tR
        tB = (tB > 1)? tB - 1 : tB

        R = this.testChannel(t1, t2, tR)
        G = this.testChannel(t1, t2, tG)
        B = this.testChannel(t1, t2, tB)
        
        R = Math.floor(R * 255)
        G = Math.floor(G * 255)
        B = Math.floor(B * 255)

        return [R, G, B]
    }

    shiftColor(color: number[]) {
        let hsl = this.rgbToHsl(color)
        let delta = Math.floor(Math.random() * this.deltaLightness) - Math.floor(this.deltaLightness / 2)
  
        return this.hslToRgb(hsl[0], hsl[1], hsl[2] + (delta / 100))
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
        return (
            <canvas id={this.props.id} style={{display: 'none'}}>
            </canvas>
        )
    }
}