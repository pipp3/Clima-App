import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { ChangeEvent, useState } from "react";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search:SearchType) => Promise<void>
}

export default function Form({fetchWeather}: FormProps) {
   
    const [search, setSearch] = useState<SearchType>({
        city:'',
        country:'' 
    })
    const [alert, setAlert] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            
        }
        fetchWeather(search)
    }
  return (
    <div>
      <form
      onSubmit={(e) =>handleSubmit(e)
       }
      className={styles.form}>
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
          <label htmlFor="city">Ciudad:</label>
          <input id="city" name="city" placeholder="Ciudad" value={search.city} type="text" onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label htmlFor="country">Pais:</label>
          <select value={search.country} name="country" onChange={handleChange}>
            <option value="">-- Seleccione un Pais --</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <input className={styles.submit} type="submit" value="Consultar Clima" />
      </form>
    </div>
  );
}
