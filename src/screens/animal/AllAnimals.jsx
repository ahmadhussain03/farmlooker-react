import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

import axios from '../../utils/axios'

const columnNames = [
    "AUID",
    "Animal ID",
    "Animal Type",
    "Animal Breed",
    "Disease",
    "Sex",
    "DOB",
    "Add As",
    "Farm",
    "Action"
]

const columns = [
    {data: 'auid', name: 'auid'},
    {data: 'animal_id', name: 'animal_id'},
    {data: 'type.type', name: 'type.type'},
    {data: 'breed.breed', name: 'breed.breed'},
    {data: 'disease', name: 'disease'},
    {data: 'sex', name: 'sex'},
    {data: 'dob', name: 'dob'},
    {data: 'add_as', name: 'add_as'},
    {data: 'farm.name', name: 'farm.name'},
    {   name: 'action', 
        render: () => {
            return `
                <a href='#' class='border rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
                <a href='#' class='border rounded shadow border-yellow-600 p-1 text-yellow-600 edit'>Edit</a>
                <a href='#' class='border rounded shadow border-green-600 p-1 text-green-600 tree'>Tree</a>
            `
        }, 
        searchable: false,
        orderable: false
    }
]

function AllAnimals() {

    const history = useHistory()

    const listeners = [
        { 
            key: '.delete',
            listener: async (id) => {
               try {
                await axios.delete(`animal/${id}`)
               } catch(e){
                throw new Error(e)
               }
            }
        },
        {
            key: '.edit',
            listener: async (id) => {
                history.push(`edit-animal/${id}`)
            }
        },
        {
            key: '.tree',
            listener: async (id) => {
                history.push(`tree-animal/${id}`)
            }
        }
    ]

    return (
        <Container title="Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-animal')}>Create Animal</Button>
            </SimpleInput>
            <Datatable listeners={listeners} url="animal?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllAnimals
