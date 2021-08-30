import React from 'react'
import { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'

const CreateWorker = ({ user }) => {

    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [address, setAddress] = useState("")
    const [pay, setPay] = useState("")
    const [location, setLocation] = useState("")
    const [joiningDate, setJoiningDate] = useState("")
    const [duty, setDuty] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    
    const handleLocationChange = e => {
        setLocation(e.target.value)
        clearErrorMessage('location')
    }

    const handleNameChange = e => {
        setName(e.target.value)
        clearErrorMessage('name')
    }

    const handlePhoneNoChange = e => {
        setPhoneNo(e.target.value)
        clearErrorMessage('phone_no')
    }

    const handleAddressChange = e => {
        setAddress(e.target.value)
        clearErrorMessage('address')
    }

    const handlePayChange = e => {
        setPay(e.target.value)
        clearErrorMessage('pay')
    }

    const handleJoiningDateChange = e => {
        setJoiningDate(e.target.value)
        clearErrorMessage('joining_date')
    }

    const handleDutyChange = e => {
        setDuty(e.target.value)
        clearErrorMessage('duty')
    }

    const handleFarmIdChange = e => {
        setFarm(e.target.value)
        clearErrorMessage('farm_id')
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

    const handleCreateWorker = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            
            const response = await axios.post("worker", {
                name,
                phone_no: phoneNo,
                address,
                pay,
                location,
                joining_date: joiningDate,
                duty,
                farm_id: farm
            })

            setIsLoading(false);
            history.push('/dashboard/worker')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    const farmOptions = user.farms && user.farms.length ? user.farms.map(farm => ({value: farm.id, text: farm.location})) : []

    return (
        <Form onSubmit={handleCreateWorker} formHeading="Add Worker" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.name} value={name} onChange={handleNameChange} type="text" placeholder="Name"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.phone_no} value={phoneNo} onChange={handlePhoneNoChange} type="text" placeholder="Phone No"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.address} value={address} onChange={handleAddressChange} placeholder="Address" />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.pay} value={pay} onChange={handlePayChange} type="number" placeholder="Pay"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.location} value={location} onChange={handleLocationChange} type="text" placeholder="Location"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.joining_date} value={joiningDate} onChange={handleJoiningDateChange} type="date" placeholder="Joining Date"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.duty} value={duty} onChange={handleDutyChange} type="number" placeholder="Duty"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" options={farmOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Worker</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateWorker)