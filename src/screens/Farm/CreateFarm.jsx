import { useState, useCallback, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios, { apiUrl } from '../../utils/axios'

const CreateFarm = ({ setFarm }) => {

    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")

    const [area, setArea] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleCountryChange = e => {
        setCountry(e)
        clearErrorMessage('city_id')
    }

    const handleStateChange = e => {
        setState(e)
        clearErrorMessage('city_id')
    }

    const handleCityChange = e => {
        setCity(e)
        clearErrorMessage('city_id')
    }

    const handleNameChange = e => {
        setName(e.target.value)
        clearErrorMessage('name')
    }
    
    const handleAreaChange = e => {
        setArea(e.target.value)
        clearErrorMessage('area_of_hector')
    }

    const clearErrorMessage = (field = null) => {
        if(errors && errors.message){
            errors.message = ""
        }

        if(errors?.data?.[field]){
            delete errors.data[field]
        }

        setErrors(errors)
    }

    const handleCreateFarm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            
            const response = await axios.post("farm", {name, city_id: city?.value, area_of_hector: area, geometry: JSON.stringify({name})})
            setFarm(response.data.data)
            setIsLoading(false);

            history.push('/dashboard')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <Form onSubmit={handleCreateFarm} formHeading="Add Farm" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.name} value={name} onChange={handleNameChange} type="text" placeholder="Farm Name"  />
            </FormGroup>
            <FormGroup>
                <Select value={country} onChange={handleCountryChange} placeholder="Countries" url={`${apiUrl}/countries`} mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Select value={state} onChange={handleStateChange} placeholder="States" url={`${apiUrl}/states/${country.value}`} mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.city_id} value={city} onChange={handleCityChange} placeholder="Cities" url={`${apiUrl}/cities/${state.value}`} mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.area_of_hector} value={area} onChange={handleAreaChange} type="text" placeholder="Hectare" className="py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none" />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading}  type="submit">Create Farm</Button>  
            </FormGroup>
        </Form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setFarm: (farm) => dispatch({ type: "SET_FARM", payload: farm })
    };
};

export default connect(null, mapDispatchToProps)(CreateFarm)