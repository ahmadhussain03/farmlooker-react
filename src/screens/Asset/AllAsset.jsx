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
    "Purchase Date",
    "Location",
    "Farm",
    "Action"
]

const columns = [
    {data: 'image', name: 'image'},
    {data: 'type', name: 'type'},
    {data: 'price', name: 'price'},
    {data: 'purchase_date', name: 'purchase_date'},
    {data: 'location', name: 'location'},
    {data: 'farm.name', name: 'farm.name'},
    {   name: 'action', 
        render: () => {
            return `<a href='#' class='border rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
                <a href='#' class='border rounded shadow border-yellow-600 p-1 text-yellow-600 edit'>Edit</a>
            `;
        }, 
        searchable: false,
        orderable: false
    }
]

function AllAsset() {

    const history = useHistory()

    const listeners = [
        { 
            key: '.delete',
            listener: async (id) => {
               try {
                await axios.delete(`asset/${id}`)
               } catch(e){
                throw new Error(e)
               }
            }
        },
        {
            key: '.edit',
            listener: async (id) => {
                return history.push(`edit-asset/${id}`)
            }
        }
    ]
    
    return (
        <Container title="Assets">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-asset')}>Create Asset</Button>
            </SimpleInput>
            <Datatable listeners={listeners} url="asset?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllAsset
