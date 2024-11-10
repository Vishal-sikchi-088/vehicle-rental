import React, { useState, forwardRef, useImperativeHandle } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDispatch, useSelector } from "react-redux";
import {  setStartDate, setEndDate,  resetForm } from "../redux/formSlice";
import dayjs from 'dayjs';

const Step5Booking = forwardRef((props, ref) => {
    const { startDate , endDate } = useSelector((state) => state.form)
    const dispatch = useDispatch()
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
        const isStartDateValid = dayjs(startDate).isValid();
        const isEndDateValid = dayjs(endDate).isValid();

        setStartDateError(!isStartDateValid)
        setEndDateError(!isEndDateValid)

        return isStartDateValid && isEndDateValid
    }

    useImperativeHandle(ref, () => ({
        handleNext
    }))

    const handleStartDateChange = (newValue) => {
        if (dayjs(newValue).isValid()) {
            dispatch(setStartDate(newValue));
        }
    }

    const handleEndDateChange = (newValue) => {
        if (dayjs(newValue).isValid()) {
            dispatch(setEndDate(newValue));
        }
    }

    return (
        <div className="">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex gap-4">
                    <DatePicker
                        label="Start Date"
                        value={endDate ? dayjs(startDate): null}
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
