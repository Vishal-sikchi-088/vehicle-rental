import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setWheels, setType, setModel, 
    setStartDate, setEndDate, nextStep, prevStep, resetForm } from "../redux/formSlice";
import Step1Name from "./Step1Name";
import Step2Wheels from "./Step2Wheels";

const MultiStepForm = () => {
    const dispatch = useDispatch()
    const { step, userName, wheels, type, model, startDate, endDate } = useSelector((state) => state.form)

    const renderStep = () => {
        switch(step) {
            case 1: return (<Step1Name/>)
            case 2: return (<Step2Wheels/>)
        }
    }

    return (
        <div> 
            {renderStep()}
        </div>
    )
        }

export default MultiStepForm