import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setWheels, setType, setModel, 
    setStartDate, setEndDate, nextStep, prevStep, resetForm } from "../redux/formSlice";
import Step1Name from "./Step1Name";
import Step2Wheels from "./Step2Wheels";
import { Button } from "@mui/material";

const MultiStepForm = () => {
    const step1NameRef = useRef()
    const dispatch = useDispatch()
    const { step, userName, wheels, type, model, startDate, endDate } = useSelector((state) => state.form)

    const handleNextStep = () => {
        if (step1NameRef.current) {
            const isValid = step1NameRef.current.handleNext()
            if (isValid) {
                dispatch(nextStep());
            }
        }
    }

    const handleBackStep = () => {
        dispatch(prevStep())
    }

    const renderStep = () => {
        switch(step) {
            case 1: return (<Step1Name ref={step1NameRef}/>)
            case 2: return (<Step2Wheels onNext={handleNextStep} />)
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