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

export { getVehicleTypes, getVehicleModel }