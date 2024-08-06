import axios from "axios";
import { SearchType } from "../types";
import { z } from "zod";
import { useMemo, useState } from "react";
//import { object,number,Output,parse } from "valibot";
/*const WatherSchema=object({
    name:string(),
    main:object({
        temp:number(),
        temp_max:number(),
        temp_min:number()
    })
})
type Weather=Output<typeof WatherSchema>*/

//Type Guard
/*function isWeatherResponse(weather: unknown):weather is WeatherType {
    return (
        Boolean(weather) &&
        typeof weather === "object" &&
        typeof (weather as WeatherType).name === "string" &&
        typeof (weather as WeatherType).main.temp === "number" &&
        typeof (weather as WeatherType).main.temp_max === "number" &&
        typeof (weather as WeatherType).main.temp_min === "number"
    )
}*/
const initialWeather = {
    name: "",
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
};


//ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

export default function useWeather() {
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(false)
  const [weather, setWeather] = useState<Weather>(initialWeather);
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialWeather);
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUrl);
    
      //Comprobar
      if(!data[0]){
        setError(true)
        return
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: weather } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weather);
      if (result.success) {
        setWeather(result.data);
      } else {
        console.log(result.error);
      }

      //Castear el tipo de dato
      //const weather = await axios.get<WeatherType>(weatherUrl);
      //console.log(weather.data.main.temp)

      //Type Guard
      //const {data:weather} = await axios.get(weatherUrl);
      //const result=isWeatherResponse(weather)
      //if(result){
      //  console.log(weather.main.temp)
      //}
      //else{
      //    console.log('No es un objeto valido')
      //}

      //Valibot
      /*const {data:weather} = await axios.get(weatherUrl);
        const result=parse(WatherSchema,weather)
        if(result){
            console.log(result.name)
        }else{
            console.log('No es un objeto valido')
        }*/
    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false)
    }
  };

  const hasWeather = useMemo(() => weather.name !== "", [weather]);

  return {
    weather,
    loading,
    error,
    fetchWeather,
    hasWeather,
  };
}
