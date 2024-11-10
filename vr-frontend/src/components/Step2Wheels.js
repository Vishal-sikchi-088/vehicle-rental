import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setWheels, resetForm, setType } from "../redux/formSlice";


const Step2Wheels = forwardRef((prop, ref) => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const selectedWheels = useSelector((state) => state.form.wheels)

    const handleWheelsChange = (event) => {
        dispatch(setWheels(event.target.value))
        dispatch(setType(''))
    }

    const handleNext = () => {
        setError(!selectedWheels)
        if (selectedWheels) {
            return true
        }
        return false
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    return(
        <div className="flex justify-center flex-col">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select type of vehicle</FormLabel>
                <RadioGroup
                    value={selectedWheels}
                    onChange={handleWheelsChange}
                    row
                >
                    <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Bike"
                    />
                    <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Car"
                    />
                </RadioGroup>
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        Please select a wheel option to proceed.
                    </p>
                )}
            </FormControl>
        </div>
        
    )
})

export default Step2Wheels