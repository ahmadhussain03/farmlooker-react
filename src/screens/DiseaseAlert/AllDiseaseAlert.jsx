import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Animal ID",
    "Description",
    "Symptoms"
]

const columns = [
    {data: 'animal_id', name: 'animals.animal_id'},
    {data: 'description', name: 'description'},
    {data: 'symptoms', name: 'symptoms'},
]

function AllDiseaseAlert() {

    const history = useHistory()

    return (
        <Container title="Disease Alerts">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-disease-alert')}>Create Disease Alert</Button>
            </SimpleInput>
            <Datatable url="disease_alert?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllDiseaseAlert
