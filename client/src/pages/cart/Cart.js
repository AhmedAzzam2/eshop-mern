import Header from "../../header/Header"
import { useContext } from "react";
import './cart.css'
import { ThemeContext } from '../../App';
import { urlHome } from '../../api/Product';
function Cart() {
  const Theme = useContext(ThemeContext);
  console.log(Theme, 'ThemeContext');



  return (
    <main>
    <Header />
    <div className="cartd">
      <section >

        <div className="cart">
          <span>Shopping Cart</span>
          <div className="body">
            <div className="listCart">
              {Theme.cart.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <img src={ urlHome + item.image} alt="" />
                    <div className="box">
                      <h3>{item.name}</h3>
              <p className="qry">available qry; {item.minQuantity}</p>
                      <div style={{ flex: 1 }}>
                        <div className="qr">
                          <button onClick={() => Theme.setCart([...Theme.cart.slice(0, index), { ...item, quantity: (item.minQuantity === item.quantity ? item.quantity :item.quantity + 1 ) }, ...Theme.cart.slice(index + 1)])}>+</button>
                          <span>{item.quantity}</span>
                          <button onClick={() =>  Theme.setCart( item.quantity > 1 ? [...Theme.cart.slice(0, index), { ...item, quantity: item.quantity - 1 }, ...Theme.cart.slice(index + 1)] : [...Theme.cart.slice(0, index), ...Theme.cart.slice(index + 1)] )}>-</button>
                        </div>
                        <button onClick={ () => Theme.setCart([...Theme.cart.slice(0, index), ...Theme.cart.slice(index + 1)]) } style={ { marginTop: '11px' } }>remove</button>
                      </div>
                    </div>
              <span className="card__price">{
                // discountrate before price and after price Discount
                item.discountRate > 0 ? ( 
                  <div>
                    <span style={
                      {textDecoration: 'line-through', color: 'red'}
                    }>{item.price}$ </span> <br />
                    <span className="card__price--after">{(item.price - (item.price * item.discountRate / 100)).toFixed(2)}$</span>
                  </div>
                ) : (
                  <span className="card__price--after">{item.price}$</span>
                )
              }</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="total">

        Subtotal ({Theme.cart.reduce((total, item) => total + item.quantity, 0)} items): <span>{
        // discountrate before price and after price Discount with total price and max float 2
        Theme.cart.reduce((total, item) => total + (item.price - (item.price * item.discountRate / 100)) * item.quantity, 0).toFixed(2)
      }$</span> 
        <button>Proceed to Buy</button>
      </div>
    </div>
    </main>
  );
}


export default Cart;