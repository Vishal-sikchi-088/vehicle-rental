import React, { useState, forwardRef, useImperativeHandle } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDispatch, useSelector } from "react-redux";
import {  setStartDate, setEndDate } from "../redux/formSlice";
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

const Step5Booking = forwardRef((props, ref) => {
    const { startDate , endDate } = useSelector((state) => state.form)
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const [startDateError, setStartDateError] = useState(false)
    const [endDateError, setEndDateError] = useState(false)

    // Get the current date and next day for validation
    const currentDate = dayjs().startOf('day')
    const nextDay = currentDate.add(1, 'day')

    if(!startDate) {
        dispatch(setStartDate(currentDate))
        dispatch(setEndDate(nextDay))
    }

    const handleNext = () => {
        const isStartDateValid = dayjs(startDate).isValid()
        const isEndDateValid = dayjs(endDate).isValid()

        setStartDateError(!isStartDateValid)
        setEndDateError(!isEndDateValid)

        if (!isStartDateValid) {
            enqueueSnackbar("Please select a valid start date.", { variant: "error" })
        }
        if (!isEndDateValid) {
            enqueueSnackbar("Please select a valid end date.", { variant: "error" })
        }

        return isStartDateValid && isEndDateValid 
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    const handleStartDateChange = (newValue) => {
        if (dayjs(newValue).isValid()) {
            dispatch(setStartDate(newValue))
            enqueueSnackbar("Start date selected.", { variant: "success" })
        } else {
            enqueueSnackbar("Invalid start date.", { variant: "error" })
        }
    };

    const handleEndDateChange = (newValue) => {
        if (dayjs(newValue).isValid()) {
            dispatch(setEndDate(newValue));
            enqueueSnackbar("End date selected.", { variant: "success" })
        } else {
            enqueueSnackbar("Invalid end date.", { variant: "error" })
        }
    };

    return (
        <div>
            <label className="flex mb-6">Select the Start date and End date.</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex gap-4">
                    <DatePicker
                        label="Start Date"
                        value={startDate ? dayjs(startDate): null}
                        onChange={handleStartDateChange}
                        disablePast
                        slotProps={{
                            textField: { helperText: startDateError ? "Start date is required." : "" },
                        }}
                    />
                    <DatePicker
                        label="End Date"
                        value={endDate ? dayjs(endDate): null}
                        onChange={handleEndDateChange}
                        minDate={startDate ? startDate.add(1,'day'): null}
                        disablePast
                        slotProps={{
                            textField: { helperText: endDateError ? "Start date is required." : "" },
                        }}
                    />
                </div>
            </LocalizationProvider>
        </div>
    )
})

export default Step5Booking
