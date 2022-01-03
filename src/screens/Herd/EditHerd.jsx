import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const EditHerd = ({ user }) => {

    const [name, setName] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const {id} = useParams();
    const history = useHistory()

    const getHerd = useCallback(async () => {
        try {
            
            let response = await axios.get(`herd/${id}`)
            const herd = response.data.data
            setName(herd.name)
            setFarm({ value: herd.farm.id, label: herd.farm.name })
        } catch(e){
            console.log(e)
        }
    }, [id])

    useEffect(() => {
        getHerd()

    }, [getHerd])

    
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

    const handleEditAnimal = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            const response = await axios.put(`herd/${id}`, {
                name: name,
                farm_id: farm.value,
            })
            setFarm(response.data.data)
            setIsLoading(false);

            history.push('/dashboard/herd')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <Form onSubmit={handleEditAnimal} formHeading="Edit Animal" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.name} value={name} onChange={handleNameChange} type="text" placeholder="Name"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Herd</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(EditHerd)
