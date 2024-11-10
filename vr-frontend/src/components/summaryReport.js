import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { resetForm } from '../redux/formSlice';
import { Button } from "@mui/material";


function SummaryReport() {
    const dispatch = useDispatch()
    const { step, userName, wheels, type, model, startDate, endDate, typeName, modelName } = useSelector((state) => state.form);

    return (
        <div className="my-2 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Booking Summary</h1>
                <Button variant="outlined" color='primary'
                    className=' hover:bg-blue-400'
                    onClick={() => dispatch(resetForm())}
                >
                    Home
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">User Name:</span>
                    <span>{userName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Wheels:</span>
                    <span>{wheels == 4 ? 'Four Wheeler' : 'Two Wheeler' }</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Type:</span>
                    <span>{typeName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Model:</span>
                    <span>{modelName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Start Date:</span>
                    <span>{dayjs(startDate).format('MMMM D, YYYY')}</span>
                </div> 
                <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">End Date:</span>
                    <span>{dayjs(endDate).format('MMMM D, YYYY')}</span>
                </div>
            </div>
        </div>
    );
}

export default SummaryReport;
