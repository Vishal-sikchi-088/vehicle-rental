import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, resetForm } from "../redux/formSlice";
import Step1Name from "./Step1Name";
import Step2Wheels from "./Step2Wheels";
import { Button } from "@mui/material";
import Step3Type from "./Step3Type";
import Step4Model from "./Step4Model";
import Step5Booking from "./Step5Booking";
import { createBooking } from "../services/apiServices";
import SummaryReport from "./summaryReport";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useSnackbar } from 'notistack';

const MultiStepForm = () => {
    const refs = useRef({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
        // Add more steps as needed
    })

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const { step, userName, model, startDate, endDate } = useSelector((state) => state.form)

    const handleNextStep = () => {
        const stepRef = refs.current[step]
        if (stepRef) {
            const isValid = stepRef.handleNext()
            if (isValid && step<5) {
                enqueueSnackbar("Saved :)", { variant: "success" })
                dispatch(nextStep())
            }
            if (isValid && step == 5) {
                bookVechile()
            }    
        }
    }

    const bookVechile = async () => {
        const bookingData = {
            user_name: userName,
            vehicle_model_id: model,
            start_date: startDate,
            end_date: endDate
        }
        const response = await createBooking(bookingData)
        if(response.error) {
            enqueueSnackbar(response.error, { variant: 'error', className: 'snackbar-error' })
        } else {
            if(response.bookingStatus) {
                enqueueSnackbar("Booking done", { variant: "success" })
                dispatch(nextStep())
            } else {
                enqueueSnackbar(response.message, { variant: 'error', className: 'snackbar-error' })
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
            case 4: return (<Step4Model ref={(el) => refs.current[4] = el}/>)
            case 5: return (<Step5Booking ref={(el) => refs.current[5] = el}/>)
            case 6: return(<SummaryReport/>)
        }
    }

    return (
        <div className="container mx-auto flex justify-center items-center">
            <div className={`w-full max-w-lg h-[${step === 6 ? 550 : 400}px] bg-transparent border-2 border-gray-400 p-4 px-8 rounded-lg shadow-xl shadow-gray-600 relative flex flex-col justify-between`}>
               
                <div className="flex justify-between items-center mb-4">
                    { step !== 6 && <h2 className="text-2xl font-semibold text-gray-800">Step {step}</h2>}
                    { step !== 6 && step !== 1 && 
                        <Button variant="outlined" onClick={() => dispatch(resetForm())} color="secondary">
                            Reset
                        </Button>
                    }
                </div> 
                    

                {
                    step === 6 && (
                        <div className="flex justify-center items-center text-xl text-black">
                            <CheckCircleTwoToneIcon sx={{ fontSize: 'inherit', color: 'green' }} />
                            <span className="ml-2">Booking done!!</span>
                        </div>
                    )

                } 
                
                <div className="mb-6">{renderStep()}</div>

                <div className="flex  justify-end gap-2 mt-auto">
                    {(step > 1 && step < 6) && (
                        <Button variant="outlined" onClick={handleBackStep} color="primary">
                            Back
                        </Button>
                    )}
                    {step < 5 && (
                        <Button variant="contained" onClick={handleNextStep} color="primary">
                            Next
                        </Button>
                    )}
                    {step == 5 && (
                        <Button variant="contained" onClick={handleNextStep} color="primary">
                            Book
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MultiStepForm