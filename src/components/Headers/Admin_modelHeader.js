
import { Button, Container, Row, Col } from "reactstrap";

const Admin_modelHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundImage:
           "" ,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" style={{width: '80%'}}s fluid>
          <Row>
            <Col>
              <h1 className="display-2 text-white">모델 업데이트</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Admin_modelHeader;
