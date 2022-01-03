import React from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const CreateHerd = ({ user }) => {

    const [name, setName] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    
    const handleNameChange = e => {
        setName(e.target.value)
        clearErrorMessage('name')
    }

    const handleFarmIdChange = e => {
        setFarm(e)
        clearErrorMessage('farm_id')
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

    const handleCreateHerd = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            const response = await axios.post("herd", {
                name: name,
                farm_id: farm?.value,
            })

            setIsLoading(false);
            history.push('/dashboard/herd')
        } catch(e) {
            setIsLoading(false);
            console.log(e)
            setErrors(e.response.data)
        }
    }


    return (
        <Form onSubmit={handleCreateHerd} formHeading="Add Herd" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.name} value={name} onChange={handleNameChange} type="text" placeholder="Name"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Herd</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateHerd)