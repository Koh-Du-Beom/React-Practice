/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { ListGroup, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToCart, changeName, increaseAge, increaseCount } from '../store.js'
import { useDispatch, useSelector } from 'react-redux';

function ControlledTabsExample() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Home" className='start end'>
        Tab content for Home
      </Tab>
      <Tab eventKey="profile" title="Profile" className='start end'>
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="Contact" className='start end'>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

function Detail(props){

  const cart = useSelector((state)=>{ return state.cart })
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState("0");
  const [showButton, setShowButton] = useState(true);
  const {id} = useParams();
  const foundShoe = props.shoes.find(function(x){
    return x.id == id
  });

  const handleKeyDown = (event) =>{
    if (event.keyCode === 13){
      handleEnterPress();
    }
  }

  const handleEnterPress = () =>{
    setInputText(event.target.value);
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      if (isNaN(Number(inputText))){
        alert("숫자가 아닙니다! 다시 입력하세요!")
      }
    }, 5000);

    return () => clearInterval(interval)
  }, [inputText])

  
  return (
    <div className="container">
      { showButton? 
        <div className='alert alert-warning'>
          2초 이내 구매 시 할인
        </div> : null
      }   
      
      <div className="row">
        <div className="col-md-6">
          <img src={foundShoe.imgUrl} width="100%" />
        </div>
        <div className="col-md-6">
          <input 
            type='text' 
            value={inputText}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputText(e.target.value)}
          />

          <h4 className="pt-5">{foundShoe.title}</h4>
          <p>{foundShoe.content}</p>
          <p>{foundShoe.price}</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addToCart({
              id : foundShoe.id,
              name: foundShoe.title
            }))
          }}>주문하기</button>
        </div>
      </div>
      <ControlledTabsExample/>
    </div> 
  )
};

export default Detail;