import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/auth/form/Button'
import Form from '../../components/main/form/Form'
import Input from '../../components/main/form/Input'
import Select from '../../components/main/form/Select'
import { FormGroup } from '../../components/main/form/Form'

import axios, { apiUrl } from '../../utils/axios'

const sexOptions = [
    {value: 'male', text: 'Male'},
    {value: 'female', text: 'Female'},
];

const addAsOptions = [
    {value: 'purchased', text: 'Purchased'},
    {value: 'calved', text: 'Calved'},
];

const diseaseOptions = [
    {value: 'sick', text: 'Sick'},
    {value: 'healthy', text: 'Healthy'},
];

const typeOptions = [
    {value: 'pig', text: 'Pig'},
    {value: 'cattle', text: 'Cattle'},
    {value: 'goat', text: 'Goat'},
    {value: 'sheep', text: 'Sheep'},
];

const breedOptions = {
    pig: [
        "Pig Breed","Red Wattle","Mukota","Mora Romagnola","Poland China", "Large White", "Ossabaw Island", "Spotted", "Lacombe",
            "Thuoc Nhieu", "Norwegian Landrace","French Landrace","Swallow Belied Mangalitza","Cantonese Pig","Mulefoot","Krskopolje", "Minzhu", "Mangalitza",
            "Gloucestershire Old Spots","British Landrace","Bantu","Philippine Native","Chester White","Welsh","Wuzhishan","Lithuanian Native","Saddleback",
            "German Landrace","Tamworth","Belgian Landrace","Iberian","Hereford","Beijing Black","Large Black","Fengjing","Guinea Hog","Mong Cai","Meishan",
            "Jinhua","American Landrace","Hezuo","Duroc","Danish Landrace","Turopolje","Neijiang","Oxford Sandy and Black","Swedish Landrace","Bulgarian White",
            "Middle White", "Italian Landrace","Belarus Black Pied","Czech Improved White","American Yorkshire","Large Black-white","Ba Xuyen","Choctaw Hog",
            "Hampshire","British Lop" ,"Vietnamese Potbelly","Berkshire","Kunekune","Pietrain","Dutch Landrace","Ningxiang","Kele","Tibetan","Arapawa Island",
            "Yorkshire", "Finnish Landrace","Angeln saddleback", "Other"
    ],
    goat: [
        "Goat Breed","Angora", "Boer","LaMancha","Nubian" ,"Oberhasli" ,"Saanen","Toggenburg","Other"
    ],
    cattle: [
        "Cattle Breed","Afrikaner Cattle", "Angus Beef/Aberdeen Angus", "Ankole Cattle", "Beefmaster Cattle","Bonsmara Cattle",
            "Boran Cattle","Brahman Cattle", "Braunvieh Cattle", "Charolais Cattle", "Drakensberger Cattle","Hereford Cattle","Limousin Cattle",
            "Nguni Cattle","Santa Gertrudis Cattle","Shorthorn Cattle","Simbra Cattle","Simmentaler Cattle", "Sussex Cattle","Tuli Cattle","Wagyu Beef","Other"
    ],
    sheep: [
        "Other"
    ]
};

const CreateAnimal = ({ user }) => {

    const [animalId, setAnimalId] = useState("")
    const [type, setType] = useState("")
    const [breed, setBreed] = useState("")
    const [herd, setHerd] = useState("")
    const [addAs, setAddAs] = useState("")
    const [male, setMale] = useState("")
    const [female, setFemale] = useState("")
    const [sex, setSex] = useState("")
    const [dob, setDob] = useState("")
    const [purchaseDate, setPurchaseDate] = useState("")
    const [disease, setDisease] = useState("")
    const [price, setPrice] = useState("")
    const [previousOwner, setPreviousOwner] = useState("")
    const [farm, setFarm] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    
    const handleAnimalIdChange = e => {
        setAnimalId(e.target.value)
        clearErrorMessage('animal_id')
    }

    const handleTypeChange = e => {
        setType(e)
        setBreed(null)
        setMale(null)
        setFemale(null)
        clearErrorMessage('type')
    }

    const handleHerdChange = e => {
        setHerd(e)
        clearErrorMessage('herd_id')
    }

    const handleDobChange = e => {
        setDob(e.target.value)
        clearErrorMessage('dob')
    }

    const handleSexChange = e => {
        setSex(e)
        clearErrorMessage('sex')
    }

    const handleBreedChange = e => {
        setBreed(e)
        clearErrorMessage('breed')
    }

    const handleAddAsChange = e => {
        setAddAs(e)
        clearErrorMessage('add_as')
    }

    const handleMaleChange = e => {
        setMale(e)
        clearErrorMessage('male_breeder_id')
    }
    
    const handleFemaleChange = e => {
        setFemale(e)
        clearErrorMessage('female_breeder_id')
    }

    const handlePurchaseDateChange = e => {
        setPurchaseDate(e.target.value)
        clearErrorMessage('purchase_date')
    }

    const handleDiseaseChange = e => {
        setDisease(e)
        clearErrorMessage('disease')
    }

    const handlePriceChange = e => {
        setPrice(e.target.value)
        clearErrorMessage('price')
    }

    const handlePreviousOwnerChange = e => {
        setPreviousOwner(e.target.value)
        clearErrorMessage('previous_owner')
    }

    const handleFarmIdChange = e => {
        setFarm(e)
        clearErrorMessage('farm_id')
    }

    const clearErrorMessage = (field = null) => {
        if(errors && errors.message){
            errors.message = ""
        }

        if(errors?.data?.[field]){
            delete errors.data[field]
        }

        setErrors(errors)
    }

    const handleCreateAnimal = async (e) => {
        e.preventDefault()
        
        setIsLoading(true)
        try {
            const response = await axios.post("animal", {
                animal_id: animalId,
                type_id: type?.value,
                breed_id: breed?.value,
                add_as: addAs.value,
                sex: sex.value,
                dob,
                disease: disease.value,
                purchase_date: purchaseDate,
                price: price ?? null,
                previous_owner: previousOwner ?? null,
                farm_id: farm?.value,
                male_breeder_id: male?.value ?? null,
                female_breeder_id: female?.value ?? null,
                herd_id: herd?.value ?? null
            })

            setIsLoading(false);
            history.push('/dashboard/animal')
        } catch(e) {
            setIsLoading(false);
            console.log(e)
            setErrors(e.response.data)
        }
    }


    return (
        <Form onSubmit={handleCreateAnimal} formHeading="Add Animal" errors={errors}>
            <FormGroup>
                <Input error={errors?.data?.animal_id} value={animalId} onChange={handleAnimalIdChange} type="text" placeholder="Animal ID"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.type_id} value={type} onChange={handleTypeChange} placeholder="Type" url={`${apiUrl}/types`} mapOptions={options => options.map(option => ({ value: option.id, label: option.type }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.breed_id} value={breed} onChange={handleBreedChange} placeholder="Breed" url={`${apiUrl}/breeds/${type.value}`} mapOptions={options => options.map(option => ({ value: option.id, label: option.breed }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.add_as} value={addAs} onChange={handleAddAsChange} placeholder="Add As" options={addAsOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.sex} value={sex} onChange={handleSexChange} placeholder="Sex" options={sexOptions}></Select>
            </FormGroup>
            <FormGroup>
                <Input error={errors?.data?.dob} value={dob} onChange={handleDobChange} type="date" placeholder="DOB"  />
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.disease} value={disease} onChange={handleDiseaseChange} placeholder="Disease" options={diseaseOptions}></Select>
            </FormGroup>
            {addAs && addAs.value === 'purchased' && (
                <>
                    <FormGroup>
                        <Input error={errors?.data?.purchase_date} value={purchaseDate} onChange={handlePurchaseDateChange} type="date" placeholder="Purchase Date"  />
                    </FormGroup>
                    <FormGroup>
                        <Input error={errors?.data?.price} value={price} onChange={handlePriceChange} type="text" placeholder="Price"  />
                    </FormGroup>
                    <FormGroup>
                        <Input error={errors?.data?.previous_owner} value={previousOwner} onChange={handlePreviousOwnerChange} type="text" placeholder="Previous Owner"  />
                    </FormGroup>
                </>
            )}
            {addAs && addAs.value === 'calved' && (
                <>
                    <FormGroup>
                        <Select error={errors?.data?.male_breeder_id} value={male} onChange={handleMaleChange} placeholder="Male Breeder" url="animal" params={{ sex: 'male', type: type.value }} mapOptions={options => options.map(option => ({ value: option.id, label: option.animal_id }))} async={true}></Select>
                    </FormGroup>
                    <FormGroup>
                        <Select error={errors?.data?.female_breeder_id} value={female} onChange={handleFemaleChange} placeholder="Female Breeder" url="animal" params={{ sex: 'female', type: type.value }} mapOptions={options => options.map(option => ({ value: option.id, label: option.animal_id }))} async={true}></Select>
                    </FormGroup>
                </>
            )}
            <FormGroup>
                <Select error={errors?.data?.farm_id} value={farm} onChange={handleFarmIdChange} placeholder="Farm" url='farm' mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Select error={errors?.data?.herd_id} value={herd} onChange={handleHerdChange} placeholder="Herd" url={`herd`} params={{farm: farm?.value ?? 0}} mapOptions={options => options.map(option => ({ value: option.id, label: option.name }))} async={true}></Select>
            </FormGroup>
            <FormGroup>
                <Button disabled={isLoading} type="submit">Create Animal</Button>  
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    };
};

export default connect(mapStateToProps)(CreateAnimal)