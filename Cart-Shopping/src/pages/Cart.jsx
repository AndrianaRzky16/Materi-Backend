import React from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Replace this with your actual checkout logic
    console.log("Handling checkout...");
  };

  return (
    <Helmet title="Cart">
      <ToastContainer />
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <>
                  <h5 className="mb-5">Summary of your order</h5>
                  <table className="table table-borderless mb-5 align-middle">
                    <tbody>
                      {cartItems.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <div className="mt-4">
                <h6>
                  Subtotal: Rp 
                  <span className="cart__subtotal"> {totalAmount}</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                <button className="addTOCart__btn me-4">
                    <Link to="/pizzas">Continue Shopping</Link>
                </button>
                <button 
                    className="addTOCart__btn" 
                    onClick={() => {
                      if (cartItems.length === 0) {
                        toast('Your cart is empty. Add some products before checking out.', { autoClose: 700 }) ;
                        navigate('/cart'); // Redirect to the product page
                      } else if (window.confirm('Are you sure you want to checkout?')) {
                        dispatch(cartActions.clearCart());
                        toast('Checkout successful!', { autoClose: 700 });
                        // Redirect to the desired success page or just stay on the current page
                        // history.push('/checkout-success');
                      } else {
                        toast('Checkout cancelled.', { autoClose: 700 });
                      }
                    }}
                >
                  <Link to="/checkout">Proceed to checkout</Link>
                </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">Rp {price}</td>
      <td className="text-center">{quantity}px</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
