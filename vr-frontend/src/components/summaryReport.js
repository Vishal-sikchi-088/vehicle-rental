import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function SummaryReport() {
    const { step, userName, wheels, type, model, startDate, endDate, typeName, modelName } = useSelector((state) => state.form);

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Summary Report</h1>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => window.location.href = '/'}
                >
                    Home
                </button>
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
