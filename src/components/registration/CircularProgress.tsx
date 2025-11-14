import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface CircularProgressProps {
  percentage: number
  size: string
  strokeWidth?: number
  color?: string
  trailColor?: string
}

export default function CircularProgress({
  percentage,
  size,
  strokeWidth = 10,
  color = '#222bde',
  trailColor = '#dbdbdbff',
}: CircularProgressProps) {
  return (
    <div className={`font-medium mx-auto ${size}`}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor: color,
          trailColor: trailColor,
          textColor: '#000',
          textSize: '28px',
          strokeLinecap: 'round',
        })}
      />
    </div>
  )
}
