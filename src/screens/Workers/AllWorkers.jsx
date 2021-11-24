import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'

const Action = ({ item, reload }) => {

    const history = useHistory()

    const handleEdit = () => {
        history.push(`edit-worker/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`worker/${item.id}`)
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
    {data: 'name', label: 'Name', orderable: false},
    {data: 'phone_no', label: 'Phone No'},
    {data: 'address', label: 'Address'},
    {data: 'pay', label: 'Pay'},
    {data: 'id_or_passport', label: 'ID/Passport'},
    {data: 'joining_date', label: 'Joining Date'},
    {data: 'duty', label: 'Duty'},
    {data: 'farm.name', label: 'Farm'},
    {   label: 'Action', 
        renderer: (props) => {
            return (<Action {...props} />)
        }, 
        orderable: false
    }
]

function AllWorkers() {

    const history = useHistory()

    return (
        <Container title="Workers">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-worker')}>Create Worker</Button>
            </SimpleInput>
            <Datatable2 url="worker" columns={columns} />
        </Container>
    )
}

export default AllWorkers
