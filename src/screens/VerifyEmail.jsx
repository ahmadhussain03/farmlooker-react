import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import AuthContainer from "../components/auth/form/AuthContainer";
import AuthForm from "../components/auth/form/AuthForm";
import logo from '../assets/images/logo.png'
import backgroundImage from '../assets/images/background.png'
import InputField from "../components/auth/form/InputField";
import Button from "../components/auth/form/Button";
import Error from "../components/auth/form/Error";

import axios from "../utils/axios";
import { connect } from "react-redux";
import cookie from 'js-cookie'


const VerifyEmail = ({ setLogin, setLogout }) => {

    
    const [code, setCode] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()
    
    const handleCodeChange = e => {
        setCode(e.target.value)
        clearErrorMessage('code')
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
            
            const response = await axios.post("email/verify", {code})
            setLogin(response.data.data)

            history.push('/plans')
        } catch(e) {
            setErrors(e.response.data)
            setIsLoading(false)
        }

    }

    const handleLogout = async e => {
        e.preventDefault()

        try {
            await axios.post("/logout")
        } catch(e){
            console.error(e)
        } finally {
            cookie.remove("token")
            setLogout()
            history.push('/login')
        }
    }

    return (
        <AuthContainer logo={logo} backgroundImage={backgroundImage} text="Login">
            <AuthForm onSubmit={(e) => handleSubmit(e)}>
                {errors && errors.message && 
                    <Error message={errors.message}></Error>
                }
                <InputField labelText="Verification Code" inputType="text" placeholder="Verification Code" error={errors?.data?.code} onChange={(e) => handleCodeChange(e)}></InputField>   
                <div className="pt-2">
                    <Button disabled={isLoading} type="submit">Verify Email</Button>  
                </div>
                <div className="text-sm text-center text-gray-800">
                    <a href="/logout" onClick={(e) => handleLogout(e)} className="text-primary">Logout</a>
                </div>
            </AuthForm>
        </AuthContainer>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      setLogin: (user) => dispatch({ type: "SET_LOGIN", payload: user }),
      setLogout: (user) => dispatch({ type: "SET_LOGOUT" })
    };
};

export default connect(null, mapDispatchToProps)(VerifyEmail)