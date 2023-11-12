/*eslint-disable*/
import React from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { changeName, increaseAge, increaseCount } from '../store.js'


function Cart(){

  const cart = useSelector((state)=>{ return state.cart })
  const dispatch = useDispatch()

  const user = useSelector((state) => { return state.user })
  

  return (
    <div>
      <h6>{user.name}의 장바구니 : 나이 {user.age}</h6>
      <button onClick={()=>{
        dispatch(increaseAge())
      }}>나이증가</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button onClick={()=>{
                  dispatch(increaseCount(item.id)) 
                }}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
     
  )
}

export default Cart;