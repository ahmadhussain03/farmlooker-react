import React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import Container from '../../components/main/Container'
import axios from '../../utils/axios'

import moment from 'moment-timezone'


function AllSubscriptions({ user, setUser }) {

    let subscription = null

    if(user?.subscriptions?.length){
        subscription = user.subscriptions[0]
    }

    const cancelSubscription = async e => {
        const response = await toast.promise(
            axios.delete(`subscribe`),
            {
                pending: 'Cancelling Subscription...',
                success: "Subscription Cancelled Successfully!",
                error: {
                    render({ data }){
                        return data?.response?.data?.message ?? 'Something Went Wrong!'
                    }
                }
            }
        )

        setUser(response.data.data.user)
    }

    const resumeSubscription = async e => {
        const response = await toast.promise(
            axios.post(`subscribe/resume`),
            {
                pending: 'Resuming Subscription...',
                success: "Subscription Resumed Successfully!",
                error: {
                    render({ data }){
                        return data?.response?.data?.message ?? 'Something Went Wrong!'
                    }
                }
            }
        )

        setUser(response.data.data.user)
    }

    const openBillingPortal = async e => {
        const response = await toast.promise(
            axios.get(`billing-portal`),
            {
                pending: 'Opening Billing Portal...',
                success: null,
                error: {
                    render({ data }){
                        return data?.response?.data?.message ?? 'Something Went Wrong!'
                    }
                }
            }
        )

        window.location.replace(response.data.data.url)
    }

    return (
        <Container title="Subscriptions">
            <div className="bg-white w-full shadow rounded-lg mt-3 flex relative z-30">
                <div className="w-2.5  h-auto bg-primary-side rounded-tl-md rounded-bl-md" />
                <div className="w-full p-8">
                    <div className="md:flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold leading-6 text-gray-800">{subscription.plan.name}</h2>
                            <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">{subscription.plan.description}</p>
                        </div>
                        <div className="flex flex-col justify-evenly items-end">
                            <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
                                ${subscription.plan.amount}<span className="font-normal text-base">/mo</span>
                            </p>
                            <button onClick={e => openBillingPortal(e)} className="curosr-pointer bg-primary-dark text-white px-3 py-2 rounded-md mt-2">
                                Billing Portal
                            </button>
                        </div>
                    </div>
                    <div className="py-2 flex items-center">
                        {subscription.ends_at === null ? (
                            <button onClick={e => cancelSubscription(e)} className="curosr-pointer bg-red-600 tracking-wider text-white px-3 py-2 rounded-md mt-2">
                                Cancel Subscription
                            </button>
                        ) : (
                            <div className="flex flex-col">
                                <p className="text-base leading-6 mt-4 text-gray-600">
                                    Your Subscription will end at <span className="font-semibold underline">{moment(subscription.ends_at).tz('Asia/Karachi').format('yyyy-MM-DD hh:mm')}</span>
                                </p>
                                <div className="flex flex-row items-center space-x-1">
                                    <button onClick={e => cancelSubscription(e)} className="curosr-pointer bg-red-600 tracking-wider text-white px-3 py-2 rounded-md mt-2">
                                        Cancel Subscription Now
                                    </button>
                                    <button onClick={e => resumeSubscription(e)} className="curosr-pointer bg-green-600 tracking-wider text-white px-3 py-2 rounded-md mt-2">
                                        Resume Subscription
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
      setUser: (user) => dispatch({ type: "SET_LOGIN", payload: user })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AllSubscriptions)
