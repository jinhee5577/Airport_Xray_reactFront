import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setWorkTime, setIsLoggedIn } from "../../store.js";
import { useDispatch, useSelector } from 'react-redux';
// reactstrap components

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // 로그아웃 요청.
  const Logout = async () => {
    try{
      window.localStorage.clear();
      dispatch(setIsLoggedIn(false));
      dispatch(setWorkTime({ hours: 0, minutes: 0, seconds: 0 }));
      const {data} = await axios.get('http://localhost:8081/controller/member/logout');
      console.log(data);
      alert("로그아웃 되었습니다.");
      navigate(data); // 로그인 페이지로 이동.
    } catch(e){
       console.log(e);
    }      

  };

  useEffect(()=> { 
    const compNum = JSON.parse(localStorage.getItem('compnum')); 
    setusername(compNum); 

  }, []);


  const handleUsernameClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block" onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>
                    <span className="mb-0 text-sm font-weight-bold">
                      {username}님 환영합니다. {isDropdownVisible && <i className="fas fa-chevron-down" style={{ marginLeft: '5px' }}></i>}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={() => { Logout(); }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;