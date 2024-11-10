import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setEndDate, setStartDate, setModel, setModelName } from "../redux/formSlice";
import { getVehicleModel } from "../services/apiServices";


const Step4Model = forwardRef((prop, ref) => {

    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    let [ vechileModels, setVehicleModels ] = useState([])
    const { type, model } = useSelector((state) => state.form)
    const selectedVehicleModel = model

    useEffect(() => {
        const fetchVehicleModel = async () =>{
            let vehicleModel = await getVehicleModel(type)
            vehicleModel = vehicleModel.filter((model) => model.type_id == type)
            console.log(vehicleModel)
            setVehicleModels(vehicleModel)
        }
        fetchVehicleModel()
    }, [])

    const handleNext = () => {
        setError(!selectedVehicleModel)
        if (selectedVehicleModel) {
            return true
        }
        return false
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    const handleModelChange = (event) => {
        const selectedId = event.target.value
        const selectedVehicleModel = vechileModels.find((model) => model.id == selectedId)
    
        dispatch(setModel(selectedId))
        dispatch(setModelName(selectedVehicleModel?.name || ''))
        dispatch(setStartDate(''))
        dispatch(setEndDate(''))
    }

    return (
        <div className="flex justify-center flex-col">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Model of vehicle</FormLabel>
                <RadioGroup
                    value={selectedVehicleModel}
                    onChange={handleModelChange}
                    
                >
                    {vechileModels.map((vehicleModel) => {
                        return (<FormControlLabel
                            key={vehicleModel.id}
                            value={vehicleModel.id}
                            control={<Radio />}
                            label={vehicleModel.name}
                        />)
                    })}
                    
                </RadioGroup>
                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        Please select a vehicle model option to proceed.
                    </p>
                )}
            </FormControl>
        </div>
    )
})

export default Step4Model
