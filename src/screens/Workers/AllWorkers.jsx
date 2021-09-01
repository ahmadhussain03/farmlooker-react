import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'

const columnNames = [
    "Name",
    "Phone No",
    "Address",
    "Pay",
    "Location",
    "Joining Date",
    "Duty",
    "Farm",
    "Action"
]

const columns = [
    {data: 'name', name: 'name'},
    {data: 'phone_no', name: 'phone_no'},
    {data: 'address', name: 'address'},
    {data: 'pay', name: 'pay'},
    {data: 'location', name: 'location'},
    {data: 'joining_date', name: 'joining_date'},
    {data: 'duty', name: 'duty'},
    {data: 'farm.location', name: 'farm.location'},
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
            await axios.delete(`worker/${id}`)
           } catch(e){
            throw new Error(e)
           }
        }
    }
]

function AllWorkers() {

    const history = useHistory()

    return (
        <Container title="Workers">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-worker')}>Create Worker</Button>
            </SimpleInput>
            <Datatable listeners={listeners} url="worker?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllWorkers
