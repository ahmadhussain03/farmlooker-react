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

const EditManager = () => {

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const handleEmailChange = e => {
        setEmail(e.target.value)
        clearErrorMessage('email')
    }

    const handleFirstNameChange = e => {
        setFirstName(e.target.value)
        clearErrorMessage('first_name')
    }
    
    const handleLastNameChange = e => {
        setLastName(e.target.value)
        clearErrorMessage('last_name')
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value)
        clearErrorMessage('phone_no')
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
        clearErrorMessage('password')
    }

    const handlePasswordConfirmationChange = e => {
        setPasswordConfirmation(e.target.value)
        clearErrorMessage('password')
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

    
    const { id } = useParams()

    const getManager = useCallback(async () => {
        let response = await axios.get(`manager/${id}`)
        let manager = response.data.data
        setFirstName(manager.first_name)
        setLastName(manager.last_name)
        setPhone(manager.phone_no)
        setEmail(manager.email)
        setFarm({value: manager.farm.id, label: manager.farm.name})
    }, [id])

    useEffect(() => {
        getManager()
    }, [getManager])

    const handleUpdateManager = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            
            await axios.put(`manager/${id}`, {
                phone_no: phone,
                first_name: firstName,
                last_name: lastName,
                email,
                farm_id: farm?.value,
            })

            setIsLoading(false);
            history.push('/dashboard/manager')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <Form onSubmit={handleUpdateManager} formHeading="Edit Manager" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.first_name} value={firstName} onChange={handleFirstNameChange} placeholder="First Name" />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.last_name} value={lastName} onChange={handleLastNameChange} placeholder="Last Name" />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.email} value={email} onChange={handleEmailChange} type="text" placeholder="Email"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.phone_no} value={phone} onChange={handlePhoneChange} type="text" placeholder="Phone No"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Manager</Button>  
            </FormGroup>
        </Form>
    )
}

export default EditManager
