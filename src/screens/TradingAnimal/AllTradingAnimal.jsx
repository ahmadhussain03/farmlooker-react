import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'

const columnNames = [
    "Image",
    "Type",
    "Price",
    "Location",
    "Dated",
    "DOB",
    "Phone",
    "Action"
]

const columns = [
    {data: 'image', name: 'image'},
    {data: 'type', name: 'type'},
    {data: 'price', name: 'price'},
    {data: 'location', name: 'location'},
    {data: 'dated', name: 'dated'},
    {data: 'dob', name: 'dob'},
    {data: 'phone', name: 'phone'},
    {   
        name: 'action', 
        render: () => {
            return `<a href='#' class='border rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
               <a href='#' class='border rounded shadow border-yellow-600 p-1 text-yellow-600 edit'>Edit</a>
            `
        }, 
        searchable: false,
        orderable: false
    }
]

function AllTradingAnimal() {

    const history = useHistory()

    
    const listeners = [
        { 
            key: '.delete',
            listener: async (id) => {
               try {
                await axios.delete(`trading_animal/${id}`)
               } catch(e){
                throw new Error(e)
               }
            }
        },
        {
            key: '.edit',
            listener: async (id) => {
                return history.push(`edit-trading-animal/${id}`)
            }
        }
    ]

    return (
        <Container title="Trading Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-trading-animal')}>Create Trading Animal</Button>
            </SimpleInput>
            <Datatable listeners={listeners} url="trading_animal?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllTradingAnimal
