import Header from '../../header/Header';
import ReactDOM from "react-dom"
import { useContext } from 'react';
import './project.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allCategory, addCategory, deleteCategory, editCategory } from '../../api/Category';
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
    getallCategory();
  }, []);

  const deletePro = async (id) => {
    await deleteCategory(id, Theme.user.accessToken);
    getAllCat();
  }
  const getallCategory = async () => {
    let response = await allCategory();
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
    let response = cardUpdate._id ? await editCategory(cardUpdate._id, { name: e.target.name.value }, Theme.user.accessToken) : await addCategory({ name: e.target.name.value }, Theme.user.accessToken);
    if (response.status === 201 || response.status === 200) {
      toast.success('Successfully');
      getAllCat();
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

        <h1>admin/Catgory </h1>
        <button style={{fontSize: "27px;"}} onClick={() => { setShow(!show); setCardUpdate([]) }}>&#10000; add Catgory </button>
        {
          show && ReactDOM.createPortal(<div id="form__add">
            <div className="backdrop" onClick={() => { setShow(!show); setCardUpdate([]) }} > </div>

            <form onSubmit={addProduct} method="post" encType='multipart/form-data'>
              <input type="text" name='_id' value={cardUpdate._id} hidden />
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input type="text" name="name" id="name" placeholder='name' value={cardUpdate.name} onChange={
                  (e) => setCardUpdate({ ...cardUpdate, name: e.target.value })
                } />
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
                <p>Are you sure you want to delete this Category?</p>
                <h2>{del.name}</h2>
                  <button onClick={() => {deletePro(del._id);setShowDel(false) } }> &#9832; Confirm the deletion</button>
                </div>
            </div>
          </div>
        }
        {
          category.map((card) => (
            <div className="card" key={card._id}>
              <span className="card__name">{card.name}</span>
              <div className="edit">
                <button onClick={() => { setCardUpdate(card); setShow(true) }}> &#10000; Edit</button>
                <button onClick={() => {setDel(card);setShowDel(true) } }> &#9832; Delete</button>
              </div>
            </div>
          ))  // end map

        }
      </section>
    </div>
  );
}


function Category() {
  return (
    <div>
      <Header />
      <div className="form admin-Project">

        <List />
      </div>
    </div>
  );
}


export default Category;