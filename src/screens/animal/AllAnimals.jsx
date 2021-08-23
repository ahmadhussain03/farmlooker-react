import React, { useEffect, useCallback, useState } from 'react'

import axios from '../../utils/axios'
import { prepareDataForListing } from '../../utils/helper'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import ListItem from '../../components/main/list/ListItem'
import ListContainer from '../../components/main/list/ListContainer'
import SimpleInput from '../../components/main/form/SimpleInput'
import { useHistory } from 'react-router-dom'

const dataTransformer = {
    farm: (value) => {
        return value.location
    }
}

const ignoreFields = ['female_breeder_id', 'male_breeder_id', 'farm_id']

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
            {(animals && animals?.length > 0) &&
               ( <ListContainer >
                    {animals.map(animal => (
                        <ListItem deleteEndpoint='animal' itemDeleted={handleItemDeleted} key={animal.id} data={animal} title="animal_id" renderItem={(field, value) => prepareDataForListing(field, value, ignoreFields, true, dataTransformer)}></ListItem>
                    ))}
                </ListContainer>)
            }
        </Container>
    )
}

export default AllAnimals
