import './CheckoutForm.scss'
import { Button, Col, Form, Row } from "react-bootstrap"
import { AppDispatch, useAppSelector } from "../../redux/store"
import { useDispatch } from "react-redux"
import { toggleReadyForCheckout } from "../../redux/features/basketSlice"
import * as Yup from 'yup'
import * as formik from 'formik'
import { groupBy } from "../../utils/basketFunctions"
import { Candy, CheckoutBasketItem, Order, OrderData } from "../../types/api.types"
import { postOrder } from '../../api/orderRequests'
import { useState } from 'react'


function CheckoutForm () {
  const dispatch = useDispatch<AppDispatch>()
  const basket = useAppSelector((state) => state.persistedReducer.basketReducer.value.basket)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderData, setOrderData] = useState<OrderData>()
  const groupedBasket = groupBy(basket, i => i.id)
  const checkoutBasket: CheckoutBasketItem[] = []
  Object.values(groupedBasket).forEach((item: Candy[]) => {
    const newItem: CheckoutBasketItem = {
      product_id: item[0].id,
      qty: item.length,
      item_price: item[0].price,
      item_total: item.length * item[0].price
    }
    checkoutBasket.push(newItem)
  })

  const { Formik } = formik

  const validationSchema = Yup.object({
    customer_first_name: Yup.string().required().min(3).max(255),
    customer_last_name: Yup.string().required().min(3).max(255),
    customer_address: Yup.string().required().min(3).max(255),
    customer_postcode: Yup.string().required().min(5).max(6),
    customer_city: Yup.string().required().min(3).max(255),
    customer_email: Yup.string().email().required(),
    customer_phone: Yup.string().min(6).max(255),
    order_total: Yup.number(),
    order_items: Yup.array()
      .of(
        Yup.object().shape({
          product_id: Yup.number(),
          qty: Yup.number(),
          item_price: Yup.number(),
          item_total: Yup.number()
        })
      )
  })

  return (
    <>
      { !orderComplete && 
        <div className='checkout-form'>
          <div>
            <h2>Din order</h2>
            <div className="item-list-checkout">
              {Object.values(groupedBasket).map((a, i) => (
                <li key={i} className="item">
                  <div className="item-media">
                    <img src={"https://bortakvall.se/" + a[0].images.thumbnail} />
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <b className='item-title'>{a[0].name}</b>
                      <span>Pris: {a[0].price} kr</span>
                    </div>
                    <div className="item-footer">
                      <div className="quantity-panel">
                        <span>{a.length} st</span>
                      </div>
                      <div className="item-sum">
                        totalt {a[0].price * a.length} kr
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
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
          </div>
          <Formik
            validationSchema={validationSchema}
            onSubmit={async (e: Order) => {
              const response = await postOrder(e)
              console.log(response)
              setOrderData(response.data)
              setOrderComplete(true)
            }}
            initialValues={{
              customer_first_name: '',
              customer_last_name: '',
              customer_address: '',
              customer_postcode: '',
              customer_city: '',
              customer_email: '',
              customer_phone: '',
              order_total: basket.reduce(((total, item) => total = total + item.price), 0),
              order_items: checkoutBasket
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className='mb-3'>
                  <Form.Group as={Col} md='6' controlId="validationFormik01">
                    <Form.Label>Förnamn</Form.Label>
                    <Form.Control
                      type="text"
                      name="customer_first_name"
                      value={values.customer_first_name}
                      onChange={handleChange}
                      isValid={touched.customer_first_name && !errors.customer_first_name}

                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='6' controlId="validationFormik02">
                    <Form.Label>Efternamn</Form.Label>
                    <Form.Control
                      type="text"
                      name="customer_last_name"
                      value={values.customer_last_name}
                      onChange={handleChange}
                      isValid={touched.customer_last_name && !errors.customer_last_name}
                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className='mb-3'>
                  <Form.Group as={Col} md='8' controlId="validationFormik03">
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                      type="text"
                      name="customer_address"
                      value={values.customer_address}
                      onChange={handleChange}
                      isValid={touched.customer_address && !errors.customer_address}
                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='4' controlId="validationFormik04">
                    <Form.Label>Postnummer</Form.Label>
                    <Form.Control
                      type="text"
                      name="customer_postcode"
                      value={values.customer_postcode}
                      onChange={handleChange}
                      isValid={touched.customer_postcode && !errors.customer_postcode}
                      isInvalid={!!errors.customer_postcode}
                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.customer_postcode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className='mb-3'>
                  <Form.Group as={Col} md='7' controlId='validationFormik05'>
                    <Form.Label>Stad</Form.Label>
                    <Form.Control
                      type="text"
                      name="customer_city"
                      value={values.customer_city}
                      onChange={handleChange}
                      isValid={touched.customer_city && !errors.customer_city}
                      isInvalid={!!errors.customer_city}
                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.customer_city}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='5' controlId='validationFormik06'>
                    <Form.Label>Telefonnummer</Form.Label>
                    <Form.Control
                      type="phone"
                      name="customer_phone"
                      value={values.customer_phone}
                      onChange={handleChange}
                      isValid={touched.customer_phone && !errors.customer_phone}
                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className='mb-3'>
                  <Form.Group as={Col} md='12' controlId='validationFormik07'>
                    <Form.Label>E-postadress</Form.Label>
                    <Form.Control
                      type="customer_email"
                      name="customer_email"
                      value={values.customer_email}
                      onChange={handleChange}
                      isValid={touched.customer_email && !errors.customer_email}
                      isInvalid={!!errors.customer_email}
                    />
                    <Form.Control.Feedback>Ser bra ut!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.customer_email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className='button-panel'>
                  <Button variant="secondary" onClick={() => dispatch(toggleReadyForCheckout())}>Fortsätt handla</Button>
                  <Button type="submit">Skicka order</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>}
      {orderComplete && orderData && <div>
        Tack! Din order är klar!
        Ordernummer: {orderData.id}
        Ledsen att det inte står mer här. Jag blev klar 2 min innan deadline!
        </div>}
    </>
  )
}

export default CheckoutForm
