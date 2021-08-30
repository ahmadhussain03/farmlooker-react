import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Image",
    "Name",
    "Model",
    "Rent",
    "Location",
    "dated",
    "Phone"
]

const columns = [
    {data: 'image', name: 'image'},
    {data: 'name', name: 'name'},
    {data: 'model', name: 'model'},
    {data: 'rent', name: 'rent'},
    {data: 'location', name: 'location'},
    {data: 'dated', name: 'dated'},
    {data: 'phone', name: 'phone'},
]

function AllRentalEquipment() {

    const history = useHistory()

    return (
        <Container title="Trading Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-rental-equipment')}>Create Rental Equipment</Button>
            </SimpleInput>
            <Datatable url="rental_equipment?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllRentalEquipment
