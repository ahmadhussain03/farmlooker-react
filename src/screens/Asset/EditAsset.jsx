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

const EditAsset = ({ user }) => {

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
        setFarm(e.target.value)
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

    const { id } = useParams()

    const getAsset = useCallback(async () => {
        let response = await axios.get(`asset/${id}`)
        let asset = response.data.data

        setFarm(asset.farm_id)
        setType(asset.type)
        setPrice(asset.price)
        setPurchaseDate(asset.purchase_date)
        setLocation(asset.location)
    }, [id])

    useEffect(() => {
        getAsset()
    }, [getAsset])

    const handleUpdateAsset = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        if(image && image.pictureAsFile){
            formData.append("image", image.pictureAsFile)
        }

        formData.append("type", type)
        formData.append("price", price)
        formData.append("location", location)
        formData.append("purchase_date", purchaseDate)
        formData.append("farm_id", farm)
        formData.append("_method", "PUT")
        
        setIsLoading(true)
        try {
            
            await axios.post(`asset/${id}`, formData, {
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
        <Form onSubmit={handleUpdateAsset} formHeading="Edit Asset" errors={errors}>
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
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" options={farmOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.image} onChange={handleImageChange} type="file" placeholder="Image"  />
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Asset</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(EditAsset)