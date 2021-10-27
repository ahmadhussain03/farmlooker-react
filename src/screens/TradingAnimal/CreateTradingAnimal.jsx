import React from 'react'
import { useState, useCallback } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {useDropzone} from 'react-dropzone'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const CreateTradingAnimal = ({ user }) => {

    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [dated, setDated] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [images, setImages] = useState([])

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

    const clearErrorMessage = (field = null) => {
        if(errors && errors.message){
            errors.message = ""
        }

        if(errors?.data?.[field]){
            delete errors.data[field]
        }

        setErrors(errors)
    }

    const handleCreateTradingAnimal = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        images.forEach(image => {
            formData.append("images[]", image.pictureAsFile)
        })

        formData.append("type", type)
        formData.append("price", price)
        formData.append("location", location)
        formData.append("dated", dated)
        formData.append("dob", dob)
        formData.append("phone", phone)

        setIsLoading(true)
        try {
            
            const response = await axios.post("trading_animal", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            console.log(response.data)

            setIsLoading(false);
            history.push('/dashboard/my-trading-animal')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    const onDrop = useCallback(acceptedFiles => {
        clearErrorMessage('images')

        acceptedFiles.forEach(file => {
            setImages(images => {
                return [...images, { picturePreview: URL.createObjectURL(file), pictureAsFile: file }]
            })
        })
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
        <Form onSubmit={handleCreateTradingAnimal} formHeading="Add Trading Animal" errors={errors}>
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
                <div className="flex flex-col w-full">
                    <div {...getRootProps()} className={`shadow bg-white w-full py-3 cursor-pointer px-2 rounded-md placeholder-primary-dark outline-none border border-transparent focus:border-primary ${errors?.data?.images && errors?.data?.images?.length > 0 ? 'border-red-500' : ''}`}>
                        <input {...getInputProps()} />
                        {images.length > 0 &&
                            <div className="flex flex-row flex-wrap justify-center items-center">
                                {images.map(image => (
                                    <div className="w-1/3 px-2 py-1">
                                        <img className="rounded-md shadow-md w-full object-cover border border-gray-500 p-2" src={image.picturePreview} />
                                    </div>
                                ))}
                            </div>
                        }
                        <p className="text-gray-600 text-center font-semibold">Drag 'n' drop some Images here, or click to Select Images</p>
                    </div>
                    {errors?.data?.images && errors?.data?.images.length > 0 &&
                        <span className="text-xs text-red-500 pt-1">{errors?.data?.images[0]}</span>
                    }
                </div>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Trading Animal</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateTradingAnimal)