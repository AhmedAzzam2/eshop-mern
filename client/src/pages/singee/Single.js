import Header from "../../header/Header"
import { useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { urlHome } from '../../api/Product';
import { allProduct } from '../../api/Product';
import './single.scss';
import { useParams } from "react-router-dom";

import { ThemeContext } from '../../App';
function DarkVariantExample() {
  const Theme = useContext(ThemeContext);


  // get id from url 
  const { idx } = useParams();
  const [card, setCard] = useState([]); 

  // function add to theme.cart
  const addCart = (item) => {
    // ccheck if item is in cart 
    let check = Theme.cart.find((i) => i._id === item._id);
    if (check) {
      check.quantity++;
      // max quantity 
      if (check.quantity > check.minQuantity) {
        check.quantity = check.minQuantity;
      }
    } else {
      Theme.setCart([...Theme.cart, { ...item, quantity: 1 }]);
    }
  };


  useEffect(() => {
    allProduct(idx).then((response) => {
      setCard(response.data.data);
    });
  }, [idx]);
  


  return (
    <div >
      <div className="single">
        {
          card
            ?
            <div className="single__card">
                <img className="card__image" src={urlHome + card.image} alt={card.name} />
              <div className="txt">
                <NavLink to={`/`} >  &#8624; back to home</NavLink>
                <h3>{card.name}</h3>
              <span className="card__price">{
                // discountrate before price and after price Discount
                card.discountRate > 0 ? ( 
                  <div>
                    <span style={
                      {textDecoration: 'line-through', color: 'red'}
                    }>{card.price}$ </span>
                    <span className="card__price--after">{ 
                (card.price - (card.price * card.discountRate / 100)).toFixed(2)}$</span> 
                  </div>
                ) : (
                  <span className="card__price--after">{card.price}$</span>
                )
              }</span>
                <p>About Item</p>
                <p>qry: {card.minQuantity} <span style={{
                  color: 'red',  fontWeight: 'bold', fontSize: '1.2rem', 
                }}>' product Code {card.productCode}'  </span></p>
                <p>{card.description}</p>
                <button onClick={() => addCart(card)}>add to cart</button>
              </div>
            </div>
            :
            <h1>loading</h1>

        }
      </div>
    </div>
  );
}


export default () => {

  return (
    <main>
      <Header />
      <DarkVariantExample />
    </main>
  )
}
