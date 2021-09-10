import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const CreateFarm = ({ setFarm }) => {

    const [location, setLocation] = useState("")
    const [area, setArea] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    
    const handleLocationChange = e => {
        setLocation(e.target.value)
        clearErrorMessage('location')
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
            
            const response = await axios.post("farm", {location: location, area_of_hector: area})
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
                <Input error={errors?.data?.location} value={location} onChange={handleLocationChange} type="text" placeholder="Farm Location"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.area_of_hector} value={area} onChange={handleAreaChange} type="text" placeholder="Area In Hector" className="py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none" />
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