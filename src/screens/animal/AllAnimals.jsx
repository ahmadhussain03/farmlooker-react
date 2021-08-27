import React, { useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../../utils/axios'
import { prepareDataForListing } from '../../utils/helper'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import ListItem from '../../components/main/list/ListItem'
import ListContainer from '../../components/main/list/ListContainer'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

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
            <Datatable />
        </Container>
    )
}

export default AllAnimals
