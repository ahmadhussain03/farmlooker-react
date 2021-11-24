import React from 'react'

import Button from '../../components/auth/form/Button'
import Container from '../../components/main/Container'
import SimpleInput from '../../components/main/form/SimpleInput'
import { useHistory } from 'react-router-dom';
import Datatable2 from '../../components/main/Datatable2'

const columns = [
    {data: 'name', label: 'Name'},
    {data: 'city.name', label: 'City'},
    {data: 'area_of_hector', label: 'Hectare'}
]

function AllFarms() {

    const history = useHistory()

    return (
        <Container title="Farms">
            <SimpleInput icon placeholder="Search">
                <Button onClick={() => history.push('create-farm')}>Create Farm</Button>
            </SimpleInput>
            <Datatable2 url="farm" columns={columns} />
        </Container>
    )
}

export default AllFarms
