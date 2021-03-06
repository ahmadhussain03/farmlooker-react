import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios from '../../utils/axios'


const EditWorker = ({ user }) => {
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [address, setAddress] = useState("")
    const [pay, setPay] = useState("")
    const [joiningDate, setJoiningDate] = useState("")
    const [duty, setDuty] = useState("")
    const [passport, setPassport] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

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

    const handlePassportChange = e => {
        setPassport(e.target.value)
        clearErrorMessage('id_or_passport')
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

    const { id } = useParams()

    const getWorker = useCallback(async () => {
        let response = await axios.get(`worker/${id}`)
        let worker = response.data.data
        setAddress(worker.address)
        setDuty(worker.duty)
        setName(worker.name)
        setPhoneNo(worker.phone_no)
        setPassport(worker.id_or_passport)
        setPay(worker.pay)
        setJoiningDate(worker.joining_date)
        setFarm({value: worker.farm.id, label: worker.farm.name})
    }, [id])

    useEffect(() => {
        getWorker()
    }, [getWorker])

    const handleUpdateWorker = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            
            await axios.put(`worker/${id}`, {
                name,
                phone_no: phoneNo,
                address,
                pay,
                joining_date: joiningDate,
                duty,
                farm_id: farm,
                id_or_passport: passport
            })

            setIsLoading(false);
            history.push('/dashboard/worker')
        } catch(e) {
            setIsLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <Form onSubmit={handleUpdateWorker} formHeading="Edit Worker" errors={errors}>
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
                <Input error={errors?.data?.joining_date} value={joiningDate} onChange={handleJoiningDateChange} type="date" placeholder="Joining Date"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.duty} value={duty} onChange={handleDutyChange} type="text" placeholder="Duty"  />
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.id_or_passport} value={passport} onChange={handlePassportChange} type="text" placeholder="ID/Passport"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Update Worker</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(EditWorker)