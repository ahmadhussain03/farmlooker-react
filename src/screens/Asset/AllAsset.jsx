import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'

const columnNames = [
    "Type",
    "Price",
    "Purchase Date",
    "Location",
    "Farm",
    "Action"
]

const columns = [
    {data: 'type', name: 'type'},
    {data: 'price', name: 'price'},
    {data: 'purchase_date', name: 'purchase_date'},
    {data: 'location', name: 'location'},
    {data: 'farm.location', name: 'farm.location'},
    {data: 'action', name: 'action', render: () => {
            return "<a href='' class='border rounded shadow border-red-600 p-1 text-red-600'>Delete</a>"
        }
    }
]

function AllAsset() {

    const history = useHistory()

    return (
        <Container title="Assets">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-asset')}>Create Asset</Button>
            </SimpleInput>
            <Datatable url="asset?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllAsset
