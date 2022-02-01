import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import {Elements, PaymentElement, useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { toast } from 'react-toastify';

import Header from "../components/main/Header";
import { useEffect } from 'react';
import { useRef } from 'react';

const stripePromise = loadStripe('pk_test_Ewb0J3PpnxAZljiFYxPsOyZj00daU5mfLa');

const CheckoutForm = ({ clientSecret }) => {

    const toastId = useRef()
    const [name, setName] = useState("")

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { setupIntent, error } = await stripe.confirmSetup({
            elements,
            redirect: "if_required"
        });

        if(error){
            toast.error(error.message)
        } else {
            console.log(setupIntent)
        }
    }
    

    const elementLoaded = async () => {
        toast.update(toastId?.current, { render: "All is good", type: "success", isLoading: false, autoClose: true });
    }

    useEffect(() => {
        toastId.current = toast.loading("Loading Form...")
    }, [])

    return (
      <div className="flex justify-center items-center">
        <form className="w-full md:w-3/4 shadow-lg px-5 py-4 m-5 rounded-md border-2 border-black" onSubmit={handleSubmit}>
            <div className="my-2">
                <label htmlFor="" className='text-sm'>Card Holder Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Card Holder Name' className='border-2 border-black w-full px-3 py-2 rounded-md' />
            </div>
            <PaymentElement onReady={() => elementLoaded()}  />
            {stripe && (
                <button type="submit" className="bg-indigo-700 rounded-md shadow-md text-white px-3 py-2 mt-2">Submit</button>  
            )}
        </form>
      </div>
    );
  };

const Subscribe = () => {

    const location = useLocation()

    // console.log(location.state.intent)

    const plan = location.state.plan

    const options = {
        // passing the client secret obtained from the server
        clientSecret: location.state.intent.client_secret,
      };
    
      return (
          <>
            <Header showSideBarOption={false}></Header>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm clientSecret={location.state.intent.client_secret} />
            </Elements>
          </>
      );

}

export default Subscribe