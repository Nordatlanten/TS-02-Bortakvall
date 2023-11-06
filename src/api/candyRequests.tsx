import axios from "axios"
import { Response, Candy } from "../types/api.types"

const API_HOST = 'https://bortakvall.se/api/v2/'

export const getCandyList = async () => {
  try {
    const response = await axios.get<Response<Candy>>(API_HOST + 
      'products')

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getCandyByTag = async (tagId: string) => {
  try {
    const response = await axios.get<Response<Candy>>(API_HOST + 
      'tags/' + tagId)
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}
