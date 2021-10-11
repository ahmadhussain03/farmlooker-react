import React from 'react'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import Datatable from '../../components/main/Datatable'
import { useHistory } from 'react-router-dom';

const columnNames = [
    "Name",
    "City",
    "Area In Hector"
]

const columns = [
    {data: 'name', name: 'name'},
    {data: 'city.name', name: 'city.name'},
    {data: 'area_of_hector', name: 'area_of_hector'},
]

function AllFarms() {

    const history = useHistory()

    return (
        <Container title="Farms">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-farm')}>Create Farm</Button>
            </SimpleInput>
            <Datatable listeners={[]} url="farm?client=datatable" columns={columns} columnNames={columnNames} />
        </Container>
    )
}

export default AllFarms
