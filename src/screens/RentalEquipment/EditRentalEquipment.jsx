import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const EditRentalEquipment = ({ user }) => {

    const [name, setName] = useState("")
    const [rent, setRent] = useState("")
    const [model, setModel] = useState("")
    const [location, setLocation] = useState("")
    const [dated, setDated] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState({})

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    
    const handleLocationChange = e => {
        setLocation(e.target.value)
        clearErrorMessage('location')
    }

    const handleNameChange = e => {
        setName(e.target.value)
        clearErrorMessage('name')
    }

    const handleModelChange = e => {
        setModel(e.target.value)
        clearErrorMessage('model')
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value)
        clearErrorMessage('phone')
    }

    const handleRentChange = e => {
        setRent(e.target.value)
        clearErrorMessage('rent')
    }

    const handleDatedChange = e => {
        setDated(e.target.value)
        clearErrorMessage('dated')
    }

    const handleImageChange = e => {
        setImage({           
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
        clearErrorMessage('image')
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

    const getRentalEquipment = useCallback(async () => {
        let response = await axios.get(`rental_equipment/${id}`)
        let rentalEquipment = response.data.data

        setName(rentalEquipment.name)
        setModel(rentalEquipment.model)
        setDated(rentalEquipment.dated)
        setRent(rentalEquipment.rent)
        setLocation(rentalEquipment.location)
        setPhone(rentalEquipment.phone)
    }, [id])

    useEffect(() => {
        getRentalEquipment()
    }, [getRentalEquipment])

    const handleEditRentalEquipment = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        if(image && image.pictureAsFile){
            formData.append("image", image.pictureAsFile)
        }

        formData.append("name", name)
        formData.append("model", model)
        formData.append("rent", rent)
        formData.append("location", location)
        formData.append("dated", dated)
        formData.append("phone", phone)
        formData.append("_method", "PUT")

        setIsLoading(true)
        try {
            
            await axios.post(`rental_equipment/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            setIsLoading(false);
            history.push('/dashboard/rental-equipment')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }


    return (
        <Form onSubmit={handleEditRentalEquipment} formHeading="Edit Rental Equipment" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.name} value={name} onChange={handleNameChange} type="text" placeholder="Name"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.model} value={model} onChange={handleModelChange} type="text" placeholder="Model"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.rent} value={rent} onChange={handleRentChange} type="number" placeholder="Rent"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.location} value={location} onChange={handleLocationChange} type="text" placeholder="Location"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.dated} value={dated} onChange={handleDatedChange} type="date" placeholder="Dated"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.phone} value={phone} onChange={handlePhoneChange} type="text" placeholder="Phone"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.image} onChange={handleImageChange} type="file" placeholder="Image"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Rental Equipment</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(EditRentalEquipment)