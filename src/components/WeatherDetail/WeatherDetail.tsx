import {Weather} from '../../hooks/useWeather'
import { formatTemp } from '../../utils'
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Clima en {weather.name}</h2>
      <p className={styles.current}>{formatTemp(weather.main.temp)}&deg;C</p>
      <div className={styles.temperatures}>
        <p className={styles.temp}> Min: <span>{formatTemp(weather.main.temp_min)}&deg;C</span></p>
        <p className={styles.temp}>Max: <span>{formatTemp(weather.main.temp_max)}&deg;C</span></p>
      </div>
    </div>
  )
}
