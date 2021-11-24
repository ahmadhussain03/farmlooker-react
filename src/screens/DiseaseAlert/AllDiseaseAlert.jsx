import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import axios from '../../utils/axios'
import Datatable2 from '../../components/main/Datatable2'

const Action = ({ item, reload }) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`disease_alert/${item.id}`)
            reload()
           } catch(e){
            throw new Error(e)
           }
    }

    return (
        <div className="flex flex-row space-x-1 items-center justify-center">
            <a onClick={e => handleDelete()} className='border cursor-pointer rounded shadow border-red-600 p-1 text-red-600 delete'>Delete</a>
        </div>
    )
}

const columns = [
    {data: 'animal.animal_id', label: 'Animal ID'},
    {data: 'description', label: 'Description'},
    {data: 'symptoms', label: 'Symptoms'},
    {   label: 'action', 
        renderer: (props) => {
            return (<Action {...props} />)
        }, 
        orderable: false
    }
]

function AllDiseaseAlert() {

    const history = useHistory()

    return (
        <Container title="Disease Alerts">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-disease-alert')}>Create Disease Alert</Button>
            </SimpleInput>
            <Datatable2 url="disease_alert" columns={columns} />
        </Container>
    )
}

export default AllDiseaseAlert
