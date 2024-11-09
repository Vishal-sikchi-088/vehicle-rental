import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    userName: '',
    wheels: '',
    type:'',
    model:'',
    startDate:'',
    endDate: ''
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setUserName: (state,action) => {state.userName = action.payload},
        setWheels: (state,action) => {state.wheels = action.payload},
        setType: (state,action) => {state.type = action.payload},
        setModel: (state,action) => {state.model = action.payload},
        setStartDate: (state,action) => {state.startDate = action.payload},
        setEndDate: (state,action) => {state.endDate = action.payload},
        nextStep: (state) => {state.step += 1},
        prevStep: (state) => {state.step -= 1},
        resetForm: () => initialState
    }
})

export const {setUserName, setWheels, setType, setModel, 
    setStartDate, setEndDate, nextStep, prevStep, resetForm} = formSlice.actions

export default formSlice.reducer