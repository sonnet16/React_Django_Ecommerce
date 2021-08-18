import React,{ useEffect} from 'react'
import { Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import CheackoutSteps from '../Components/CheackoutSteps'
import Message from '../Components/Message'
import { createOrder } from '../Actions/orderAction'
import {  ORDER_CREATE_RESET } from '../Constants/OrderConstant'



function PlaceOrderScreen({ history }) { 

    const orderCreate = useSelector(state => state.orderCreate)

    const  {order, error, success} = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * (cart.itemsPrice)).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) +Number( cart.shippingPrice)).toFixed(2)

    if (!cart.paymentMethod){
        history.push('/user/payment')
    }

    useEffect(() =>{
        if (success){
            history.push(`/user/order/${order._id}`)
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }
    },[success, history])

    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <div>
            <CheackoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                                
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            <p>
                                {cart.cartItems.length === 0 ? <Message variant='info'>
                                    Your Cart Is Empty
                                </Message>:(
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index)=>(
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                    <Link to={`/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty* item.price)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                                
                            </p>
                                
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
 
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items : </Col>
                                    <Col>
                                    ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col>
                                    ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax : </Col>
                                    <Col>
                                    ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total : </Col>
                                    <Col>
                                    ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className="btn-block" 
                                        variant="outline-dark"
                                        type="button"
                                        disabled={cart.cartItems.length === 0}
                                        onClick={placeOrder}
                                        >
                                            Place Order
                                 </Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}

export default PlaceOrderScreen
