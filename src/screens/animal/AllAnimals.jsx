import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../../utils/axios'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Animal ID",
    "Animal Type",
    "Animal Breed",
    "Disease",
    "Sex",
    "DOB",
    "Add As",
    "Farm"
]

const columns = [
    {data: 'animal_id', name: 'animal_id'},
    {data: 'type', name: 'type'},
    {data: 'breed', name: 'breed'},
    {data: 'disease', name: 'disease'},
    {data: 'sex', name: 'sex'},
    {data: 'dob', name: 'dob'},
    {data: 'add_as', name: 'add_as'},
    {data: 'farm.location', name: 'farm.location'}
]

function AllAnimals() {

    const [animals, setAnimals] = useState([])
    const history = useHistory()

    const getAnimals = useCallback(async () => {
        let response = await axios.get('animal')
        setAnimals(response.data.data.data)
      }, [])

    useEffect(() => {
        getAnimals()
    }, [getAnimals])

    const handleItemDeleted = (item) => {
        console.log(item)
        getAnimals()
    }

    return (
        <Container title="Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-animal')}>Create Animal</Button>
            </SimpleInput>
            <Datatable url="animal?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllAnimals
