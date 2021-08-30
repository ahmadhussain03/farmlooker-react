import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Image",
    "Type",
    "Price",
    "Location",
    "Dated",
    "DOB",
    "Phone"
]

const columns = [
    {data: 'image', name: 'image'},
    {data: 'type', name: 'type'},
    {data: 'price', name: 'price'},
    {data: 'location', name: 'location'},
    {data: 'dated', name: 'dated'},
    {data: 'dob', name: 'dob'},
    {data: 'phone', name: 'phone'},
]

function AllTradingAnimal() {

    const history = useHistory()

    return (
        <Container title="Trading Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-trading-animal')}>Create Trading Animal</Button>
            </SimpleInput>
            <Datatable url="trading_animal?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllTradingAnimal
