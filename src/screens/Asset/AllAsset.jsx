import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'
import TrashIcon from '../../components/icons/TrashIcon'


const Action = ({ item, reload }) => {

    const history = useHistory()

    const handleEdit = () => {
        history.push(`edit-asset/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`asset/${item.id}`)
            reload()
           } catch(e){
            throw new Error(e)
           }
    }

    return (
        <div className="flex flex-row space-x-1 items-center justify-center">
            <a onClick={e => handleDelete()} className='border cursor-pointer rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
            <a onClick={e => handleEdit()} className='border cursor-pointer rounded shadow border-yellow-600 p-1 text-yellow-600 edit'>Edit</a>
        </div>
    )
}

const columns = [
    {data: 'image', label: 'Image', renderer: ({item}) => {
        return (
            <div className="flex items-center justify-center">
                <img src={item.image} className="w-16 h-16 object-cover object-center border border-gray-700 p-1 rounded-md" alt={item.name} />
            </div>
        )
    }, orderable: false},
    {data: 'type', label: 'Type'},
    {data: 'price', label: 'Price'},
    {data: 'purchase_date', label: 'Purchase Date'},
    {data: 'location', label: 'Location'},
    {data: 'farm.name', label: 'Farm'},
    {   label: 'Action', 
        renderer: (props) => {
            return (<Action {...props} />);
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
            await axios.post(`asset`, { assets: ids, "_method": "DELETE" })
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

function AllAsset() {

    const history = useHistory()
    
    return (
        <Container title="Assets">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-asset')}>Create Asset</Button>
            </SimpleInput>
            <Datatable2 url="asset" columns={columns} isSelectable={true} SelectedAction={SelectedAction} />
        </Container>
    )
}

export default AllAsset
