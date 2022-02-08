import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'

import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'
import TrashIcon from '../../components/icons/TrashIcon'
import { useState } from 'react';

const columns = [
    {data: 'animal_id', label: 'Animal ID'},
    {data: 'type.type', label: 'Type'},
    {data: 'breed.breed', label: 'Breed'},
    {data: 'disease', label: 'Disease'},
    {data: 'sex', label: 'Sex'},
    {data: 'dob', label: 'DOB'},
    {data: 'add_as', label: 'Add As'},
    {data: 'farm.name', label: 'Farm'},
    {data: 'herd.name', label: 'Herd'},
    {   label: 'action', 
        renderer: (props) => {
            return (
               <Action {...props} />
            )
        }, 
        orderable: false
    }
]

const SelectedAction = ({ selectedItems, reload }) => {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {

            setLoading(true)
            const ids = selectedItems.map(item => item.id)
            await axios.post(`animal`, { animals: ids, "_method": "DELETE" })
            reload()
           } catch(e){
                setLoading(false)
                console.error(e)
           } finally {
               setLoading(false)
           }
    }

    return (
        <>
            <button onClick={e => handleDelete()} disabled={loading} className="cursor-pointer disabled:opacity-50 rounded shadow-md text-sm bg-red-600 px-3 py-2 font-semibold text-white"><span className="flex flex-row justify-center items-center space-x-1"><span> <TrashIcon height={16} width={16} /> </span><span>{!loading ? 'Delete Selected' : 'Deleting...'}</span></span></button>
        </>
    )
}

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
            <Datatable2 url="animal" columns={columns} isSelectable={true} SelectedAction={SelectedAction} />
        </Container>
    )
}

export default AllAnimals
