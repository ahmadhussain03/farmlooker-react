import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const EditTradingAnimal = ({ user }) => {

    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [dated, setDated] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState({})

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    
    const handleLocationChange = e => {
        setLocation(e.target.value)
        clearErrorMessage('location')
    }

    const handleTypeChange = e => {
        setType(e.target.value)
        clearErrorMessage('type')
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value)
        clearErrorMessage('phone')
    }

    const handlePriceChange = e => {
        setPrice(e.target.value)
        clearErrorMessage('price')
    }

    const handleDatedChange = e => {
        setDated(e.target.value)
        clearErrorMessage('dated')
    }

    const handleDobChange = e => {
        setDob(e.target.value)
        clearErrorMessage('dob')
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

    const getTradingAnimal = useCallback(async () => {
        let response = await axios.get(`trading_animal/${id}`)
        let tradingAnimal = response.data.data

        setType(tradingAnimal.type)
        setPrice(tradingAnimal.price)
        setLocation(tradingAnimal.location)
        setDated(tradingAnimal.dated)
        setDob(tradingAnimal.dob)
        setPhone(tradingAnimal.phone)
    }, [id])

    useEffect(() => {
        getTradingAnimal()
    }, [getTradingAnimal])

    const handleEditTradingAnimal = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        if(image && image.pictureAsFile){
            formData.append("image", image.pictureAsFile)
        }

        formData.append("type", type)
        formData.append("price", price)
        formData.append("location", location)
        formData.append("dated", dated)
        formData.append("dob", dob)
        formData.append("phone", phone)
        formData.append("_method", "PUT")

        setIsLoading(true)
        try {
            
            await axios.post(`trading_animal/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            setIsLoading(false);
            history.push('/dashboard/trading-animal')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }


    return (
        <Form onSubmit={handleEditTradingAnimal} formHeading="Edit Trading Animal" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.type} value={type} onChange={handleTypeChange} type="text" placeholder="Type"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.price} value={price} onChange={handlePriceChange} type="number" placeholder="Price"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.location} value={location} onChange={handleLocationChange} type="text" placeholder="Location"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.dated} value={dated} onChange={handleDatedChange} type="date" placeholder="Dated"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.dob} value={dob} onChange={handleDobChange} type="date" placeholder="DOB"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.phone} value={phone} onChange={handlePhoneChange} type="text" placeholder="Phone"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.image} onChange={handleImageChange} type="file" placeholder="Image"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Trading Animal</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(EditTradingAnimal)