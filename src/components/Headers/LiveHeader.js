import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";
import { chartExample2 } from "variables/charts.js";
import axios from "axios";

const LiveHeader = () => {
  const [workTime, setWorkTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [todayDetectStatistics, SETtodayDetectStatistics] = useState({});
  const [innerPercentage, SETinnerPercentage] = useState(0);
  let [chartDougdata, setchartDougdata] = useState({});

  // 일일검출탐지 통계 api호출 and 통계계산
  const dailyStatistics = async () => {
      try{
          const {data} = await axios.get('http://localhost:8081/controller/notice/statistics');
          console.log(data);
          SETtodayDetectStatistics(data);

          // 전일대비 오늘량 백분율 내기
          const percentage = ((data.today_y - data.yesterday_y) / data.yesterday_y) * 100;
          console.log(percentage.toFixed(2));
          SETinnerPercentage(percentage.toFixed(2));
          console.log(toString(percentage.toFixed(2)));
      } catch(e){
        console.log(e);
      }     
  };


  // 도넛 차트매핑 데이터 가져오기.
  const callTodayYN = async () => {
      try{
          const {data} = await axios.get('http://localhost:8081/controller/notice/gettodayYN');
          console.log(data);
          setchartDougdata(data);
      } catch(e){
        console.log(e);        
      }
  }


  useEffect(() => {
    // 일일검출탐지 통계data 호출.
    dailyStatistics();
    callTodayYN();

    const storedStartTime = localStorage.getItem("startTime");
    let startTime = storedStartTime ? new Date(storedStartTime) : new Date();
    
    if (!storedStartTime) {
      localStorage.setItem("startTime", startTime);
    }

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
  }, []);

  const cardStyle = {
    height: '100%', // 통일된 높이
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const chartContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '150px',
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="3" md="6" style={{marginBottom:'15px'}}>
                <Card className="card-stats mb-4 mb-xl-0" style={cardStyle}  >
                  <CardBody >
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h4"
                          className="text-uppercase text-muted mb-0"
                        >
                          일일물품 검출량
                        </CardTitle>
                        <span className="h1 font-weight-bold mb-0">
                           {todayDetectStatistics.today_y ? todayDetectStatistics.today_y : ""}건
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
                        { innerPercentage 
                          ? innerPercentage > 0
                            ? (<span><i className="fa fa-arrow-up" /> {innerPercentage}%</span>)
                            : (<span><i className="fas fa-arrow-down" />{Math.abs(innerPercentage)}%</span>)
                          : ""
                        } 
                      </span>{" "}
                      <span className="text-nowrap">전일대비</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="3" md="6" style={{marginBottom:'15px'}}>
                <Card className="card-stats mb-4 mb-xl-0" style={cardStyle}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
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
              <Col lg="3" md="6" style={{marginBottom:'15px'}}>
                <Card className="card-stats mb-4 mb-xl-0" style={cardStyle}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          YOLORAY이용자
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">224 명</span>
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
              <Col lg="3" md="6" style={{marginBottom:'15px'}}>
                <Card className="card-stats mb-4 mb-xl-0" style={cardStyle}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          위해물품 탐지 비율
                        </CardTitle>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="chart" style={chartContainerStyle}>
                            <Doughnut
                              // 도넛 차트데이터 전달해주기 위해 함수로 변형해서 호출함.
                             data={chartExample2(chartDougdata).data}
                              options={{
                                ...chartExample2(chartDougdata).optionss,
                                responsive: true,
                                cutoutPercentage : 50,
                                maintainAspectRatio: false,
                                plugins: {
                                  legend: {
                                    display: true, // 레이블을 숨김
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default LiveHeader;