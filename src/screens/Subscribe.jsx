import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import {Elements, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { toast } from 'react-toastify';

import Header from "../components/main/Header";
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from '../utils/axios';
import { connect } from 'react-redux';

const stripePromise = loadStripe('pk_test_Ewb0J3PpnxAZljiFYxPsOyZj00daU5mfLa');

const CheckoutForm = ({ plan, setUser }) => {

    const toastId = useRef()

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const stripeToast = toast.loading('Creating Payment Method..')

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
            toast.update(stripeToast, { render: error.message, type: "error", isLoading: false, autoClose: true });
        } else {
            toast.update(stripeToast, { render: "Payment Method Added...", type: "success", isLoading: false, autoClose: 3000 });
            const processPaymentMethod = async () => {
                const response = await toast.promise(
                    axios.put(`subscribe/${plan.id}`, {payment_method: setupIntent.payment_method}),
                    {
                        pending: 'Proccessing Payment...',
                        success: {
                            render({ data }){
                                console.log(data)
                                history.push('/dashboard')
                                return data.data.message
                            }
                        },
                        error: {
                            render({ data }){
                                return data?.response?.data?.message ?? 'Something Went Wrong!'
                            }
                        }
                    }
                )

                setUser(response.data.data.user)
            }
    
            processPaymentMethod();
        }
    }
    

    const elementLoaded = async () => {
        toast.update(toastId?.current, { render: "All is good", type: "success", isLoading: false, autoClose: true });
    }

    useEffect(() => {
        toastId.current = toast.loading("Loading Form...")
    }, [])

    return (
      <div className="flex justify-center items-center flex-col p-5">
        <div className="w-full lg:w-1/2 py-4">
            <div role="listitem" className="bg-white shadow rounded-lg mt-3 flex relative z-30">
                <div className="w-2.5  h-auto bg-indigo-700 rounded-tl-md rounded-bl-md" />
                <div className="w-full p-8">
                    <div className="md:flex items-center justify-between">
                        <h2 className="text-2xl font-semibold leading-6 text-gray-800">{plan.name}</h2>
                        <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
                            ${plan.amount}<span className="font-normal text-base">/mo</span>
                        </p>
                    </div>
                    <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">{plan.description}</p>
                </div>
            </div>
        </div>
        <form className="w-full lg:w-1/2 shadow-lg px-5 py-4 m-5 rounded-md border-2 border-black" onSubmit={handleSubmit}>
            <PaymentElement onReady={() => elementLoaded()}  />
            {stripe && (
                <button type="submit" className="bg-indigo-700 rounded-md shadow-md text-white px-3 py-2 mt-2">Subscribe</button>  
            )}
        </form>
      </div>
    );
  };

const Subscribe = ({ setUser }) => {

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
                <CheckoutForm clientSecret={location.state.intent.client_secret} plan={plan} setUser={setUser} />
            </Elements>
          </>
      );

}

const mapDispatchToProps = dispatch => {
    return {
      setUser: (user) => dispatch({ type: "SET_LOGIN", payload: user })
    };
};



export default connect(null, mapDispatchToProps)(Subscribe)