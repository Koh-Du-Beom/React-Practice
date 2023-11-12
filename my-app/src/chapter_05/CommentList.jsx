import React from 'react';
import Comment from "./Comment";

const comments = [
  {
    name: "이인제",
    comment: "안녕하세요, 소플입니다",
  },
  {
    name: "유재석",
    comment: "재미있는 리액트",
  },
  {
    name: "강민경",
    comment: "저도 리액트 배워보고싶습니다!",
  },
]

function CommentList(props){
  return (
    <div>
      {comments.map((comment)=>{
        return (
          <Comment name = {comment.name} comment = {comment.comment} />
        );
      })}
    </div>
  );
}

export default CommentList;
