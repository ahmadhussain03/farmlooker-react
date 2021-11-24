import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux';
import Container from '../../components/main/Container';
import Form, { FormGroup } from '../../components/main/form/Form';
import { Accordion } from './CreateExpense';
import Input from './../../components/main/form/Input';
import Select from '../../components/main/form/Select';
import Button from '../../components/auth/form/Button';
import axios from '../../utils/axios';
import Datatable2 from '../../components/main/Datatable2';

const AnimalSold = () => {

    const [animal, setAnimal] = useState("")
    const [amount, setAmount] = useState("")
    const [dated, setDated] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleAnimalChange = e => {
        setAnimal(e)
        clearErrorMessage('animal')
    }

    const handleAmountChange = e => {
        setAmount(e.target.value)
        clearErrorMessage('amount')
    }

    const handleDatedChange = e => {
        setDated(e.target.value)
        clearErrorMessage('dated')
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
    
    const handleAnimalSold = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            
            const response = await axios.post("animal_sold", {
                animal: animal?.value,
                amount,
                dated
            })

            setAnimal("")
            setAmount("")
            setDated("")
            setLoading(false);
            setErrors({})
        } catch(e) {
            setLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <div className="flex w-1/2 items-center justify-around">
            <Form errors={errors} isPadded={false} onSubmit={handleAnimalSold}>
                <FormGroup>
                    <Select error={errors?.data?.animal} value={animal} onChange={handleAnimalChange} placeholder="Animal" url='animal' mapOptions={options => options.map(option => ({ value: option.id, label: option.animal_id }))} async={true}></Select>
                </FormGroup>
                <FormGroup>
                    <Input type="number" error={errors?.data?.amount} value={amount} onChange={handleAmountChange} placeholder="Amount"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="date" error={errors?.data?.dated} value={dated} onChange={handleDatedChange} placeholder="Date"></Input>
                </FormGroup>
                <FormGroup>
                    <Button disabled={loading} type="submit"><span className="font-semibold">Sold</span></Button>  
                </FormGroup>
            </Form>
        </div>
    )
}

const Others = ({ farms }) => {
    const [farm, setFarm] = useState("")
    const [reason, setReason] = useState("")
    const [amount, setAmount] = useState("")
    const [dated, setDated] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleReasonChange = e => {
        setReason(e.target.value)
        clearErrorMessage('reason')
    }

    const handleAmountChange = e => {
        setAmount(e.target.value)
        clearErrorMessage('amount')
    }

    const handleDatedChange = e => {
        setDated(e.target.value)
        clearErrorMessage('dated')
    }

    const handleFarmChange = e => {
        setFarm(e)
        clearErrorMessage('farm')
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
    
    const handleOtherIncome = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            
            const response = await axios.post("other_income", {
                reason,
                amount,
                farm: farm?.value,
                dated
            })
            setReason("")
            setAmount("")
            setFarm("")
            setDated("")
            setLoading(false);
            setErrors({})
        } catch(e) {
            setLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <div className="flex w-1/2 items-center justify-around">
            <Form errors={errors} isPadded={false} onSubmit={handleOtherIncome}>
                <FormGroup>
                    <Input type="text" error={errors?.data?.reason} value={reason} onChange={handleReasonChange} placeholder="Reason"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="number" error={errors?.data?.amount} value={amount} onChange={handleAmountChange} placeholder="Amount"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="date" error={errors?.data?.dated} value={dated} onChange={handleDatedChange} placeholder="Date"></Input>
                </FormGroup>
                <FormGroup>
                    <Select error={errors?.data?.farm} value={farm} onChange={handleFarmChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
                </FormGroup>
                <FormGroup>
                    <Button disabled={loading} type="submit"><span className="font-semibold">Add</span></Button>  
                </FormGroup>
            </Form>
        </div>
    )
}

const columns = [
    {data: 'amount', label: 'Amount', orderable: false},
    {data: 'farm.name', label: 'Farm', orderable: false},
    {data: 'incomeable_type', label: 'Income Type', orderable: false},
    {data: 'dated', label: 'Dated', orderable: false}
]

const CreateIncome = ({ user }) => {

    const farmOptions = user.farms && user.farms.length ? user.farms.map(farm => ({value: farm.id, text: farm.name})) : []

    return (
        <Container title={"Income Recorder"} >
           <div className="w-full flex flex-col space-y-2">
                <Accordion title="Animal Sold" > 
                    <AnimalSold />
                </Accordion>
                <Accordion title="Others" > 
                    <Others farms={farmOptions} />
                </Accordion>
            </div>
            <div className="w-full flex flex-col space-y-2">
                <Datatable2 url="income" columns={columns} />
            </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateIncome)
