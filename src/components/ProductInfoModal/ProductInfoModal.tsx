import { Candy } from "../../types/api.types"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addToBasket } from "../../redux/features/basketSlice"
import { AppDispatch, useAppSelector } from "../../redux/store"
import { checkBasketForItem } from "../../utils/basketFunctions"

interface ProductInfoModalProps {
  product: Candy
}

function ProductInfoModal (props: ProductInfoModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.basketReducer.value.basket)
  return (
    <div className="product-info-modal">
      <div className="product-media">
        <img src={'https://bortakvall.se/api/' + props.product.images.large}/>
      </div>
      <div className="product-content">
        <h2 className="product-name">{props.product.name}</h2>
        <p className="product-price">{props.product.price}&nbsp;kr</p>
        <p className="product-description">
          {props.product.stock_status === 'outofstock' && <span>{props.product.name} är ej i lager.</span>}
          {props.product.stock_status === 'instock' && 
            <div>
              <span>{props.product.name}</span> är i lager
              Lagersaldo:&nbsp;<span>{props.product.stock_quantity}</span>
              <p>Antal i kundvagn:  {basket.filter(item => item == props.product).length}</p>
            </div>
          }
        </p>
        <div className="button-panel">
          { checkBasketForItem(props.product, basket).length < props.product.stock_quantity &&
            <Button onClick={() => dispatch(addToBasket(props.product))}>Lägg i varukorg</Button>
          }
          { checkBasketForItem(props.product, basket).length >= props.product.stock_quantity &&
            <Button disabled={true}>Ej tillgänglig</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductInfoModal
