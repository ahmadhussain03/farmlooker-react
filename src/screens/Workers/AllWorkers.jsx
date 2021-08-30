import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Name",
    "Phone No",
    "Address",
    "Pay",
    "Location",
    "Joining Date",
    "Duty",
    "Farm"
]

const columns = [
    {data: 'name', name: 'name'},
    {data: 'phone_no', name: 'phone_no'},
    {data: 'address', name: 'address'},
    {data: 'pay', name: 'pay'},
    {data: 'location', name: 'location'},
    {data: 'joining_date', name: 'joining_date'},
    {data: 'duty', name: 'duty'},
    {data: 'farm.location', name: 'farm.location'}
]

function AllWorkers() {

    const history = useHistory()

    return (
        <Container title="Workers">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-worker')}>Create Worker</Button>
            </SimpleInput>
            <Datatable url="worker?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllWorkers
