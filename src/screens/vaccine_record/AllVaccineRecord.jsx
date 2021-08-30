import React, {useState, useCallback, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../../utils/axios'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Animal ID",
    "Name",
    "Reason",
    "Date"
]

const columns = [
    {data: 'animal_id', name: 'animals.animal_id'},
    {data: 'name', name: 'name'},
    {data: 'reason', name: 'reason'},
    {data: 'date', name: 'date'},
]

function AllVaccineRecord() {
    const [vaccineRecords, setVaccineRecords] = useState([])
    const history = useHistory()

    const getVaccineRecords = useCallback(async () => {
        let response = await axios.get('vaccine_record')
        setVaccineRecords(response.data.data.data)
    }, [])

    useEffect(() => {
        getVaccineRecords()
    }, [getVaccineRecords])

    const handleItemDeleted = (item) => {
        getVaccineRecords()
    }

    return (
        <Container title="Vaccine Records">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-vaccine-record')}>Create Record</Button>
            </SimpleInput>
            <Datatable url="vaccine_record?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllVaccineRecord
