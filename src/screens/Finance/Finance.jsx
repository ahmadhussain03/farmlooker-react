import React from 'react'
import { useHistory } from 'react-router'
import Container from '../../components/main/Container'

const Finance = () => {

    const history = useHistory()

    return (
        <Container title={"Finance"}>
            <div className="flex flex-row items-center justify-between space-x-1 w-full">
                <div className="w-1/2 text-center md:text-5xl text-3xl rounded-lg text-green-700 bg-green-200 py-8 shadow-md cursor-pointer"
                    onClick={() => {
                        history.push('create-income')
                    }}
                >
                    Income
                </div>
                <div className="w-1/2 text-center md:text-5xl text-3xl rounded-lg text-red-700 bg-red-200 py-8 shadow-md cursor-pointer"
                    onClick={() => {
                        history.push('create-expense')
                    }}
                >
                    Expense
                </div>
            </div>
        </Container>
    )
}

export default Finance
