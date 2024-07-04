
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
 // 사이드바
const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
             style={{ width: '100%', maxWidth: '100px', height: '100px',  backgroundColor :''}} 
              alt="..."
              src={require("../../assets/img/brand/yolologo.png")}
            />
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
