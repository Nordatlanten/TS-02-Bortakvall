import axios from "axios"
import { Order } from "../types/api.types"

const API_HOST = 'https://bortakvall.se/api/v2/'

export const postOrder = async (order: Order) => {
  try {
    const response = await axios.post(API_HOST + 'users/2/orders', order, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
