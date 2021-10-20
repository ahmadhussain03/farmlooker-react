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
    const [image, setImage] = useState({})

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

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
        setAnimal(e)
        clearErrorMessage('animal_id')
    }

    const handleImageChange = e => {
        setImage({           
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
        clearErrorMessage('certificate_image')
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

        const formData = new FormData();

        formData.append("certificate_image", image.pictureAsFile)
        formData.append("animal_id", animal?.value)
        formData.append("date", date)
        formData.append("reason", reason)
        formData.append("name", name)
        
        setIsLoading(true)
        try {
            
            await axios.post("vaccine_record", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setIsLoading(false);

            history.push('/dashboard/vaccine-record')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <Form onSubmit={handleCreateVaccineRecord} formHeading="Add Vaccine Record" errors={errors}>
            <FormGroup>
                <Select error={errors?.data?.animal_id} value={animal} onChange={handleAnimalChange} placeholder="Animal" url='animal' mapOptions={options => options.map(option => ({ value: option.id, label: option.animal_id }))} async={true}></Select>
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
                <Input error={errors?.data?.ceritificate_image} onChange={handleImageChange} type="file" placeholder="Certificate Image"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Vaccine Record</Button>  
            </FormGroup>
        </Form>
    )
}

export default CreateVaccineRecord
