import './App.scss'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Button } from 'react-bootstrap';
import { storeCandyList } from './redux/features/candyDataSlice';
import { toggleDisplayBasket } from './redux/features/basketSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from './redux/store'
import BasketOffcanvas from './components/BasketOffcanvas/BasketOffcanvas'
import CandyListGrid from './components/CandyListGrid/CandyListGrid';
import ProductInfoModal from './components/ProductInfoModal/ProductInfoModal';

import { groupBy } from './utils/basketFunctions';

const queryClient = new QueryClient()
import { getCandyList } from './api/candyRequests';

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.persistedReducer.basketReducer.value.basket)
  const selectedCandy = useAppSelector((state) => state.persistedReducer.candyDataReducer.value.selectedCandy)
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
      { selectedCandy && <ProductInfoModal product={selectedCandy} /> }
    </QueryClientProvider>
  )
}

function CandyList() {
  const dispatch = useDispatch<AppDispatch>()
  const {isPending, error } = useQuery({
    queryKey: ['candyListData'],
    queryFn: async () => {
      const result = await getCandyList()
      if(result) dispatch(storeCandyList(result.data))
      return result?.data
    }
  }) 
  if (isPending) return 'loading...'
  if (error) return 'An error has occured: ' + error.message
  return (
  <CandyListGrid/>
  )
}

export default App
