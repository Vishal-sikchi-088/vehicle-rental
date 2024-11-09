import React, { useState } from "react";
import {Button,  Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setWheels, setType, setModel, 
    setStartDate, setEndDate, nextStep, prevStep, resetForm } from "../redux/formSlice";


const Step2Wheels = () => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const selectedWheels = useSelector((state) => state.form.wheels)

    const handleWheelsChange = (event) => {
        dispatch(setWheels(event.target.value))
    }

    const handleNext = () => {
        setError(!selectedWheels)
        if (selectedWheels) {
            dispatch(nextStep())
        }
    }

    return(
        <div className="m-52 flex justify-center flex-col">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Wheels</FormLabel>
                <RadioGroup
                    value={selectedWheels}
                    onChange={handleWheelsChange}
                    row
                >
                    <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2 wheel"
                    />
                    <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4 wheel"
                    />
                </RadioGroup>
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        Please select a wheel option to proceed.
                    </p>
                )}
            </FormControl>
            <Button disabled='' variant="contained" onClick={handleNext}>
                Next
            </Button>
        </div>
        
    )
}

export default Step2Wheels