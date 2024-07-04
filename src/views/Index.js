/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
// 페이지 이동 시키는 함수
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";


const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const navigate = useNavigate(); // 네비게이터 함수를 실행해주면 네비케이터 함수를 반환해서 요변수에 저장시켜줌.
  let [allWorkload, setallWorkload] = useState([]);
  let [allWeekWorkload, setallWeekWorkload] = useState([]);
  let [chartDougdata, setchartDougdata] = useState({});
  let [alarmAll, setallAlarmAll] = useState([]);
  let [noticeList, setnoticeList] = useState([]);
  let [model, setModel] = useState('');

   // 위해물품 월별 합산 전체 작업량보기
   const getallWorkload = async () => {
      try{
        let {data} = await axios.get("http://localhost:8081/controller/notice/workloadall");     
        setallWorkload(data);
        console.log(data);

      } catch(e){
        console.log(e);
      }       
   };

    // 위해물품 탐지 주간 합산 전체 작업량보기
    const getallWorkload_week = async () => {
      try{
        let {data} = await axios.get("http://localhost:8081/controller/notice/weekworkload");
        console.log(data);
        setallWeekWorkload(data);
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


 // 전체 공지사항 리스트 불러오기
 const allNoticeList = async () => {
    try{
        const {data} = await axios.get('http://localhost:8081/controller/notice/all');
        console.log(data);
        setnoticeList(data);
    } catch(e){
      console.log(e);        
    }
  }


  // 알림 리스트 전체 가져오기
  const detectionalarmAll = async () => {    
     const compNum = JSON.parse(localStorage.getItem('compnum'));

      try{
        if(compNum){
          let {data} = await axios.get(`http://localhost:8081/controller/detection/alarm?comnum=${compNum}`);
          // 해당 유저의 이상탐지기록 :탐지된품목 번호로 탐지(DETECTION)테이블과 품목이름 결합하여 출력하는 기능
          setallAlarmAll(data);
          console.log(data);
        }
       

      } catch(e){
        console.log(e);
      }       
  };
   

   useEffect(() => {
    // 여기서 호출.
    getallWorkload();  // 월별 합산 전체작업량
    detectionalarmAll(); //  모든알림
    callTodayYN();
    allNoticeList();
    getallWorkload_week();
  
   }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  // 공지사항 페이지에 해당 데이터 보내기.
  const gonoticePage = (post, i) => {
      navigate('/admin/tables', { state: { data: post, index: i} });
  };


  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>

      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                    </h6>
                    <h2 className="text-white mb-0">월간 검출률</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">월간</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">주간</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                   // 위해물품 누적갯수 데이터 전달해주기 위해 함수로 만들어서 호출함.
                    data={chartExample1(allWorkload,allWeekWorkload)[chartExample1Data]}
                    options={chartExample1(allWorkload).options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    {/* 아래에 작은글씨 */}
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      
                    </h6>
                    <h2 className="mb-0">위해물품 탐지 비율</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Doughnut
                  // 도넛 차트데이터 전달해주기 위해 함수로 변형해서 호출함.
                    data={chartExample2(chartDougdata).data}
                    options={chartExample2(chartDougdata).options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* page visits -> 공지사항  */}
        <Row className="mt-5">
          {/* 공지사항 테이블을 화면에 맞게 넓히기 위해 Col의 크기를 xl="12"로 설정 */}
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">공지사항 </h3>
                    <h6>YORORAY 의 최근소식을 알려드립니다.</h6>
                  </div>
                  <div className="col text-right">
                    {/* 공지사항 등록 버튼 등을 여기에 추가 가능 */}
                  </div>
                </Row>
              </CardHeader>
              {/* 테이블에 responsive 클래스를 추가하여 반응형 지원 */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">등록일자</th>
                    <th scope="col">조회</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    noticeList.map((post,i)=>{
                        return (
                          <tr key={i}>
                            <th scope="row">{i+1}</th> 
                            <td style={{color: "blue", cursor:"pointer"}} onClick={()=>{ 
                                  gonoticePage(post, i);
                            }}>{post.notice_TITLE}</td>
                            <td>{post.notice_AT}</td>
                            <td></td>
                          </tr>
                        );
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </Col>

          {/* social traffic 우하단  */}
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">알림</h3>
                  </div>
                  <div className="col text-right">
                    
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  </thead>
                <tbody>
                  {
                    alarmAll.map((data,i)=>{
                       return (
                        <tr key={i}>
                          <th scope="row">{data.identifi_ID} 님 {data.type_NAME_ENG}가 발견됬습니다.</th>
                        </tr>
                       );
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>

      </Container>
    </>
  );
};
export default Index;

