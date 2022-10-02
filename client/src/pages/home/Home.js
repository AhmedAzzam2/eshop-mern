import Header from "../../header/Header"
import { useState, useEffect, useContext } from "react";
import { urlHome } from '../../api/Product';
import { allProduct } from '../../api/Product';
import { NavLink } from 'react-router-dom';
import { allCategory } from '../../api/Category';
import './home.scss'
import { ThemeContext } from '../../App';
function DarkVariantExample() {
  const Theme = useContext(ThemeContext);


  const [card, setCard] = useState([]);
  const [category, setCategory] = useState([]);

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
  const serch = (e) => {
    let value = e.target.value;
    let result = [];
    result = card.filter((data) => {
      return data.name.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    e.target.value === "" ? getAllProduct() : setCard(result);
  };

  useEffect(() => {
    getAllCat();
    getAllProduct();
  }, []);

  const getAllCat = async () => {
    let response = await allCategory();
    setCategory(response.data);
  }


  const getAllProduct = async () => {
    let response = await allProduct();
    setCard(response.data.data);
  }
  // filter by category
  const filterCat = async (id) => {
    let response = await allProduct();
    let result = response.data.data.filter((item) => item.category._id === id);
    setCard(result);
  }




  return (
    <div >
      <div className="cover">
        <div className="text">
          shop
        </div>
        <form onChange={serch} method="get">
          <input type="text" />
          <button type="submit">search</button>
        </form>
      </div>
      <div className="catg">
        {  category.map((cat) => (
          <p key={cat._id} value={cat._id} onClick={ () => filterCat(cat._id) }>
            {cat.name}

          </p>
        ))}
      </div>
      <section className="cards">
        {
          card.map((card,index) => (

            <div className="card" key={card._id}>
              <NavLink to={'/product/' + card._id} className="card__image-container">
                <img className="card__image" src={urlHome + card.image} alt={card.name} />
              </NavLink>
              <span className="card__price">{
                // discountrate before price and after price Discount
                card.discountRate > 0 ? (
                  <div>
                    <span style={
                      { textDecoration: 'line-through', color: 'red' }
                    }>{card.price}$ </span>
                    <span className="card__price--after">{(card.price - (card.price * card.discountRate / 100)).toFixed(2)}$</span>
                  </div>
                ) : (
                  <span className="card__price--after">{card.price}$</span>
                )
              }</span>
              <span className="card__name">{card.name}</span>
              <p className="qry">qry; {card.minQuantity}</p>
              <div className="edit">
                {/* <button onClick={() => { addCart(card) }}> <img src="/cart1.png" style={{width:'44px',height:'44px'}} />  </button> */}
                          {/* <button onClick={() => Theme.setCart([...Theme.cart.slice(0, index), { ...item, quantity: (item.minQuantity == item.quantity ? item.quantity :item.quantity + 1 ) }, ...Theme.cart.slice(index + 1)])}>+</button> */}
                          {/* make add card */}
                <button onClick={() => { addCart(card) }}> <img src="/cart1.png" style={{ width: '44px', height: '44px' }} />  </button>


              </div>
            </div>
          ))  // end map

        }
      </section>
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