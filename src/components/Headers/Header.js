import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { setWorkTime } from "../../store.js";
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  // const [workTime, setWorkTime] = useState({
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  const [todayDetectStatistics, SETtodayDetectStatistics] = useState({});
  const [innerPercentage, SETinnerPercentage] = useState(0);
  const [thisWeekMaxType, SETthisWeekMaxType] = useState({});
  const [MonthMaxType, SETMonthMaxType] = useState({});
  const [MaxTypePer, SETMaxTypePer] = useState(0);
  const [monthMaxTypePer, SETmonthMaxTypePer] = useState(0);
  const isLoggedIn = useSelector((state) => {return state.isLoggedIn});
  const workTime = useSelector((state) => {return state.workTime});
  const dispatch = useDispatch();

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


  // 이번주 가장많이 탐지된 타입 통계data api호출 and 통계계산
  const getMaxttypeThisWeek = async () => {
      try{
          const {data} = await axios.get('http://localhost:8081/controller/detection/maxtypeThisweek');
          console.log(data);
          SETthisWeekMaxType(data);

          // 전주대비 이번주량 백분율 내기
          const percentage = ((data.this_typecnt - data.last_typecnt) / data.last_typecnt) * 100;
          console.log(percentage.toFixed(2));
          SETMaxTypePer(percentage.toFixed(2));
      } catch(e){
         console.log(e);
      }     
  };


  // 이번달 가장많이 탐지된 타입 통계data api호출 and 통계계산
  const getMaxttypeThisMonth = async () => {
      try{
          const {data} = await axios.get('http://localhost:8081/controller/detection/maxtypeThismonth');
          console.log(data);
          SETMonthMaxType(data);

          // 전달대비 이번주량 백분율 내기
          const percentage = ((data.this_typecnt - data.last_typecnt) / data.last_typecnt) * 100;
          console.log(percentage.toFixed(2));
          SETmonthMaxTypePer(percentage.toFixed(2));
      } catch(e){
         console.log(e);
      }     
  };


  useEffect(() => {
    // 일일검출탐지 통계data 호출.
    dailyStatistics();
    // 이번주 가장많이 탐지된 타입 통계data api호출 
    getMaxttypeThisWeek();
    // 이번달 가장많이 탐지된 타입 통계data api호출
    getMaxttypeThisMonth();

  }, []);


  // 로그인 상태 에서 시간 계속 누적되고, 로그아웃 되면 시간 리셋됨.
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

        dispatch(setWorkTime({
          hours,
          minutes,
          seconds,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
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
              <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h4"
                          className="text-uppercase text-muted mb-0"
                        >
                          금주 가장 많이 검출된 품목
                        </CardTitle>
                        <span className="h1 font-weight-bold mb-0">{thisWeekMaxType.type_name ? thisWeekMaxType.type_name : ""}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        { MaxTypePer 
                          ? MaxTypePer > 0
                            ? (<span><i className="fa fa-arrow-up" /> {MaxTypePer}%</span>)
                            : (<span><i className="fas fa-arrow-down" />{Math.abs(MaxTypePer)}%</span>)
                          : ""
                        } 
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h4"
                          className="text-uppercase text-muted mb-0"
                        >
                          이달 가장 많이 검출된 품목
                        </CardTitle>
                        <span className="h1 font-weight-bold mb-0">{MonthMaxType.type_name ? MonthMaxType.type_name : ""}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        { monthMaxTypePer 
                          ? monthMaxTypePer > 0
                            ? (<span><i className="fa fa-arrow-up" /> {monthMaxTypePer}%</span>)
                            : (<span><i className="fas fa-arrow-down" />{Math.abs(monthMaxTypePer)}%</span>)
                          : ""
                        } 
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                {/* { 변수 ? 일일컨포넌트 : 도넛차트보여주는 컴포넌트 
                } */}
              <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h4"
                          className="text-uppercase text-muted mb-0"
                        >
                          일일 총 작업시간
                        </CardTitle>
                        <span className="h1 font-weight-bold mb-0">
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
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;