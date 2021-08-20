import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/Button'
import Error from '../../components/Error'
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
            console.log(response)
            setFarm(response.data.data)
            setIsLoading(false);

            history.push('/dashboard')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <form onSubmit={e => handleCreateFarm(e)} className="flex items-center flex-col px-5 mx-auto">
            <div className="mb-8 w-1/2 text-center">
                <h1 className="pb-3 text-primary text-2xl font-semibold border-b-2 border-primary">Add Farm</h1>
            </div>
            {errors && errors.message && 
                (
                    <div className="h-16 flex items-center justify-center w-1/2">
                        <Error message={errors.message}></Error>
                    </div>
                )
            }
            <div className=" h-16 flex items-center justify-center w-1/2">
                <input value={location} onChange={(e) => handleLocationChange(e)} type="text" placeholder="Farm Location" className="py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none" />
            </div>
            <div className=" h-16 flex items-center justify-center w-1/2">
                <input value={area} onChange={(e) => handleAreaChange(e)} type="text" placeholder="Area of Hector" className="py-3 px-2 rounded-md w-full placeholder-primary-dark outline-none" />
            </div>
            <div className="h-16 flex items-center justify-center w-1/2">
                <Button disabled={isLoading}  type="submit">Create Farm</Button>  
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setFarm: (farm) => dispatch({ type: "SET_FARM", payload: farm })
    };
};

export default connect(null, mapDispatchToProps)(CreateFarm)