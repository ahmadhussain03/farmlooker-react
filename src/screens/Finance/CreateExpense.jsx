import React, { useState, useCallback, useEffect } from 'react'
import Button from '../../components/auth/form/Button'
import ArrowDown from '../../components/icons/ArrowDown'
import Container from '../../components/main/Container'
import Form, { FormGroup } from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import axios from '../../utils/axios'
import ArrowUp from './../../components/icons/ArrowUp';
import { connect } from 'react-redux'

export const Accordion = ({ title = '', children }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = e => {
        e.preventDefault()

        setOpen(open => !open)
    }

    return (
        <div className="flex flex-col w-full px-6">
            <div className="flex flex-row items-center rounded-t-md justify-between px-5 bg-gray-700 text-primary font-semibold text-xl py-2 cursor-pointer" onClick={handleOpen}>
                <div>
                    {title}
                </div>
                <div>
                    {!open ? 
                        <ArrowDown className="h-6 w-6" />
                        :
                        <ArrowUp className="h-6 w-6" />
                    }
                </div>
            </div>
            { open &&
                <div className="flex-1 bg-gray-400 h-full w-full rounded-b-md px-5 py-3">
                    {children}
                </div>
            }
        </div>
    )
}

const Salaries = () => {

    const [workers, setWorkers] = useState([])
    const [worker, setWorker] = useState("")
    const [pay, setPay] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleWorkerChange = e => {
        setWorker(e.value)
        const workerIndex = workers.findIndex(w => w.value == e.value)
        if(workerIndex != -1){
            setPay(workers[workerIndex].pay)
        }
        clearErrorMessage('worker')
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

    const getWorkers = useCallback(async () => {
        let response = await axios.get('worker')
        setWorkers(response.data.data.data.map(t => ({value: t.id, text: t.name, pay: t.pay})))
    }, [])

    useEffect(() => {   
        getWorkers()
    }, [])
    
    const handleSalaryPaid = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            
            const response = await axios.post("salary", {
                worker: worker,
                pay: pay
            })
            setWorker("")
            setLoading(false);
            setErrors({})
        } catch(e) {
            setLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <div className="flex w-1/2 items-center justify-around">
            <Form errors={errors} isPadded={false} onSubmit={handleSalaryPaid}>
                <FormGroup>
                    <Select error={errors?.data?.worker} value={worker} onChange={handleWorkerChange} placeholder="Worker" options={workers}></Select>
                </FormGroup>
                {worker && 
                    <FormGroup>
                        <p className="bg-white shadow-md w-full text-center rounded-md py-2 font-semibold text-md">Pay {pay}</p>
                    </FormGroup>
                }
                <FormGroup>
                    <Button disabled={loading} type="submit"><span className="font-semibold">Paid</span></Button>  
                </FormGroup>
            </Form>
        </div>
    )
}

const OrderFeed = () => {

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [weight, setWeight] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleNameChange = e => {
        setName(e.target.value)
        clearErrorMessage('name')
    }

    const handleDateChange = e => {
        setDate(e.target.value)
        clearErrorMessage('date')
    }

    
    const handlePriceChange = e => {
        setPrice(e.target.value)
        clearErrorMessage('price')
    }

    const handleWeightChange = e => {
        setWeight(e.target.value)
        clearErrorMessage('weight')
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
    
    const handleOrderFeed = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            
            const response = await axios.post("order_feed_expense", {
                name,
                date,
                price,
                weight,
                farm: farm?.value
            })
            console.log(response.data.data)
            setName("")
            setPrice("")
            setWeight("")
            setDate("")
            setFarm("")
            setLoading(false);
            setErrors({})
        } catch(e) {
            setLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <div className="flex w-1/2 items-center justify-around">
            <Form errors={errors} isPadded={false} onSubmit={handleOrderFeed}>
                <FormGroup>
                    <Input type="text" error={errors?.data?.name} value={name} onChange={handleNameChange} placeholder="Name"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="date" error={errors?.data?.date} value={date} onChange={handleDateChange} placeholder="Date"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="number" error={errors?.data?.price} value={price} onChange={handlePriceChange} placeholder="Price"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="number" error={errors?.data?.weight} value={weight} onChange={handleWeightChange} placeholder="Weight (Ton)"></Input>
                </FormGroup>
                <FormGroup>
                    <Select error={errors?.data?.farm} value={farm} onChange={handleFarmChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
                </FormGroup>
                <FormGroup>
                    <Button disabled={loading} type="submit"><span className="font-semibold">Order</span></Button>  
                </FormGroup>
            </Form>
        </div>
    )
}

const Miscelleneous = () => {

    const [farm, setFarm] = useState("")
    const [reason, setReason] = useState("")
    const [amount, setAmount] = useState("")
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
    
    const handleOrderFeed = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            
            const response = await axios.post("miscelleneous", {
                reason,
                amount,
                farm: farm?.value
            })
            setReason("")
            setAmount("")
            setFarm(null)
            setLoading(false);
            setErrors({})
        } catch(e) {
            setLoading(false);
            setErrors(e.response.data)
        }
    }

    return (
        <div className="flex w-1/2 items-center justify-around">
            <Form errors={errors} isPadded={false} onSubmit={handleOrderFeed}>
                <FormGroup>
                    <Input type="text" error={errors?.data?.reason} value={reason} onChange={handleReasonChange} placeholder="Reason"></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="number" error={errors?.data?.amount} value={amount} onChange={handleAmountChange} placeholder="Amount"></Input>
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

const CreateExpense = ({ user }) => {

    const farmOptions = user.farms && user.farms.length ? user.farms.map(farm => ({value: farm.id, text: farm.name})) : []

    return (
       <Container title="Expense Recorder">
            <div className="w-full flex flex-col space-y-2">
                
                <Accordion title="Salaries" > 
                    <Salaries />
                </Accordion>
                <Accordion title="Order Feed" >
                    <OrderFeed farms={farmOptions} />
                </Accordion>
                <Accordion title="Miscelleneous" > 
                    <Miscelleneous farms={farmOptions} />
                </Accordion>
            </div>
       </Container>
    )
}


const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateExpense)