import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'

const columnNames = [
    "Type",
    "Price",
    "Purchase Date",
    "Location",
    "Farm",
    "Action"
]

const columns = [
    {data: 'type', name: 'type'},
    {data: 'price', name: 'price'},
    {data: 'purchase_date', name: 'purchase_date'},
    {data: 'location', name: 'location'},
    {data: 'farm.location', name: 'farm.location'},
    {   name: 'action', 
        render: () => {
            return "<a href='#' class='border rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>"
            // return `<span class='flex items-center justify-center delete pointer-cursor flex-shrink p-0 m-0'>
            //     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 text-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            //     </svg>
            // </span>`;
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
            await axios.delete(`asset/${id}`)
           } catch(e){
            throw new Error(e)
           }
        }
    }
]

function AllAsset() {

    const history = useHistory()

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
