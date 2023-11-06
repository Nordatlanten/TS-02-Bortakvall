import './App.scss'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import { Response, Candy } from './types/api.types'
import { Button } from 'react-bootstrap';

import { storeCandyList } from './redux/features/candyDataSlice';
import { toggleDisplayBasket } from './redux/features/basketSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from './redux/store'
import BasketOffcanvas from './components/BasketOffcanvas/BasketOffcanvas'
import CandyListGrid from './components/CandyListGrid/CandyListGrid';

import { groupBy } from './utils/basketFunctions';

const queryClient = new QueryClient()
const API_HOST = 'https://bortakvall.se/api/v2/'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.basketReducer.value.basket)
  const basketGroupObject = groupBy(basket,i => i.id)
  const groupedBasket = Object.values(basketGroupObject)

  return (
    <QueryClientProvider client={queryClient}>
      <div><h1>Välkommen till Bortakväll</h1></div>
      <Button 
        className={"basket-button"}
        onClick={() => dispatch(toggleDisplayBasket())}>
          Se varukorg {groupedBasket.length > 0 && <span>({groupedBasket.length})</span>}
      </Button>
      <CandyList/>
      <BasketOffcanvas/>
    </QueryClientProvider>
  )
}

function CandyList() {
  const dispatch = useDispatch<AppDispatch>()
  const {isPending, error } = useQuery({
    queryKey: ['candyListData'],
    queryFn: async () => {
      try {
        const response = await axios.get<Response<Candy>>(API_HOST + 
          'products')
        const data = response.data
        dispatch(storeCandyList(data))
        console.log(data)
        return data
      } catch (error) {
        console.error(error)
      }
    }
  }) 
  if (isPending) return 'loading...'
  if (error) return 'An error has occured: ' + error.message
  return (
  <CandyListGrid/>
  )
}

export default App
