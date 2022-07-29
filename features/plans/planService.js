import axios from 'axios'

const API_URL = "http://localhost:7000/api/plans/"

// Create new plan
const createPlan = async (planData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, planData, config)

    return response.data
}

// Get user plans
const getPlans = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user plan
const deletePlan = async (planId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + planId, config)

    return response.data
}



const planService = {
    createPlan,
    getPlans,
    deletePlan,
}


export default planService