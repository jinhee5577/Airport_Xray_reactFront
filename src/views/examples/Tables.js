import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Media,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from "components/Headers/TablesHeader.js";
import axios from "axios";


const Tables = () => {
  let [usersInfo, setUsersInfo] = useState([]);
  let [noticeList, setnoticeList] = useState([]);
  const location = useLocation();
  const { data, index } = location.state || {};
  const [nextpost, setnextpost] = useState({});


  // 전체 공지사항 리스트 불러오기
 const allNoticeList = async () => {
    try{
        const {data} = await axios.get('http://localhost:8081/controller/notice/all');
        console.log(data);
        setnoticeList(data);
        // 다음 포스트
        setnextpost(data[index+1]);
    } catch(e){
      console.log(e);        
    }
  };


  useEffect(() => {
    // 여기서 호출.
    allNoticeList();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow" style={{width: '80%', position: 'relative',left: '50%', transform: 'translateX(-50%)'}} >
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{fontSize : '24px'}}>{data?.notice_TITLE ? data?.notice_TITLE : "공지사항 제목"} </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="mid" style={{ height: '250px' ,fontSize : '18px'}}>
                      <Media className="align-items-center">
                         {data?.notice_TITLE ? data?.notice_DETAIL : "내 용"} 
                      </Media>
                    </th>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <table>
                 {/* <tbody>
                    <tr className="nowpost" style={{ border: "1px solid #dee2e6" }}>
                      <td>현재글 : </td>
                      <td style={{marginLeft: '5px'}} >{data?.notice_TITLE ? data?.notice_TITLE : "현제글 제목"}</td>
                    </tr>
                    <tr className="nextpost">
                      <td>다음글 : </td>
                      <td style={{marginLeft: '5px'}}>{data?.notice_TITLE ? nextpost.notice_TITLE: "다음글 제목"}</td>
                    </tr>
                 </tbody>  */}
                </table>

                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;