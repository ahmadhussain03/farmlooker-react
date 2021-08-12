import { Link } from "react-router-dom";

import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";
import logo from '../assets/images/logo.jpeg'
import backgroundImage from '../assets/images/background.png'
import InputField from "../components/InputField";
import Button from "../components/Button";

const SignUp = () => {
    return (
        <AuthContainer logo={logo} backgroundImage={backgroundImage} text="Sign Up">
            <AuthForm onSubmit={(e) => {e.preventDefault(); console.log(e);}}>
                <InputField labelText="First Name" inputType="text" placeholder="First Name" onChange={(e) => console.log(e.target.value)}></InputField>   
                <InputField labelText="Last Name" inputType="text" placeholder="Last Name" onChange={(e) => console.log(e.target.value)}></InputField>   
                <InputField labelText="Email" inputType="email" placeholder="Email" onChange={(e) => console.log(e.target.value)}></InputField>   
                <InputField labelText="Phone Number" inputType="text" placeholder="Phone Number" onChange={(e) => console.log(e.target.value)}></InputField>   
                <InputField labelText="Experience" inputType="text" placeholder="Experience" onChange={(e) => console.log(e.target.value)}></InputField>   
                <InputField labelText="Password" inputType="password" placeholder="Password" onChange={(e) => console.log(e.target.value)}></InputField>   
                <InputField labelText="Confirm Password" inputType="password" placeholder="Confirm Password" onChange={(e) => console.log(e.target.value)}></InputField> 
                <div className="pt-2">
                    <Button type="submit">Sign Up</Button>  
                </div>
                <div className="text-sm text-center text-gray-800">
                    Already Have an account? <Link to="/login" className="text-primary">Sign In</Link>
                </div>
            </AuthForm>
        </AuthContainer>
    );
}

export default SignUp