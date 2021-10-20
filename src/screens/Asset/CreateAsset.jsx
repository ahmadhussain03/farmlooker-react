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

const CreateAsset = ({ user }) => {

    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [purchaseDate, setPurchaseDate] = useState("")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState({})
    const [farm, setFarm] = useState("")

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

    const handlePriceChange = e => {
        setPrice(e.target.value)
        clearErrorMessage('price')
    }

    const handlePurchaseDateChange = e => {
        setPurchaseDate(e.target.value)
        clearErrorMessage('purchase_date')
    }

    const handleFarmIdChange = e => {
        setFarm(e)
        clearErrorMessage('farm_id')
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

    const handleCreateAsset = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        if(image){
            formData.append("image", image.pictureAsFile)
        }

        formData.append("type", type)
        formData.append("price", price)
        formData.append("location", location)
        formData.append("purchase_date", purchaseDate)
        formData.append("farm_id", farm?.value)
        
        setIsLoading(true)
        try {
            
            await axios.post("asset", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setIsLoading(false);
            history.push('/dashboard/asset')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    const farmOptions = user.farms && user.farms.length ? user.farms.map(farm => ({value: farm.id, text: farm.location})) : []

    return (
        <Form onSubmit={handleCreateAsset} formHeading="Add Asset" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.type} value={type} onChange={handleTypeChange} type="text" placeholder="Type"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.price} value={price} onChange={handlePriceChange} type="number" placeholder="Price"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.purchase_date} value={purchaseDate} onChange={handlePurchaseDateChange} type="date" placeholder="Purchase Date"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.location} value={location} onChange={handleLocationChange} type="text" placeholder="Location"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.image} onChange={handleImageChange} type="file" placeholder="Image"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Asset</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateAsset)