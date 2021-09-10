import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import ListContainer from './../../components/main/list/ListContainer';
import axios from '../../utils/axios'
import CardItem from '../../components/main/list/TradingCardItem';
import { useState } from 'react';
import { useCallback } from 'react'
import { useEffect } from 'react'

const HomeTradingAnimal = () => {

    const history = useHistory();

    const [tradingAnimals, setTradingAnimals] = useState([])

    const getTradingAnimals = useCallback(async () => {
        let response = await axios.get("home/trading_animal")
        console.log(response.data.data.data)
        setTradingAnimals(response.data.data.data)
    }, [])

    useEffect(() => {
        getTradingAnimals()
    }, [getTradingAnimals])

    return (
        <Container title="All Trading Animals">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('my-trading-animal')}>My Trading Animal</Button>
            </SimpleInput>
            <ListContainer>
                {tradingAnimals.map(animal => (
                    <CardItem 
                    key={animal.id} 
                    image={animal.image} 
                    location={animal.location} 
                    username={animal.user.fullName}
                    dated={animal.dated}
                    price={animal.price}
                    dob={animal.dob}
                    type={animal.type}
                    phone={animal.phone}
                    />
                ))}
            </ListContainer>
        </Container>
    )
}

export default HomeTradingAnimal
