import React, {useState, useCallback, useEffect} from 'react'

import axios from '../../utils/axios'
import { prepareDataForListing } from '../../utils/helper'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import ListItem from '../../components/main/list/ListItem'
import ListContainer from '../../components/main/list/ListContainer'
import SimpleInput from '../../components/main/form/SimpleInput'
import { useHistory } from 'react-router-dom'

const dataTransformer = {
    animal: (value) => {
        return value.animal_id
    }
}

const ignoreFields = ['animal_id', 'user_id']

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
            {(vaccineRecords && vaccineRecords?.length > 0) &&
               ( <ListContainer >
                    {vaccineRecords.map(record => (
                        <ListItem deleteEndpoint='vaccine_record' itemDeleted={handleItemDeleted} key={record.id} data={record} title="name" renderItem={(field, value) => prepareDataForListing(field, value, ignoreFields, true, dataTransformer)}></ListItem>
                    ))}
                </ListContainer>)
            }
        </Container>
    )
}

export default AllVaccineRecord
