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

const sexOptions = [
    {value: 'male', text: 'Male'},
    {value: 'female', text: 'Female'},
];

const addAsOptions = [
    {value: 'purchased', text: 'Purchased'},
    {value: 'calved', text: 'Calved'},
];

const diseaseOptions = [
    {value: 'sick', text: 'Sick'},
    {value: 'healthy', text: 'Healthy'},
];

const EditAnimal = ({ user }) => {

    const [animalId, setAnimalId] = useState("")
    const [type, setType] = useState("")
    const [breed, setBreed] = useState("")
    const [addAs, setAddAs] = useState("")
    const [sex, setSex] = useState("")
    const [dob, setDob] = useState("")
    const [purchaseDate, setPurchaseDate] = useState("")
    const [disease, setDisease] = useState("")
    const [price, setPrice] = useState("")
    const [previousOwner, setPreviousOwner] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const {id} = useParams();
    const history = useHistory()

    const getAnimal = useCallback(async () => {
        try {
            
            let response = await axios.get(`animal/${id}`)
            const animal = response.data.data
            setAnimalId(animal.animal_id)
            setType(animal.type)
            setBreed(animal.breed)
            setAddAs(animal.add_as)
            setSex(animal.sex)
            setDob(animal.dob)
            setDisease(animal.disease)
            setFarm(animal.farm_id)
            setPrice(animal.price ?? '')
            setPreviousOwner(animal.previous_owner ?? '')
            setPurchaseDate(animal.purchase_date ?? '')
        } catch(e){
            console.log(e)
        }
    }, [id])

    useEffect(() => {
        getAnimal()

    }, [getAnimal])

    
    const handleAnimalIdChange = e => {
        setAnimalId(e.target.value)
        clearErrorMessage('animal_id')
    }

    const handleTypeChange = e => {
        setType(e.target.value)
        clearErrorMessage('type')
    }

    const handleDobChange = e => {
        setDob(e.target.value)
        clearErrorMessage('dob')
    }

    const handleSexChange = e => {
        setSex(e.target.value)
        clearErrorMessage('sex')
    }

    const handleBreedChange = e => {
        setBreed(e.target.value)
        clearErrorMessage('breed')
    }

    const handleAddAsChange = e => {
        setAddAs(e.target.value)
        clearErrorMessage('add_as')
    }

    const handlePurchaseDateChange = e => {
        setPurchaseDate(e.target.value)
        clearErrorMessage('purchase_date')
    }

    const handleDiseaseChange = e => {
        setDisease(e.target.value)
        clearErrorMessage('disease')
    }

    const handlePriceChange = e => {
        setPrice(e.target.value)
        clearErrorMessage('price')
    }

    const handlePreviousOwnerChange = e => {
        setPreviousOwner(e.target.value)
        clearErrorMessage('previous_owner')
    }

    const handleFarmIdChange = e => {
        setFarm(e.target.value)
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
            
            const response = await axios.put(`animal/${id}`, {
                animal_id: animalId,
                type,
                breed,
                add_as: addAs,
                sex,
                dob,
                disease,
                purchase_date: purchaseDate,
                price,
                previous_owner: previousOwner,
                farm_id: farm
            })
            setFarm(response.data.data)
            setIsLoading(false);

            history.push('/dashboard/animal')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    const farmOptions = user.farms && user.farms.length ? user.farms.map(farm => ({value: farm.id, text: farm.location})) : []

    return (
        <Form onSubmit={handleEditAnimal} formHeading="Edit Animal" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.animal_id} value={animalId} onChange={handleAnimalIdChange} type="text" placeholder="Animal ID"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.type} value={type} onChange={handleTypeChange} type="text" placeholder="Type"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.breed} value={breed} onChange={handleBreedChange} type="text" placeholder="Breed"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.add_as} value={addAs} onChange={handleAddAsChange} placeholder="Add As" options={addAsOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.sex} value={sex} onChange={handleSexChange} placeholder="Sex" options={sexOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.dob} value={dob} onChange={handleDobChange} type="date" placeholder="DOB"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.disease} value={disease} onChange={handleDiseaseChange} placeholder="Disease" options={diseaseOptions}></Select>
            </FormGroup>
            {addAs && addAs === 'purchased' && (
                <>
                    <FormGroup>
                        <Input error={errors?.data?.purchase_date} value={purchaseDate} onChange={handlePurchaseDateChange} type="date" placeholder="Purchase Date"  />
                    </FormGroup>
                    <FormGroup>
                        <Input error={errors?.data?.price} value={price} onChange={handlePriceChange} type="text" placeholder="Price"  />
                    </FormGroup>
                    <FormGroup>
                        <Input error={errors?.data?.previous_owner} value={previousOwner} onChange={handlePreviousOwnerChange} type="text" placeholder="Previous Owner"  />
                    </FormGroup>
                </>
            )}
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" options={farmOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Animal</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(EditAnimal)
