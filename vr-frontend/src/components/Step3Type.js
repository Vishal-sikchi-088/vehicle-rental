import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setType, setModel, setTypeName } from "../redux/formSlice";
import { getVehicleTypes } from "../services/apiServices";
import { useSnackbar } from 'notistack';


const Step3Type = forwardRef((prop, ref) => {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
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
        const hasError = !selectedVehicleType;
        setError(hasError);
        if (hasError) {
            enqueueSnackbar("Please select a vehicle type to proceed.", { variant: "error" });
            return false;
        }
        return true;
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    const handleTypeChange = (event) => {
        const selectedId = event.target.value
        const selectedVehicleType = vechileTypes.find((type) => type.id == selectedId)

        dispatch(setType(selectedId))
        dispatch(setTypeName(selectedVehicleType?.name || ''))
        dispatch(setModel(''))
    }

    return (
        <div className="flex justify-center flex-col">
            <FormControl component="fieldset">
                <FormLabel component="legend">Select the type of vehicle.</FormLabel>
                <RadioGroup
                    value={selectedVehicleType}
                    onChange={handleTypeChange}
                    
                >
                    {vechileTypes.map((vehicleType) => {
                        return (<FormControlLabel key={vehicleType.id}
                            value={vehicleType.id}
                            control={<Radio />}
                            label={vehicleType.name}
                        />)
                    })}
                    
                </RadioGroup>
            </FormControl>
        </div>
    )
})

export default Step3Type
