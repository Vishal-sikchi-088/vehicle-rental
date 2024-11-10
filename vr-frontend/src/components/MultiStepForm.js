import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setWheels, setType, setModel, 
    setStartDate, setEndDate, nextStep, prevStep, resetForm } from "../redux/formSlice";
import Step1Name from "./Step1Name";
import Step2Wheels from "./Step2Wheels";
import { Button } from "@mui/material";
import Step3Type from "./Step3Type";

const MultiStepForm = () => {
    const refs = useRef({
        1: null,
        2: null,
        3: null
        // Add more steps as needed
    })

    const dispatch = useDispatch()
    const { step, userName, wheels, type, model, startDate, endDate } = useSelector((state) => state.form)

    const handleNextStep = () => {
        const stepRef = refs.current[step]
        if (stepRef) {
            const isValid = stepRef.handleNext()
            if (isValid) {
                dispatch(nextStep())
            }
        }
    }

    const handleBackStep = () => {
        dispatch(prevStep())
    }

    const renderStep = () => {
        switch(step) {
            case 1: return (<Step1Name ref={(el) => refs.current[1] = el}/>)
            case 2: return (<Step2Wheels ref={(el) => refs.current[2] = el}/>)
            case 3: return (<Step3Type ref={(el) => refs.current[3] = el}/>)
        }
    }

    return (
        <div className="container mx-auto flex justify-center items-center">
            <div className="w-full max-w-lg bg-gray-200 p-8 rounded-lg shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Step {step}</h2>
                    <Button variant="text" onClick={() => dispatch(resetForm())} color="secondary">
                        Reset
                    </Button>
                </div>
                
                <div className="mb-6">{renderStep()}</div>

                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <Button variant="outlined" onClick={handleBackStep} color="primary">
                            Back
                        </Button>
                    )}
                    {step < 5 && (
                        <Button variant="contained" onClick={handleNextStep} color="primary">
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
        }

export default MultiStepForm