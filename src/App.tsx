import styles from './App.module.css'
import Altert from './components/Alert/Alert'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'
function App() {
    const {fetchWeather,weather,hasWeather,loading,error} = useWeather()
  return (
    <>
     <h1 className={styles.tittle}>Buscador de clima</h1>
     <div className={styles.container}>
      <Form
      fetchWeather={fetchWeather}
       />
       {loading && <Spinner/>}
       {hasWeather && <WeatherDetail weather={weather}/>}
       {error && <Altert>Ciudad No Encontrada</Altert>}
       </div>
       
    </>
  )
}

export default App
