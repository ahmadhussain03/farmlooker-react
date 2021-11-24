import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'

const columns = [
    {data: 'certificate_image', label: 'Certificate Image', renderer: ({item}) => {
        return (
            <div className="flex items-center justify-center">
                <img src={item.certificate_image} className="w-16 h-16 object-cover object-center border border-gray-700 p-1 rounded-md" alt={item.name} />
            </div>
        )
    }, orderable: false},
    {data: 'animal.animal_id', label: 'Animal ID'},
    {data: 'name', label: 'Name'},
    {data: 'reason', label: 'Reason'},
    {data: 'date', label: 'Date'},
    {   label: 'action', 
        renderer: (props) => {
            return (<Action {...props} />)
        }, 
        orderable: false
    }
]

const Action = ({ item, reload }) => {

    const history = useHistory()

    const handleEdit = () => {
        history.push(`edit-vaccine-record/${item.id}`)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`vaccine_record/${item.id}`)
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

function AllVaccineRecord() {
    const history = useHistory()

    return (
        <Container title="Vaccine Records">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-vaccine-record')}>Create Record</Button>
            </SimpleInput>
            <Datatable2 url="vaccine_record" columns={columns} />
        </Container>
    )
}

export default AllVaccineRecord
