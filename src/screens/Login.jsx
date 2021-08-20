import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { browserName } from "react-device-detect";

import Button from "../components/auth/form/Button";
import AuthForm from "../components/auth/form/AuthForm";
import InputField from "../components/auth/form/InputField";
import AuthContainer from "../components/auth/form/AuthContainer";
import Error from '../components/auth/form/Error'

import logo from '../assets/images/logo.jpeg'
import backgroundImage from '../assets/images/background.png'

import axios from "./../utils/axios";
import cookie from "js-cookie";
import { connect } from "react-redux";

const Login = ({setLogin}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const handleEmailChange = e => {
        setEmail(e.target.value)
        clearErrorMessage('email')
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
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
            
            const response = await axios.post("login", {email, password, device_name: browserName, device_token: "browser_token "})

            setLogin(response.data.data.user)
            cookie.set("token", response.data.data.token)

            history.push('/dashboard')
        } catch(e) {
            setErrors(e.response.data)
            setIsLoading(false)
        }

    }

    return (
        <AuthContainer logo={logo} backgroundImage={backgroundImage} text="Login">
            <AuthForm onSubmit={(e) => handleSubmit(e)}>
                {errors && errors.message && 
                    <Error message={errors.message}></Error>
                }
                <InputField labelText="Email" inputType="email" placeholder="Email" onChange={(e) => handleEmailChange(e)} error={errors?.data?.email}></InputField>   
                <InputField labelText="Password" inputType="password" placeholder="Password" error={errors?.data?.password} onChange={(e) => handlePasswordChange(e)}></InputField>   
                <div className="pt-2">
                    <Button disabled={isLoading} type="submit">Login</Button>  
                </div>
                <div className="text-sm text-center text-gray-800">
                    Don't have an account? <Link to="/" className="text-primary">Sign Up</Link>
                </div>
            </AuthForm>
        </AuthContainer>
    );
}

const mapDispatchToProps = dispatch => {
    return {
      setLogin: (user) => dispatch({ type: "SET_LOGIN", payload: user })
    };
};

export default connect(null, mapDispatchToProps)(Login)