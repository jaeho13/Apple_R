import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from "./data.js"
import {Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"
import Detail from './routes/Detail';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data)
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">이재호</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
            <div className='container'>
              <div className='row'>
                { shoes.map((a, i)=> {
                  return <Card shoes={shoes[i]} i={i} ></Card>
              })}
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과)=>{
                let copy = [...shoes, ...결과.data];
                setShoes(copy);
              })
              .catch(() => {
                console.log('실패했습니다.')
              })
            }}>더보기</button>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
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
