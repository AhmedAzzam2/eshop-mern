import Header from '../../header/Header';
import ReactDOM from "react-dom"
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { urlHome } from '../../api/Product';
import './project.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allCategory } from '../../api/Category';
import { allProduct, addProd, updateProd, deleteProduct } from '../../api/Product';
import { ThemeContext } from '../../App';


import React, { useState, useEffect } from 'react';


function List() {
  const Theme = useContext(ThemeContext);

  const [card, setCard] = useState([]);
  const [cardUpdate, setCardUpdate] = useState([]);

  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);

  const [del, setDel] = useState([]);
  const [showDel, setShowDel] = useState(false);




  useEffect(() => {
    getAllCat();
    getAllProduct();
  }, []);

  const deletePro = async (id) => {
    await deleteProduct(id, Theme.user.accessToken);
    getAllProduct();
  }
  const getAllProduct = async () => {
    let response = await allProduct();
    setCard(response.data.data);
  }

  const getAllCat = async () => {
    let response = await allCategory();
    setCategory(response.data);
  }


  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // let response = await addProd(formData, Theme.user.accessToken);
    let response = cardUpdate._id ? await updateProd(cardUpdate._id, formData, Theme.user.accessToken) : await addProd(formData, Theme.user.accessToken);
    if (response.status === 201 || response.status === 200) {
      toast.success('Successfully');
      getAllProduct();
      setShow(false);
    } else {
      toast.error('Something went wrong');
    }

  }

  return (
    <div style={
      { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }
    } >
      <div className="form">
        <ToastContainer />

        <h1>admin/project </h1>

        <button style={{fontSize: "27px;"}} onClick={() => setShow(!show)}>&#10000; add product</button>
        {
          show && ReactDOM.createPortal(<div id="form__add">
            <div className="backdrop" onClick={() => { setShow(!show); setCardUpdate([]) }} > </div>

            <form onSubmit={addProduct} method="post" encType='multipart/form-data'>
              <h1>{cardUpdate._id ? 'Update Product' : 'Add Product'}</h1>
              <div className="form-group">
                <label htmlFor="category">category</label>
                <br />
                <select name='category' defaultValue={cardUpdate.category?._id}>
                  {category.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}

                    </option>
                  ))}

                </select>

              </div>
              <input type="text" name='_id' value={cardUpdate._id} hidden />
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input type="text" name="name" id="name" placeholder='name' value={cardUpdate.name} onChange={
                  (e) => setCardUpdate({ ...cardUpdate, name: e.target.value })
                } />
              </div>
              <div className="form-group">
                <label htmlFor="description">description</label>
                <textarea type="text" name="description" id="description" placeholder='description' value={cardUpdate.description} onChange={
                  (e) => setCardUpdate({ ...cardUpdate, description: e.target.value })
                } />
              </div>
              <div className="form-group">
                <label htmlFor="image">image</label>
                <div id="im">
                  <img src={
                    // add urlHome before +cardUpdate.image if url start with blob:http
                    cardUpdate.image ? cardUpdate.image : '/upload.png'
                  } alt='upload' />
                  <input type="file" name="image" id="image" placeholder='image' onChange={
                    (e) => setCardUpdate({ ...cardUpdate, image: URL.createObjectURL(e.target.files[0]) })
                  } />
                </div>
              </div>
              <div className="num">

                <div className="form-group">
                  <label htmlFor="price">price</label>
                  <input type="text" name="price" id="price" placeholder='price' value={cardUpdate.price} onChange={
                    (e) => setCardUpdate({ ...cardUpdate, price: e.target.value })
                  } />
                </div>

                <div className="form-group">
                  <label htmlFor="minQuantity">Quantity</label>
                  <input type="text" name="minQuantity" id="minQuantity" placeholder='minQuantity' value={cardUpdate.minQuantity} onChange={
                    (e) => setCardUpdate({ ...cardUpdate, minQuantity: e.target.value })
                  } />
                </div>
                <div className="form-group">
                  <label htmlFor="discountRate">discountRate</label>
                  <input type="text" name="discountRate" id="discountRate" placeholder='discountRate' value={cardUpdate.discountRate} onChange={
                    (e) => setCardUpdate({ ...cardUpdate, discountRate: e.target.value })
                  } />
                </div>
              </div>
              <button type="submit">{cardUpdate._id ? 'Update' : 'Add'}</button>


            </form>
          </div>, document.getElementById('modal'))
        }
      </div>

      <section className="cards">
        {
          showDel && 
          <div className="del">
            <div className="body">
              <div className="backdrop" onClick={() => { setShowDel(!showDel); setDel([]) }} > </div>
              <div className="del__card">
                <p>Are you sure you want to delete this product?</p>
                <h2>{del.name}</h2>
                  <button onClick={() => {deletePro(del._id);setShowDel(false) } }> &#9832; Confirm the deletion</button>
                </div>
            </div>
          </div>
        }
        {
          card.map((card) => (
            <div className="card" key={card._id}>
              <NavLink to={'/product/'+card._id} className="card__image-container">
                <img className="card__image" src={urlHome + card.image} alt={card.name} />
              </NavLink>
              <span className="card__price">{
                // discountrate before price and after price Discount
                card.discountRate > 0 ? ( 
                  <div>
                    <span style={
                      {textDecoration: 'line-through', color: 'red'}
                    }>{card.price}$ </span>
                    <span className="card__price--after">{(card.price - (card.price * card.discountRate / 100)).toFixed(2)}$</span>
                  </div>
                ) : (
                  <span className="card__price--after">{card.price}$</span>
                )
              }</span>
              <span className="card__name">{card.name}</span>
              <p className="qry">qry; {card.minQuantity}</p>
                <p> <span style={{
                  color: 'red',  fontWeight: 'bold', fontSize: '1.2rem', 
                }}>' product Code {card.productCode}'  </span></p>
              <div className="edit">
                <button onClick={() => {
                  card.image = urlHome + card.image;
                  setCardUpdate(card); setShow(!show);
                }}> &#10000; Edit</button>
                <button onClick={() => {setDel(card);setShowDel(true) } }> &#9832; Delete</button>
              </div>
            </div>
          ))  // end map

        }
      </section>
    </div>
  );
}


function Project() {
  return (
    <div>
      <Header />
      <div className="form admin-Project">

        <List />
      </div>
    </div>
  );
}


export default Project;