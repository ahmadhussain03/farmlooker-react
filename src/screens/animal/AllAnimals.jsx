import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'


const columnNames = [
    "Animal ID",
    "Animal Type",
    "Animal Breed",
    "AUID",
    "Disease",
    "Sex",
    "DOB",
    "Add As",
    "Farm",
    "Action"
]

const columns2 = [
    {data: 'animal_id', name: 'animal_id'},
    {data: 'type.type', name: 'type.type'},
    {data: 'breed.breed', name: 'breed.breed'},
    {data: 'auid', name: 'auid'},
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

const columns = [
    {data: 'animal_id', label: 'Animal ID'},
    {data: 'type.type', label: 'Type'},
    {data: 'breed.breed', label: 'Breed'},
    {data: 'auid', label: 'AUID'},
    {data: 'disease', label: 'Disease'},
    {data: 'sex', label: 'Sex'},
    {data: 'dob', label: 'DOB'},
    {data: 'add_as', label: 'Add As'},
    {data: 'farm.name', label: 'Farm'},
    {   label: 'action', 
        renderer: (props) => {
            return (
               <Action {...props} />
            )
        }, 
        orderable: false
    }
]

const Action = ({ item, reload }) => {

    const history = useHistory()

    const handleEdit = () => {
        history.push(`edit-animal/${item.id}`)
    }

    const handleTree = () => {
        history.push(`tree-animal/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`animal/${item.id}`)
            reload()
           } catch(e){
            throw new Error(e)
           }
    }

    return (
        <div className="flex flex-row space-x-1 items-center justify-center">
            <a onClick={e => handleDelete()} className='border cursor-pointer rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
            <a onClick={e => handleEdit()} className='border cursor-pointer rounded shadow border-yellow-600 p-1 text-yellow-600 edit'>Edit</a>
            <a onClick={e => handleTree()} className='border cursor-pointer rounded shadow border-green-600 p-1 text-green-600 tree'>Tree</a>
        </div>
    )
}


function AllAnimals() {

    const history = useHistory()

    return (
        <Container title="Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-animal')}>Create Animal</Button>
            </SimpleInput>
            <Datatable2 url="animal" columns={columns} />
            {/* <Datatable listeners={listeners} url="animal?client=datatable" columns={columns} columnNames={columnNames} /> */}
        </Container>
    )
}

export default AllAnimals
