import axios from "axios";

const API_URl = 'http://localhost:3005/api'

const getVehicleTypes = async () => {
    try {
        const response = await axios.get(`${API_URl}/vehicle-type`)
        return response.data
    } catch (error) {
        console.error("Error fetching vehicle type", error)
        return []
    }
}

const getVehicleModel = async (typeId) => {
    try {
        const response = await axios.get(`${API_URl}/models?typeId=${typeId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching vehicle model", error)
        return[]
    }
}

const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URl}/bookings`, bookingData)
        return response.data
      } catch (error) {
        if (error.response) {
          return (error.response.data)
        }
        return { error: 'Network error or server is down' }
      }
}

export { getVehicleTypes, getVehicleModel, createBooking }