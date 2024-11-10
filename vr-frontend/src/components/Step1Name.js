import React, { forwardRef, useState, useImperativeHandle, useEffect  } from "react";
import { TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, resetForm } from "../redux/formSlice";


const Step1Name = forwardRef((prop, ref) => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const { step, userName, wheels, type, model, startDate, endDate } = useSelector((state) => state.form)

    useEffect(() => {
        if (userName) {
            const [first, last] = userName.split(' ')
            setFirstName(first || '')
            setLastName(last || '')
        }
    }, [userName])
    
    const handleNext = () => {
        const isFirstNameValid = firstName.trim() !== ''
        const isLastNameValid = lastName.trim() !== ''

        setFirstNameError(!isFirstNameValid)
        setLastNameError(!isLastNameValid)

        if (isFirstNameValid && isLastNameValid) {
            dispatch(setUserName(firstName + ' ' +lastName))
            return true
        }
        return false
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }
   
    return(
        <Box component='form' className="flex justify-center flex-col gap-2">
            <TextField 
                label='First Name' 
                error={firstNameError} 
                required 
                onChange={handleFirstNameChange}
                value={firstName}
                >
            </TextField>
            <TextField  
                label='Last Name' 
                error={lastNameError} 
                required 
                onChange={handleLastNameChange}
                value={lastName}
                >
            </TextField>
        </Box>
    )
})

export default Step1Name