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
        history.push(`edit-manager/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`manager/${item.id}`)
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


const SelectedAction = ({ selectedItems, reload }) => {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {

            setLoading(true)
            const ids = selectedItems.map(item => item.id)
            await axios.post(`manager`, { managers: ids, "_method": "DELETE" })
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

const columns = [
    {data: 'first_name', label: 'First Name'},
    {data: 'last_name', label: 'Last Name'},
    {data: 'email', label: 'Email'},
    {data: 'phone_no', label: 'Phone No'},
    {data: 'farm.name', label: 'Farm'},
    {   label: 'Action', 
        renderer: (props) => {
            return (<Action {...props} />)
        }, 
        orderable: false
    }
]

function AllManagers() {

    const history = useHistory()

    return (
        <Container title="Managers">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-manager')}>Create Manager</Button>
            </SimpleInput>
            <Datatable2 url="manager" columns={columns} isSelectable={true} SelectedAction={SelectedAction} />
        </Container>
    )
}

export default AllManagers
