/* eslint-disable */  // Warning Message안뜨게하는 법
import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function Modal(props){
  
  return(
    <div className='modal'>
      <h4>{props.title}</h4>
      <p>날짜 : {}</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}

function App() {
  const [postTitle, setPostTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  const [likeCount, setLikeCount] = useState([0, 0, 0]);
  const [modal, setModal] = useState([false, false, false]);
  const [postInput, setPostInput] = useState('');

  //자세히보기 버튼 관리
  const handleModal = (index) => {
    const updatedModal = [...modal];
    updatedModal[index] = !updatedModal[index];
    setModal(updatedModal);
  }
  
  //좋아요 버튼 관리
  const handleLikeClick = (index) => {
    const updatedLikeCount = [...likeCount];
    updatedLikeCount[index] += 1;
    setLikeCount(updatedLikeCount);
  }

  const addPost = () => {
    const updatedPostTitle = [...postTitle];
    postInput? updatedPostTitle.unshift(postInput) : alert("아무거나 입력하세요");

    const updatedLikeCount = [...likeCount];
    updatedLikeCount.unshift(0);
    setLikeCount(updatedLikeCount);
    setPostTitle(updatedPostTitle);
  }

  const deletePost = (title) => {
    const updatedPostTitle = [...postTitle];
    const updatedLikeCount = [...likeCount];
    const index = updatedPostTitle.indexOf(title);
    index !== -1? updatedPostTitle.splice(index, 1) && updatedLikeCount.splice(index, 1) : null;
    setPostTitle(updatedPostTitle);
    setLikeCount(updatedLikeCount);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {
        postTitle.map(function(title, i){
          return (
            <div key = {i} className='list'>
              <h4>{title} <span onClick={()=>handleLikeClick(i)}>👍 {likeCount[i]}</span></h4>
              <p>2월 17일 발행 <button onClick={()=>handleModal(i)}>자세히보기</button></p>
              <button onClick={()=>{deletePost(title)}}>삭제</button>
              {modal[i] ? <Modal title={postTitle[i]}/> : null}
            </div>
          )
        })   
      }
      <input onChange={(e)=>{setPostInput(e.target.value)}} />
      <button onClick={()=>{addPost()}}>글발행</button>
    </div>
  );
}

export default App;


