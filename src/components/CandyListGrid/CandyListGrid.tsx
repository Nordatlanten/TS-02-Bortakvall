import './CandyListGrid.scss'
import { AppDispatch, useAppSelector } from "../../redux/store"
import { Card, Button, Container } from "react-bootstrap"
import { addToBasket } from "../../redux/features/basketSlice"
import { selectCandyForDetailedView } from "../../redux/features/candyDataSlice"
import { useDispatch } from "react-redux"
import { Candy } from "../../types/api.types"

import { checkBasketForItem } from "../../utils/basketFunctions"

function CandyListGrid() {
  const candyList = useAppSelector((state) => state.persistedReducer.candyDataReducer.value.candyList)
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.persistedReducer.basketReducer.value.basket)

  const handleItemAdditionToBasket = (a: Candy) => {
    const entries = checkBasketForItem(a, basket)
    if (entries.length < a.stock_quantity) {
      dispatch(addToBasket(a))
    }
  }

  return (
    <Container>
      <div className='candy-list'>
        {candyList && candyList.status === 'success' && candyList.data instanceof Array && candyList.data.map((a, _i) =>
            <Card style={{ width: 'min(12rem, 45%)'}} key={a.id}>
              <Card.Img variant="top" src={'https://bortakvall.se/' + a.images.thumbnail} />
              <Card.Body>
                <Card.Title onClick={() => dispatch(selectCandyForDetailedView(a))}>
                  {a.name}
                </Card.Title>
                { a.stock_status === 'outofstock' &&
                  <Card.Text>
                    Ej i lager
                  </Card.Text>
                }
                { a.stock_status === 'instock' && 
                  <Card.Text>
                    {
                      checkBasketForItem(a, basket).length < a.stock_quantity && <>
                        <b>{a.price} kr</b> &nbsp; <span>{a.stock_quantity} i lager</span> <br/>
                        I kundvagn: {basket.filter(item => item == a).length}
                        <Button variant="secondary" onClick={() => { handleItemAdditionToBasket(a) }}>
                      Lägg i varukorg
                    </Button>
                      </>
                    }
                    {
                      checkBasketForItem(a, basket).length >= a.stock_quantity &&
                      <>
                        <b>{a.price} kr</b>
                        <br/>
                        <span>{a.stock_quantity} i lager</span> 
                        <br/>
                        I kundvagn: {basket.filter(item => item == a).length}
                        <Button disabled={true} variant="warning" onClick={() => { handleItemAdditionToBasket(a) }}>
                          Ej tillgänglig
                        </Button>
                      </>
                    }
                  </Card.Text>
                }
              </Card.Body>
            </Card>
        )}
      </div>
    </Container>
  )
}

export default CandyListGrid
