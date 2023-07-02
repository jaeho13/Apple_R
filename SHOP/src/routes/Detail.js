import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap'
import { useEffect, useState } from "react";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

function Detail(props) {

    let {id} = useParams();
    console.log(id);
    let 찾은상품 = props.shoes.find(x => x.id == id);
    let [alert, setAlert] = useState(true);
    let [탭, 탭변경] = useState(2);
    let dispatch = useDispatch()

    useEffect(() => {
        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거 = JSON.parse(꺼낸거)
        꺼낸거.push(찾은상품.id)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))
    }, [])


    useEffect(() => {
        let a = setTimeout(() => { }, 2000)
        return () => {
            clearTimeout(a)
        }
    }, [])

    return (
        <div className="container">
            <div className="row">
               <div className="col-md-6">
                   <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
              <div className="col-md-6">
              <h4 className="pt-5">{props.shoes[id].title}</h4>
        <p>{props.shoes[0].content}</p>
        <p>{props.shoes[0].price}원</p>
                <button className="btn btn-danger" onClick={() => {
                    dispatch(addItem({ id : 2, name : 'Grey Yordan', count : 1 }));
                }}>주문하기</button> 
               </div>
           </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0)} }eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1)} } eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2)} }eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭}/>
       </div> 
    )
}

function TabContent(props) {
    if (props.탭 == 0) {
        return <div>내용0</div>
    }
    if (props.탭 == 1) {
        return <div>내용1</div>
    }
    if (props.탭 == 2) {
        return <div>내용2</div>
    }
}
export default Detail;