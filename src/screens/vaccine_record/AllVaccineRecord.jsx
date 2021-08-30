import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Animal ID",
    "Name",
    "Reason",
    "Date"
]

const columns = [
    {data: 'animal_id', name: 'animals.animal_id'},
    {data: 'name', name: 'name'},
    {data: 'reason', name: 'reason'},
    {data: 'date', name: 'date'},
]

function AllVaccineRecord() {
    const history = useHistory()

    return (
        <Container title="Vaccine Records">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-vaccine-record')}>Create Record</Button>
            </SimpleInput>
            <Datatable url="vaccine_record?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllVaccineRecord
