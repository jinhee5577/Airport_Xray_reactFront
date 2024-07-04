import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
 import TablesHeader from "components/Headers/TablesHeader";

import axios from "axios";


const AdminPost = () => {
  const [posts, setPosts] = useState([
    { id: 7, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.27", views: 10 },
    { id: 6, title: "업데이트 안내입니다.", content: "업데이트 안내 내용입니다.", date: "2024.05.27", views: 100 },
    { id: 5, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.26", views: 8 },
    { id: 4, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.26", views: 3 },
    { id: 3, title: "주간 일정 안내입니다.", content: "주간 일정 안내 내용입니다.", date: "2024.05.25", views: 10 },
    { id: 2, title: "업데이트 안내입니다.", content: "업데이트 안내 내용입니다.", date: "2024.05.24", views: 50 },
    { id: 1, title: "시스템 점검 안내입니다.", content: "시스템 점검 안내 내용입니다.", date: "2024.05.23", views: 30 },
  ]);

  const [noticeList, setNoticeList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // 공지사항 모든 리스트 불러오기
  const getNoticeAll = async () => {
    try{
       const {data} = await axios.get("http://localhost:8081/controller/notice/all");
       console.log(data);
       setNoticeList(data);
    } catch(e){
      console.log(e);

    }
 };


 useEffect(() =>{
    // 공지사항 모든 리스트 불러오기
    getNoticeAll()
  }, []);


 const handleDeletePost = (idx) => {
     setPostToDelete(idx);
     setIsDeleteModalOpen(true);
     console.log(postToDelete);
 };


 // 선택한 공지사항 진짜 삭제하기.
 const confirmDeletePost = async () => {
     console.log(postToDelete);
     try{
        const {data} = await axios.delete(`http://localhost:8081/controller/notice/delete/${postToDelete}`);
        console.log(data);
        setNoticeList(data);

     } catch(e){
       console.log(e);
     }
     setIsDeleteModalOpen(false);
 };


  // 새로운 공지사항 작성. 
  const handleCreatePost =  async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;    
    const newPost = {
        noticeTITLE: title,
        noticeDETAIL:content
    };
    console.log(newPost);
    // const formData = new FormData();
    // formData.append('NOTICE_TITLE', title);
    // formData.append('NOTICE_DETAIL', content);
    // console.log(formData);
    
    try{
        const {data} = await axios.post("http://localhost:8081/controller/notice/new", newPost);
        console.log(data);
        setNoticeList(data);
     } catch(e){
       console.log(e);
 
     } 
  
    setIsCreateModalOpen(false);
  };


  // 공지사항 수정하기.
  const handleEditPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    const modifyPost = {
        noticeIDX: currentPost.notice_IDX,
        noticeTITLE: title,
        noticeDETAIL:content
    };
    console.log(modifyPost);
    
    try{
        const {data} = await axios.post("http://localhost:8081/controller/notice/modify", modifyPost);
        console.log(data);
        setNoticeList(data);
     } catch(e){
       console.log(e);
 
     } 

    setCurrentPost(null);
    setIsEditModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };


  // 페이지네이션 관련 함수들
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(posts.length / postsPerPage)));

  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <TablesHeader />
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
                      <th scope="col" style={{ fontSize: "16px" }}>번호</th>
                      <th scope="col" style={{ fontSize: "16px" }}>제목</th>
                      <th scope="col" style={{ fontSize: "16px" }}>내용</th>
                      <th scope="col" style={{ fontSize: "16px" }}>등록일</th>
                      <th scope="col" style={{ fontSize: "16px" }}>조회</th>
                      <th scope="col" style={{ fontSize: "16px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    { noticeList.map((post, i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{post.notice_TITLE}</td>
                        <td>{post.notice_DETAIL}</td>
                        <td>{post.notice_AT}</td>
                        <td >
                          <Button color="primary" onClick={() => openEditModal(post)}>수정</Button>
                          <Button color="danger" onClick={() => {
                                handleDeletePost(post.notice_IDX);
                            }}>
                            삭제
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </Table>
              </CardBody>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink previous onClick={prevPage} />
                    </PaginationItem>
                    {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
                      <PaginationItem key={number + 1} active={currentPage === number + 1}>
                        <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                      <PaginationLink next onClick={nextPage} />
                    </PaginationItem>
                  </Pagination>
                </nav>
                <div className="d-flex justify-content-end mt-4">
                  <Button color="primary" className="mr-2" onClick={openCreateModal}>
                    게시글 작성
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(false)}>
        <ModalHeader toggle={() => setIsDeleteModalOpen(false)}>삭제 확인</ModalHeader>
        <ModalBody>
          선택한 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDeletePost}>삭제</Button>
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>취소</Button>
        </ModalFooter>
      </Modal>

      {/* 게시글 작성 모달 */}
      <Modal isOpen={isCreateModalOpen} toggle={() => setIsCreateModalOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsCreateModalOpen(false)}>게시글 작성</ModalHeader>
        <Form onSubmit={handleCreatePost}>
          <ModalBody>
            <FormGroup>
              <Label for="title">제목</Label>
              <Input type="text" name="title" id="title" required />
            </FormGroup>
            <FormGroup>
              <Label for="content">내용</Label>
              <Input type="textarea" name="content" id="content" required style={{ height: "300px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">저장</Button>
            <Button color="secondary" onClick={() => setIsCreateModalOpen(false)}>취소</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* 게시글 수정 모달 */}
      <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsEditModalOpen(false)}>게시글 수정</ModalHeader>
        <Form onSubmit={handleEditPost}>
          <ModalBody>
            <FormGroup>
              <Label for="title">제목</Label>
              <Input type="text" name="title" id="title" defaultValue={currentPost? currentPost.notice_TITLE : ""} required />
            </FormGroup>
            <FormGroup>
              <Label for="content">내용</Label>
              <Input type="textarea" name="content" id="content" defaultValue={currentPost? currentPost.notice_DETAIL: ""} required style={{ height: "300px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">수정하기</Button>
            <Button color="secondary" onClick={() => setIsEditModalOpen(false)}>취소</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AdminPost;