import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";

const Header = () => {
  const [workTime, setWorkTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
    if (storedStartTime && isLoggedIn) {
      const startTime = new Date(storedStartTime);
      const interval = setInterval(() => {
        const now = new Date();
        const elapsedTime = new Date(now - startTime);

        const hours = elapsedTime.getUTCHours();
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();

        setWorkTime({
          hours,
          minutes,
          seconds,
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    const startTime = new Date();
    localStorage.setItem("startTime", startTime);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("startTime");
    setIsLoggedIn(false);
    setWorkTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    // 페이지 처음 로드될 때 localStorage에 startTime이 있으면 로그인 상태로 처리
    const storedStartTime = localStorage.getItem("startTime");
    if (storedStartTime) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          일일물품 검출량
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          350,897 건
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48% 
                      </span>{" "}
                      <span className="text-nowrap">전일대비</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          금주 가장 많이 검출된 품목
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">품목명</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          금월 가장 많이 검출된 품목
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">품목명</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          일일 총 작업시간
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {`${workTime.hours.toString().padStart(2, '0')}시간 ${workTime.minutes.toString().padStart(2, '0')}분 ${workTime.seconds.toString().padStart(2, '0')}초`}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                {isLoggedIn ? (
                  <Button color="danger" onClick={handleLogout}>
                    로그아웃
                  </Button>
                ) : (
                  <Button color="success" onClick={handleLogin}>
                    로그인
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;