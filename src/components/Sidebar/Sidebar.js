import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavItem,
  NavLink,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Media
} from "reactstrap";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const compNum = JSON.parse(localStorage.getItem('compnum'));  // 로그인된 유져 사번. 
  const [nomalUserNav, setnomalUserNav]  = useState([]);
  const [userStatus, setuserStatus] = useState(false);
 
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  useEffect(() => {
    // 어드민이 아닌 일반 유저들 일때 (회원관리, 공지사항 작성, 모델업데이트 부분이 안보이록 처리.)
    if(compNum == 'admin'){
       setuserStatus(true);
      // props.routes.splice(4,1);
       console.log(props.routes.slice(5, props.routes.length));
       setnomalUserNav(props.routes.slice(5, props.routes.length));
    } else{ 
       console.log(props.routes.slice(0, 3));
       setuserStatus(false);
       setnomalUserNav(props.routes.slice(0, 3));
    }

  }, []);



  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        <Col className="collapse-brand" xs="6">
          <Link to="/">
            <img alt="Logo" src={require("../../assets/img/brand/yolologo.png")} style={{ width: '150px', height: 'auto' }} />
          </Link>
        </Col>
        {/* User */}
        <Nav className="align-items-center d-md-none">
          {/* 알림창 */}
          {/* <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbar-default_dropdown_1" className="dropdown-menu-arrow" right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          {/* 사용자 프로필  */}
          {/* <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={require("../../assets/img/brand/yolologo.png")} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  <img alt="Logo" src={require("../../assets/img/brand/yolologo.png")} style={{ width: '150px', height: 'auto' }} />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          {/* <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input aria-label="Search" className="form-control-rounded form-control-prepended" placeholder="Search" type="search" />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form> */}
          {/* Navigation */}
          <Nav navbar>
            { userStatus 
              ? nomalUserNav.map((prop, key) => (
                  <NavItem key={key}>
                    <NavLink to={prop.layout + prop.path} tag={Link} onClick={closeCollapse}>
                      <i className={prop.icon} />
                      {prop.name}
                    </NavLink>
                  </NavItem>
                ))
              : nomalUserNav.map((prop, key) => (
                  <NavItem key={key}>
                    <NavLink to={prop.layout + prop.path} tag={Link} onClick={closeCollapse}>
                      <i className={prop.icon} />
                      {prop.name}
                    </NavLink>
                  </NavItem>
                ))
            }
          </Nav>
          {/* Divider */}
          <hr className="my-3" />
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;