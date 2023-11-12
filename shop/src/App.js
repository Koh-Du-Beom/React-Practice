/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Button, Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import data from "./data.js";
import { Route, Routes, Link, useNavigate, Outlet, Tab, Tabs, Table } from 'react-router-dom';
import Detail from './routes/Detail';
import styled from "styled-components"
import axios from 'axios'
import Cart from './routes/Cart.jsx';

function Card (props){
  return (
    <Col lg={4}>
      <img src={props.shoe.imgUrl} width="80%"/>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </Col>
  );
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Loading(){ 
  return( 
    <div>로딩중입니다~</div>
  )
}

function App() {

  const [shoes, setShoes] = useState(data);
  const [clickCount, setClickCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate();
  const [key, setKey] = useState('home');

  const sortShoes = () => {
    const sortedShoes = [...shoes];
    sortedShoes.sort((a, b) => a.title.localeCompare(b.title));
    setShoes(sortedShoes);
  }

  const fetchData = () => {
    let url = '';
    if (clickCount == 0) {
      url = 'https://codingapple1.github.io/shop/data2.json';
    }else if (clickCount == 1){
      url = 'https://codingapple1.github.io/shop/data3.json';
    }else{
      setIsLoaded(true);
      return;
    }

    axios.get(url)
    .then((result) => {
      const updatedShoes = [...shoes, ...result.data];
      setShoes(updatedShoes);
      setClickCount(prevCount => prevCount + 1);
      setIsLoaded(true);
    })
    .catch(()=>{
      
    })
  }

  const [count, setCount] = useState(0);
  const [age, setAge] = useState(20);

  const handleCountButton = () => {
    setCount(count + 1)
    if (count < 3){
      setAge(age + 1)
    }
  }
  
  return (
    <div className="App">
      <div>
        <div>안녕하십니까 전 {age}</div>
        <button onClick={handleCountButton}>누르면 한살먹기</button>
        <div>숫자는 : {count}</div>
      </div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>detail</Nav.Link>
            <Nav.Link onClick={()=>navigate('event')}>event</Nav.Link>
            <Nav.Link onClick={() => {navigate(-1)}}>back</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <button onClick={sortShoes}>상품정렬</button>
      <Routes>
        <Route path="/" element={
          <div>  
            <div className="main-bg"></div>
            <Container>
              <Row>
                  {
                    shoes.map(function(shoe, i){
                      return (
                        <Card key={i} shoe = {shoe}/>
                      );
                    })
                  }
              </Row>
            </Container>
            <button onClick={fetchData}>
              데이터 받아오기
            </button>
          </div>
        }/>


        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> } />
        
        <Route path="/event" element={ <Event/> }>
          <Route path='one' element={ <div>첫 주문시 양배추즙 서비스</div> } />
          <Route path='two' element={ <div>생일기념 쿠폰받기</div> } />
        </Route>

        <Route path="/cart" element={ <Cart/> } />
      </Routes>
    </div>
  );
}

export default App;
