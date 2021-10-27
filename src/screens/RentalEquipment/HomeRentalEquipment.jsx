import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'

import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Button from '../../components/auth/form/Button'
import ListContainer from '../../components/main/list/ListContainer'
import CardItem from '../../components/main/list/RentalCardItem';
import axios from '../../utils/axios'



const HomeRentalEquipment = () => {
    const history = useHistory()
    const [rentalEquipments, setRentalEquipments] = useState([])

    const getRentalEquipments = useCallback(async () => {
        let response = await axios.get("home/rental_equipment")
        console.log(response.data.data.data)
        setRentalEquipments(response.data.data.data)
    }, [])

    useEffect(() => {
        getRentalEquipments()
    }, [getRentalEquipments])

    return (
        <Container title="All Rental Equipment">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('my-rental-equipment')}>My Rental Equipment</Button>
            </SimpleInput>
            <ListContainer>
                {rentalEquipments.map(equipment => (
                    <CardItem 
                    key={equipment.id} 
                    name={equipment.name}
                    model={equipment.model}
                    location={equipment.location}
                    rent={equipment.rent}
                    images={equipment.images}
                    username={equipment.user.fullName}
                    dated={equipment.dated}
                    phone={equipment.phone}
                    />
                ))}
            </ListContainer>
        </Container>
    )
}

export default HomeRentalEquipment
