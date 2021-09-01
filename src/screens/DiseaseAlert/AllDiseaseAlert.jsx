import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'

const columnNames = [
    "Animal ID",
    "Description",
    "Symptoms",
    "Action"
]

const columns = [
    {data: 'animal_id', name: 'animals.animal_id'},
    {data: 'description', name: 'description'},
    {data: 'symptoms', name: 'symptoms'},
    {   name: 'action', 
        render: () => {
            return "<a href='#' class='border rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>"
        }, 
        searchable: false,
        orderable: false
    }
]

const listeners = [
    { 
        key: '.delete',
        listener: async (id) => {
           try {
            await axios.delete(`disease_alert/${id}`)
           } catch(e){
            throw new Error(e)
           }
        }
    }
]

function AllDiseaseAlert() {

    const history = useHistory()

    return (
        <Container title="Disease Alerts">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-disease-alert')}>Create Disease Alert</Button>
            </SimpleInput>
            <Datatable listeners={listeners} url="disease_alert?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllDiseaseAlert
