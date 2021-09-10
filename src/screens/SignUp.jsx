import { Link } from "react-router-dom";
import { useState } from "react";
import { browserName } from "react-device-detect";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";

import AuthContainer from "../components/auth/form/AuthContainer";
import AuthForm from "../components/auth/form/AuthForm";
import logo from '../assets/images/logo.jpeg'
import backgroundImage from '../assets/images/background.png'
import InputField from "../components/auth/form/InputField";
import Button from "../components/auth/form/Button";
import Error from "../components/auth/form/Error";

import axios from "../utils/axios";
import { connect } from "react-redux";

const SignUp = ({setLogin}) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [experience, setExperience] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const handleEmailChange = e => {
        setEmail(e.target.value)
        clearErrorMessage('email')
    }

    const handleFirstNameChange = e => {
        setFirstName(e.target.value)
        clearErrorMessage('first_name')
    }
    
    const handleLastNameChange = e => {
        setLastName(e.target.value)
        clearErrorMessage('last_name')
    }

    const handleExperienceChange = e => {
        setExperience(e.target.value)
        clearErrorMessage('experience')
    }

    const handlePhoneChange = e => {
        setPhone(e.target.value)
        clearErrorMessage('phone_no')
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
        clearErrorMessage('password')
    }

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value)
        clearErrorMessage('password')
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

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        try {
            
            const response = await axios.post("register", {email, password, first_name: firstName, last_name: lastName, password_confirmation: confirmPassword, experience, device_name: browserName, device_token: "myToken", phone_no: phone})
            setLogin(response.data.data.user)
            cookie.set("token", response.data.data.token)

            history.push('/dashboard')
        } catch(e) {
            setErrors(e.response.data)
            setIsLoading(false)
        } 
    }

    return (
        <AuthContainer logo={logo} backgroundImage={backgroundImage} text="Sign Up">
            <AuthForm onSubmit={(e) => handleSubmit(e)}>
                {errors && errors.message && 
                    <Error message={errors.message}></Error>
                }
                <InputField labelText="First Name" value={firstName} inputType="text" error={errors?.data?.first_name} placeholder="First Name" onChange={(e) => handleFirstNameChange(e)}></InputField>   
                <InputField labelText="Last Name" value={lastName} inputType="text" error={errors?.data?.last_name} placeholder="Last Name" onChange={(e) => handleLastNameChange(e)}></InputField>   
                <InputField labelText="Email" value={email} inputType="email" error={errors?.data?.email} placeholder="Email" onChange={(e) => handleEmailChange(e)}></InputField>   
                <InputField labelText="Phone Number" value={phone} inputType="text" error={errors?.data?.phone_no} placeholder="Phone Number" onChange={(e) => handlePhoneChange(e)}></InputField>   
                <InputField labelText="Experience" value={experience} inputType="text" error={errors?.data?.experience} placeholder="Experience In Farming" onChange={(e) => handleExperienceChange(e)}></InputField>   
                <InputField labelText="Password" value={password} inputType="password" error={errors?.data?.password} placeholder="Password" onChange={(e) => handlePasswordChange(e)}></InputField>   
                <InputField labelText="Confirm Password" value={confirmPassword} inputType="password" placeholder="Confirm Password" onChange={(e) => handleConfirmPasswordChange(e)}></InputField> 
                <div className="pt-2">
                    <Button type="submit" disabled={isLoading}>Sign Up</Button>  
                </div>
                <div className="text-sm text-center text-gray-800">
                    Already Have an account? <Link to="/login" className="text-primary">Sign In</Link>
                </div>
            </AuthForm>
        </AuthContainer>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: user => dispatch({ type: 'SET_LOGIN', payload: user })
    }
}

export default connect(null, mapDispatchToProps)(SignUp)