import './ProductInfoModal.scss'
import { Candy } from "../../types/api.types"
import { Button, Modal } from "react-bootstrap"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { addToBasket } from "../../redux/features/basketSlice"
import { AppDispatch, useAppSelector } from "../../redux/store"
import { checkBasketForItem } from "../../utils/basketFunctions"
import { selectCandyForDetailedView } from "../../redux/features/candyDataSlice"
import { getCandyByTag } from '../../api/candyRequests'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface ProductInfoModalProps {
  product: Candy
}

function ProductInfoModal (props: ProductInfoModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.persistedReducer.basketReducer.value.basket)
  const selectedCandy = useAppSelector((state) => state.persistedReducer.candyDataReducer.value.selectedCandy)
  const [categorizedCandyList, setCategorizedCandyList] = useState<Candy[]>([])
  return (
    <div className="product-info-modal">
      <Modal centered={true} show={!!selectedCandy} onHide={() => dispatch(selectCandyForDetailedView(null))} size="lg" >
      <div className="product-media">
        <img src={'https://bortakvall.se/' + props.product.images.large}/>
      </div>
      <div className="product-content">
        <h2 className="product-name">{props.product.name}</h2>
        <p className="product-price"><b>{props.product.price}&nbsp;kr</b></p>
        <div className="product-description">
          {props.product.stock_status === 'outofstock' && <span style={{color: 'red'}}>{props.product.name} är ej i lager.</span>}
          {props.product.stock_status === 'instock' && 
            <div>
              <span style={{color: 'green'}}>Lagersaldo:&nbsp;{props.product.stock_quantity}</span>
              <p>Antal i kundvagn:  {basket.filter(item => item == props.product).length}</p>
                {props.product.tags &&
                  <>
                    {/* Godis hämtad genom Tag har inte taggar inom sitt objekt så jag gör denna rendering conditional */}
                    <h5>Kategorier</h5>
                    <ul className="category-list">
                      {props.product.tags.map((tag, _i) =>
                        <li className="category-list-item" key={tag.id}>
                          <span onClick={async () => {
                            try {
                              const result = await getCandyByTag(tag.id.toString())
                              if (result && result.status === 'success' && "products" in result.data) {
                                setCategorizedCandyList(result.data.products)
                              }
                            } catch (error) {
                              console.error(error)
                            }
                          }}>
                            {tag.name}
                          </span>
                        </li>)}
                    </ul>
                  </>
                }
              {categorizedCandyList.length === 0 &&  <small>Tips! Klicka på en kategori för att visa godis i samma grupp.</small>}
              { categorizedCandyList && 
              <Swiper 
                modules={[ Navigation]}
                slidesPerView={3}
                spaceBetween={12}
                navigation
                breakpoints={{
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 24
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 32
                  }
                }}
                >
                { categorizedCandyList.map((product, i) => 
                <SwiperSlide key={product.id}>
                  <img className='slide-media' src={'https://bortakvall.se/' + product.images.thumbnail}/>
                  <p className='slide-content'>
                    <b onClick={() => {
                      dispatch(selectCandyForDetailedView(product))
                    }} className='slide-content-title'>{product.name}</b>
                  </p>
                </SwiperSlide>
                )}
              </Swiper>
              }
            </div>
          }
        </div>
      </div>
      <Modal.Footer>
          <div className="button-panel">
            <Button onClick={() => dispatch(selectCandyForDetailedView(null))} variant="secondary">Stäng</Button>
            { checkBasketForItem(props.product, basket).length < props.product.stock_quantity &&
              <Button onClick={() => dispatch(addToBasket(props.product))}>Lägg i varukorg</Button>
            }
            { checkBasketForItem(props.product, basket).length >= props.product.stock_quantity &&
              <Button variant="warning" disabled={true}>Ej tillgänglig</Button>
            }
          </div>    
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProductInfoModal
