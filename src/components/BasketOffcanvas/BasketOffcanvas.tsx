import './BasketOffCanvas.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../redux/store'
import { updateBasket, hideBasket, addToBasket } from '../../redux/features/basketSlice';
import { Button, Offcanvas } from 'react-bootstrap';
import { Candy } from '../../types/api.types';
import { groupBy, checkBasketForItem } from '../../utils/basketFunctions';

function BasketOffcanvas () {
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.basketReducer.value.basket)
  const showBasket = useAppSelector((state) => state.basketReducer.value.showBasket)


  const groupedBasket = groupBy(basket, i => i.id)

  const removeProductFromBasket = (item: Candy) => {
    const updatedBasket = basket.filter(product => product !== item)
    dispatch(updateBasket(updatedBasket))
  }

  const decreaseProductQuantity = (a: Candy) => {
    const index = basket.indexOf(a)
    let newBasket = [...basket]
    console.log(index)
    if (index > -1) {
      newBasket.splice(index, 1)
      dispatch(updateBasket(newBasket))
    }
  }


  const increaseProductQuantity = (a: Candy) => {
    const entries = checkBasketForItem(a, basket)
    if (entries.length < a.stock_quantity) {
      dispatch(addToBasket(a))
    }
  }

  return(
    <Offcanvas placement="end" style={{maxWidth: '80vw'}} show={showBasket} onHide={() => dispatch(hideBasket())}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Din varukorg</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      { Object.values(groupedBasket).length > 0 && 
      <>
        <ul className="item-list">
          {Object.values(groupedBasket).map((a, i) => (
            <li key={i} className="item">
              <div className="item-media">
                <img src={"https://bortakvall.se/" + a[0].images.thumbnail} />
              </div>
              <div className="item-content">
                <div className="item-header">
                  <span>{a[0].name}</span>
                  <span onClick={() => removeProductFromBasket(a[0])}>🗑️</span>
                </div>
                <div className="item-price">
                  <span>Pris: {a[0].price} kr</span>
                </div>
                <div className="item-footer">
                  <div className="quantity-panel">
                    <Button variant="secondary" onClick={() => decreaseProductQuantity(a[0])}>-</Button>
                    {/* Can be changed to an input field to specify amount */}
                    <span className="amount-in-basket">{a.length}</span>
                    <Button variant="secondary" onClick={() => increaseProductQuantity(a[0])}>+</Button>
                  </div>
                  <div className="sum">
                    {a[0].price * a.length} kr
                  </div>
                </div>
              </div>
          </li>
        ))}</ul>
        <div className='checkout-panel'>
          <div className='price-totals'>
            <div className='part-sum'>
              <b>Delsumma</b><span>{basket.reduce(((total, item) => total = total + item.price), 0)}&nbsp;kr</span>
            </div>
            <div className='vat'>
              {/* Jag vet inte vad momssatsen är på så jag kör på 25% 😂 */}
              <b>Moms</b><span>{basket.reduce(((total, item) => total = total + item.price), 0) * 0.25}&nbsp;kr</span>
            </div>
            <div className='sum'>
              <b>Summa</b><b>{basket.reduce(((total, item) => total = total + item.price), 0)}&nbsp;kr</b>
            </div>
          </div>
          <div className='button-panel'>
            <Button variant="secondary" onClick={() => dispatch(hideBasket())}>Fortsätt handla</Button>
            <Button>Till kassan</Button>
          </div>
        </div>
      </>
      }
      {
        Object.values(groupedBasket).length === 0 && <div className="empty-basket-view">
          <p>Du har inget i korgen</p>
          <Button onClick={() => dispatch(hideBasket())}>Fortsätt handla</Button>
        </div>
      }
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default BasketOffcanvas
