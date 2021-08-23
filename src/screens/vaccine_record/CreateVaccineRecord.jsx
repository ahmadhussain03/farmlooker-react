import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import {useHistory} from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

function CreateVaccineRecord() {

    const [name, setName] = useState("")
    const [reason, setReason] = useState("")
    const [date, setDate] = useState("")
    const [animal, setAnimal] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const [animals, setAnimals] = useState([])

    const handleNameChange = e => {
        setName(e.target.value)
        clearErrorMessage('name')
    }

    const handleReasonChange = e => {
        setReason(e.target.value)
        clearErrorMessage('reason')
    }

    const handleDateChange = e => {
        setDate(e.target.value)
        clearErrorMessage('date')
    }

    const handleAnimalChange = e => {
        setAnimal(e.target.value)
        clearErrorMessage('animal_id')
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


    const handleCreateVaccineRecord = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            
            await axios.post("vaccine_record", {
                animal_id: animal,
                date,
                reason,
                name
            })

            setIsLoading(false);

            history.push('/dashboard/vaccine-record')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
            console.log(e.response.data)
        }
    }

    const getAnimals = useCallback(async () => {
        let response = await axios.get('animal')
        const animals = response.data.data.data.map(animal => ({value: animal.id, text: animal.animal_id}))
        setAnimals(animals)
    }, [])

    useEffect(() => {
        getAnimals()
    }, [getAnimals])

    return (
        <Form onSubmit={handleCreateVaccineRecord} formHeading="Add Animal" errors={errors}>
            <FormGroup>
                <Select error={errors?.data?.animal_id} value={animal} onChange={handleAnimalChange} placeholder="Animal" options={animals}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.name} value={name} onChange={handleNameChange} type="text" placeholder="Name"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.reason} value={reason} onChange={handleReasonChange} type="text" placeholder="Reason"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.date} value={date} onChange={handleDateChange} type="date" placeholder="Dated"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Vaccine Record</Button>  
            </FormGroup>
        </Form>
    )
}

export default CreateVaccineRecord
