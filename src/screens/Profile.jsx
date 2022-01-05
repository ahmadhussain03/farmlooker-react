import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';

import Button from '../components/auth/form/Button'
import Form from '../components/main/form/Form'
import Input from '../components/main/form/Input'
import { FormGroup } from '../components/main/form/Form'
import {useDropzone} from 'react-dropzone'

import axios from '../utils/axios'

const Profile = ({ user, setLogin }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState("")
    const [experience, setExperience] = useState("")
    const [image, setImage] = useState({})
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const handleFirstNameChange = e => {
        setFirstName(e.target.value)
        clearErrorMessage('first_name')
    }

    const handleLastNameChange = e => {
        setLastName(e.target.value)
        clearErrorMessage('last_name')
    }

    const handlePhoneNoChange = e => {
        setPhoneNo(e.target.value)
        clearErrorMessage('phone_no')
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
        clearErrorMessage('email')
    }

    const handleExperienceChange = e => {
        setExperience(e.target.value)
        clearErrorMessage('experience')
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

    useEffect(() => {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setExperience(user.experience)
        setEmail(user.email)
        setPhoneNo(user.phone_no)
        setImage({ picturePreview: user.image })
    }, [user])

    const handleProfileUpdate = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {

            const formData = new FormData();

            if(image && image?.pictureAsFile)
                formData.append("image", image.pictureAsFile)
    
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("email", email)
            formData.append("experience", experience)
            formData.append("phone_no", phoneNo)
            
            const response = await axios.post("profile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const updatedUser = response.data.data
            console.log(updatedUser)
            setLogin({...user, first_name: updatedUser.first_name, last_name: updatedUser.last_name, image: updatedUser.image, experience: updatedUser.experience, email: updatedUser.email, fullName: updatedUser.fullName})

            setIsLoading(false);
            toast.success('Profile Updated Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    const onDrop = useCallback(acceptedFiles => {
        clearErrorMessage('image')

        acceptedFiles.forEach(file => {
            setImage({ picturePreview: URL.createObjectURL(file), pictureAsFile: file })
        })

      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Form onSubmit={handleProfileUpdate} formHeading="Update Profile" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.first_name} value={firstName} onChange={handleFirstNameChange} type="text" placeholder="First Name"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.last_name} value={lastName} onChange={handleLastNameChange} type="text" placeholder="Last Name"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.email} value={email} onChange={handleEmailChange} placeholder="Email" type="email" />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.phone_no} value={phoneNo} onChange={handlePhoneNoChange} type="text" placeholder="Phone No"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.experience} value={experience} onChange={handleExperienceChange} type="number" placeholder="Experience"  />
            </FormGroup>
            <FormGroup>
                <div className="flex flex-col w-full">
                    <div {...getRootProps()} className={`shadow bg-white w-full py-3 cursor-pointer px-2 rounded-md placeholder-primary-dark outline-none border border-transparent focus:border-primary ${errors?.data?.images && errors?.data?.images?.length > 0 ? 'border-red-500' : ''}`}>
                        <input {...getInputProps()} />
                        {image &&
                            <div className="flex flex-row flex-wrap justify-center items-center">
                                <div className="w-1/3 px-2 py-1">
                                    <img className="rounded-md shadow-md w-full object-cover border border-gray-500 p-2" src={image.picturePreview} alt="preview" />
                                </div>
                            </div>
                        }
                        <p className="text-gray-600 text-center font-semibold">Drag 'n' drop some Image here, or click to Select Image</p>
                    </div>
                    {errors?.data?.images && errors?.data?.images.length > 0 &&
                        <span className="text-xs text-red-500 pt-1">{errors?.data?.images[0]}</span>
                    }
                </div>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Profile</Button>  
            </FormGroup>
        </Form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setLogin: (user) => dispatch({ type: "SET_LOGIN", payload: user })
    };
};

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)