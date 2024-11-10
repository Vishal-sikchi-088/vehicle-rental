import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setType, resetForm, setModel } from "../redux/formSlice";
import { getVehicleTypes } from "../services/apiServices";


const Step3Type = forwardRef((prop, ref) => {

    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    let [ vechileTypes, setVehicleTypes ] = useState([])
    const { wheels, type } = useSelector((state) => state.form)
    const selectedVehicleType = type

    useEffect(() => {
        const fetchVehicleTpe = async () =>{
            let vehicleType = await getVehicleTypes()
            vehicleType = vehicleType.filter((type) => type.wheels == wheels)
            setVehicleTypes(vehicleType)
        }
        fetchVehicleTpe()
    }, [])

    const handleNext = () => {
        setError(!selectedVehicleType)
        if (selectedVehicleType) {
            return true
        }
        return false
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    const handleTypeChange = (event) => {
        dispatch(setType(event.target.value))
        dispatch(setModel(''))
    }

    return (
        <div className="flex justify-center flex-col">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select type of vehicle</FormLabel>
                <RadioGroup
                    value={selectedVehicleType}
                    onChange={handleTypeChange}
                    
                >
                    {vechileTypes.map((vehicleType) => {
                        return (<FormControlLabel
                            value={vehicleType.id}
                            control={<Radio />}
                            label={vehicleType.name}
                        />)
                    })}
                    
                </RadioGroup>
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        Please select a type option to proceed.
                    </p>
                )}
            </FormControl>
        </div>
    )
})

export default Step3Type
