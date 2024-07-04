import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,           // 모달 추가
  ModalHeader,     // 모달 추가
  ModalBody,       // 모달 추가
  ModalFooter      // 모달 추가
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import axios from "axios";

const MemberManagement = () => {
  const [data, setData] = useState([
    { id: 1, name: 'aaa11', date: '2024.05.27', status: '신청 완료', role: '승인', user: 'aaa11!!', process: '진행중', action: '강제 종료' },
    { id: 2, name: 'aaa121', date: '2024.05.27', status: '가입 완료', role: '사용자', user: 'aaa121', process: 'STOP', action: '재시작' },
    { id: 3, name: 'aaa131', date: '2024.05.26', status: '가입 완료', role: '사용자', user: 'aaa121', process: '진행중', action: '강제 종료' },
    { id: 4, name: 'aaa141', date: '2024.05.26', status: '가입 완료', role: '사용자', user: 'aaa121', process: '진행중', action: '강제 종료' },
    { id: 5, name: 'aaa151', date: '2024.05.25', status: '가입 완료', role: '사용자', user: 'aaa141', process: '진행중', action: '강제 종료' },
  ]);
  const [userList, setUserList] = useState([{ identifi_ID: '333356', member_NAME: null, member_AUTH: 'TRUE', member_STATUS: 'FALSE', joined_AT: '2024-06-10 22:54:32', process: "STOP", role: "사용자", status: "가입완료", action: "재시작" }]);
  const [AuthUpdateArr, setAuthUpdateArr] = useState([]);
  const [role, setRole] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // 확인 모달 상태 추가
  const [modalAction, setModalAction] = useState(""); // 모달 액션 상태 추가
  const [identifi_ID, setIdentifi_ID] = useState(""); // 유저 identifi_ID담김.

  const userDtoAddkey = (data) => {
    const newdata = data.map((item, i) => {
      item['status'] = item.member_AUTH == "TRUE" ? "가입완료" : "승인 대기";
      item['role'] = item.member_AUTH == "TRUE" ? "사용자" : "승인";
      item['process'] = item.member_STATUS == "TRUE" ? "진행중" : "STOP";
      item['action'] = item.member_STATUS == "TRUE" ? "강제종료" : "재시작";

      return item;
    });

    console.log(newdata);
    setUserList(newdata);
  };

  // 모든 유저정보 호출.
  const getuserAll = async () => {
    try {
      const { data } = await axios.get('http://localhost:8081/controller/member/all');
      console.log(data);
      userDtoAddkey(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getuserAll();
  }, []);

  let obj = {};
  // 회원들 가입 승인 업데이트 정보 담김.
  const handleRoleChange = (identifi_ID, value) => {
    console.log(value);
    if (obj['identifiID']) { obj['memberAUTH'] = value; }
    else { obj = { identifiID: identifi_ID, memberAUTH: value } }

    let tempArr = [...AuthUpdateArr, obj];
    console.log(tempArr);
    setAuthUpdateArr(tempArr);
  };


  // 모델 상태 변경 기능.
  const handleActionClick = (id, action) => {
    console.log(action);
    setIdentifi_ID(id);
    setModalAction(action); // 모달 액션 설정
    setConfirmModalOpen(true); // 확인 모달 열기
  };

  const confirmAction = () => {
    setConfirmModalOpen(false); // 확인 모달 닫기
    if (modalAction === '삭제') {
      // 삭제 로직 추가
      console.log("삭제 작업 수행");
    } else if (modalAction === '업데이트') {
      sendUpdate(); // 업데이트 로직 추가
    } else if (modalAction === '재시작') {
      statusUpdate("TRUE", identifi_ID); // 재시작 시키기 위해 db status 상태 true로 바꿈.
    } else { // 강제 종료.
      console.log("종료 실행");
      statusUpdate("FALSE", identifi_ID); // 강제 종료 시키기 위해 db status 상태 false로 바꿈.
    }
  };

  // 유저권한 업데이트
  const sendUpdate = async () => {
      console.log(AuthUpdateArr);
      try {
        const { data } = await axios.post('http://localhost:8081/controller/member/authUpdate', { authupArr: AuthUpdateArr });
        userDtoAddkey(data);
        alert('요청하신 회원님의 권한이 업데이트 되었습니다.');
      } catch (e) {
        console.log(e);
      }
  };

  // 유저STATUS권한 업데이트
  const statusUpdate = async (ustatus, id) => {
      let sendData = {
          identifi_ID: id,
          member_STATUS: ustatus
      };      
      if(ustatus == "TRUE"){ // 재시작 시키기 위해 db status 상태 true로 바꿈.      
        try {
          const { data } = await axios.post('http://localhost:8081/controller/member/stautsTrue', sendData);
          userDtoAddkey(data);
          alert('상태가 재시작으로 변경 되었습니다.');
        } catch (e) {
          console.log(e);
        }
      } else if(ustatus == "FALSE"){  // 강제 종료 시키기 위해 db status 상태 false로 바꿈.
          console.log("stop");
          try {
            const { data } = await axios.post('http://localhost:8081/controller/member/stautsFalse', sendData);
          //  console.log(data);
            userDtoAddkey(data);
            alert('상태가 강제종료로 변경 되었습니다.');
          } catch (e) {
            console.log(e);
          }

      }
};


  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">회원 관리</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {/* <th scope="col"></th> */}
                      <th scope="col">사번</th>
                      <th scope="col">등록 일자</th>
                      <th scope="col">가입 여부</th>
                      <th scope="col">권한</th>
                      <th scope="col">사용자</th>
                      <th scope="col">처리 상태</th>
                      <th scope="col">모델 탐지</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((item, i) => (
                      <tr key={i}>
                        {/* <td><Input type="checkbox" /></td> */}
                        <td>{item.identifi_ID}</td>
                        <td>{item.joined_AT}</td>
                        <td>{item.status}</td>
                        <td>
                          <Input type="select" name="MEMBER_AUTH" value={role} onChange={(e) => {
                            setRole(e.target.value);
                            handleRoleChange(item.identifi_ID, e.target.value);
                          }}>
                            <option value={"TRUE"}>승인</option>
                            <option value={"TRUE"}>승인</option>
                            <option value={"TRUE"}>사용자</option>
                          </Input>
                        </td>
                        <td>{item.member_NAME}</td>
                        <td>
                          <span style={{ color: item.process === 'STOP' ? 'red' : 'blue', fontWeight: item.process === 'STOP' ? 'bold' : 'normal' }}>
                            {item.process}
                          </span>
                        </td>
                        <td>
                          <Button color={item.action === '재시작' ? 'primary' : 'danger'} onClick={() => handleActionClick(item.identifi_ID, item.action)}>
                            {item.action}
                          </Button>
                          {/* <Button color="danger" style={{ marginRight: '10px' }} onClick={() => handleActionClick(item.id, '삭제')}>삭제</Button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row className="mt-3">
                  <Col className="d-flex justify-content-between align-items-center">
                    <Pagination>
                      <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="#">
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem disabled>
                        <PaginationLink next href="#" />
                      </PaginationItem>
                    </Pagination>
                    <div>
                      <Button color="primary" type="button" onClick={() => handleActionClick(null, '업데이트')}>업데이트</Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 확인 모달 추가 */}
      <Modal isOpen={confirmModalOpen} toggle={() => setConfirmModalOpen(false)}>
        <ModalHeader toggle={() => setConfirmModalOpen(false)}>확인</ModalHeader>
        <ModalBody>
          정말로 {modalAction} 하시겠습니까?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmAction}>{modalAction}</Button>
          <Button color="secondary" onClick={() => setConfirmModalOpen(false)}>취소</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MemberManagement;