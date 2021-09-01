import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'


const columnNames = [
    "Animal ID",
    "Name",
    "Reason",
    "Date",
    "Action"
]

const columns = [
    {data: 'animal_id', name: 'animals.animal_id'},
    {data: 'name', name: 'name'},
    {data: 'reason', name: 'reason'},
    {data: 'date', name: 'date'},
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
            await axios.delete(`vaccine_record/${id}`)
           } catch(e){
            throw new Error(e)
           }
        }
    }
]

function AllVaccineRecord() {
    const history = useHistory()

    return (
        <Container title="Vaccine Records">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-vaccine-record')}>Create Record</Button>
            </SimpleInput>
            <Datatable listeners={listeners} url="vaccine_record?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllVaccineRecord
