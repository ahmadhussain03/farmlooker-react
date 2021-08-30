import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const CreateDiseaseAlert = ({ user }) => {

    const [animals, setAnimals] = useState([])
    const [animal, setAnimal] = useState("")

    const [description, setDescription] = useState("")
    const [symptoms, setSymptoms] = useState("")
 

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    
    const handleDescriptionChange = e => {
        setDescription(e.target.value)
        clearErrorMessage('description')
    }

    const handleSymptomsChange = e => {
        setSymptoms(e.target.value)
        clearErrorMessage('symptoms')
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

    const handleCreateAnimal = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            
            const response = await axios.post("disease_alert", {
                animal_id: animal,
                description: description,
                symptoms: [symptoms]
            })
            console.log(response)
            setIsLoading(false);

            history.push('/dashboard/disease-alert')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
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
        <Form onSubmit={handleCreateAnimal} formHeading="Add Disease Alert" errors={errors}>
            <FormGroup>
                <Select error={errors?.data?.animal_id} value={animal} onChange={handleAnimalChange} placeholder="Animal" options={animals}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.description} value={description} onChange={handleDescriptionChange} type="text" placeholder="Description"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.symptoms} value={symptoms} onChange={handleSymptomsChange} type="text" placeholder="Symptoms"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Alert</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateDiseaseAlert)