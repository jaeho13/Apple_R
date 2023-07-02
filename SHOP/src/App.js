import { createContext, useEffect, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from "./data.js"
import {Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';
import { useQuery } from 'react-query';

export let Context1 = createContext()

function App() {

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify( [] ))
  }, [])

  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate();
  
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    })
  )

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">이재호</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading && '로딩중' }
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>


        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className='container'>
              <div className='row'>
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i}></Card>
                })}
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과)=>{
                let copy = [...shoes, ...결과.data];
                setShoes(copy);
              })

            }}>더보기</button>
          </>
        } />
        <Route path="/detail/:id" element={
            <Detail shoes={shoes} />
        } />

        <Route path='/cart' element={ <Cart /> } />

      </Routes>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보</h4>
    </div>
  )
}


function Card(props) {
  return (
    <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'}
          width='80%'/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.price}</p>
          </div>
  )
}


export default App;
