import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


const NoticeBoard = () => {
  return (
    <>
    
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h1 className="mb-0">공지사항</h1>
                <h5>YORORAY의 최근 소식을 알려드립니다.</h5>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ fontSize: '16px' }}>번호</th>
                      <th scope="col" style={{ fontSize: '16px' }}>제목</th>
                      <th scope="col" style={{ fontSize: '16px' }}>등록일</th>
                      <th scope="col" style={{ fontSize: '16px' }}>조회</th>
                      <th scope="col" style={{ fontSize: '16px' }}>수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>7</td>
                      <td>주간 일정 안내입니다.</td>
                      <td>2024.05.27</td>
                      <td>10</td>
                      <td><Button color="primary">수정</Button></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>업데이트 안내입니다.</td>
                      <td>2024.05.27</td>
                      <td>100</td>
                      <td><Button color="primary">수정</Button></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>주간 일정 안내입니다.</td>
                      <td>2024.05.26</td>
                      <td>8</td>
                      <td><Button color="primary">수정</Button></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>주간 일정 안내입니다.</td>
                      <td>2024.05.26</td>
                      <td>3</td>
                      <td><Button color="primary">수정</Button></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>주간 일정 안내입니다.</td>
                      <td>2024.05.25</td>
                      <td>10</td>
                      <td><Button color="primary">수정</Button></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter className="py-4">
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
                <div className="d-flex justify-content-end mt-4">
                  <Button color="primary" className="mr-2">게시글 작성</Button>
                  <Button color="danger">삭제</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default NoticeBoard;