import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setWheels, setType, setModel, 
    setStartDate, setEndDate, nextStep, prevStep, resetForm } from "../redux/formSlice";


const Step1Name = () => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const { step, userName, wheels, type, model, startDate, endDate } = useSelector((state) => state.form)
    
    const handleNext = () => {
         // Set error states if fields are empty
         setFirstNameError(!firstName.trim());
         setLastNameError(!lastName.trim());
        if (firstName.trim() && lastName.trim()) {
            dispatch(setUserName(firstName + ' ' +lastName))
            dispatch(nextStep())
        }
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }
   
    return(
        <Box component='form' className="m-52 flex justify-center flex-col gap-2">
            <TextField label='First Name' error={firstNameError} required onChange={handleFirstNameChange}>
            </TextField>
            <TextField  label='Last Name' error={lastNameError} required onChange={handleLastNameChange}>
            </TextField>
            <Button disabled='' variant="contained" onClick={handleNext}>
                Next
            </Button>
        </Box>
    )
}

export default Step1Name