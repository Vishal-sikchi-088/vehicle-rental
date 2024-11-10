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
        <div className="flex justify-center flex-col p-2">
            <FormControl component="fieldset" className="w-full max-w-md">
                <FormLabel component="legend" className="text-lg font-medium mb-4 text-gray-700">What kind of vehicle you need?</FormLabel>
                <RadioGroup
                    value={selectedWheels}
                    onChange={handleWheelsChange}
                >
                    <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Bike"
                        className="text-gray-600"
                    />
                    <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Car"
                        className="text-gray-600"
                    />
                </RadioGroup>
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        *Please select a wheel option to proceed.
                    </p>
                )}
            </FormControl>
        </div>
        
    )
})

export default Step2Wheels