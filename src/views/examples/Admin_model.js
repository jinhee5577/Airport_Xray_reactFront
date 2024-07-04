import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import Admin_modelHeader from "components/Headers/Admin_modelHeader";
import axios from "axios";

const AdminModel = () => {
  const [models, setModels] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // 새로운 모달 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 5; // 페이지당 항목 수

  const handleDeleteModels = () => {
    if (selectedModel) {
      setModels(models.filter((model) => model.id !== selectedModel.id));
      setSelectedModel(null);
    }
    setIsDeleteModalOpen(false);
  };


   // DB model내용 모두 가져오기
   const getModelList = async () => {
        try{
            const {data} = await axios.get("http://localhost:8081/controller/member/modelall");
            console.log(data);
            setModelList(data);
        } catch(e){
          console.log(e);
        }
   };
   

   useEffect(() => {
      // DB model내용 모두 가져오기
      getModelList();

   }, []);


  const handleUploadModel = async (e) => {
    e.preventDefault();
    const form = e.target;
    const version = form.version.value;
    const description = form.description.value;
    const file = form.file.files[0];

    let postModel = {
       modelNAME : version,
       modelDETAIL: description,
     // modelFILE: URL.createObjectURL(file), // 파일 URL을 모델 정보에 추가
       modelFILE: file.name, // 파일 URL을 모델 정보에 추가
    };
    
    console.log(postModel);
    try { // DB MODEL테이블에 새로운 내용추가.
      const {data} = await axios.post("http://localhost:8081/controller/member/newmodel", postModel);
      console.log(data);
      setModelList(data);
    } catch(e){
      console.log(e);
    }

    const newModel = {
      id: models.length ? models[models.length - 1].id + 1 : 1,
      version,
      description,
      author: "admin",
      date: new Date().toISOString().split("T")[0],
      fileName: URL.createObjectURL(file), // 파일 URL을 모델 정보에 추가
    };

    // 파일 업로드 로직을 여기에 추가 (서버에 파일을 업로드하는 로직)
    // 예시로 alert를 추가
    alert(`모델 버전: ${version}, 설명: ${description}, 파일 이름: ${file.name}`);

    setModels([newModel, ...models]);
    setCurrentPage(1); // 첫 페이지로 이동
    setIsUploadModalOpen(false);
  };


  // 페이지네이션 관련 함수들

  // 현재 페이지에 해당하는 모델들을 추출
  const indexOfLastModel = currentPage * itemsPerPage; // 현재 페이지의 마지막 모델 인덱스
  const indexOfFirstModel = indexOfLastModel - itemsPerPage; // 현재 페이지의 첫 번째 모델 인덱스
  const currentModels = models.slice(indexOfFirstModel, indexOfLastModel); // 현재 페이지에 표시할 모델들

  // 페이지 번호를 클릭했을 때 호출되는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // 페이지 번호를 업데이트

  // 다음 페이지로 이동하는 함수
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(models.length / itemsPerPage))); // 다음 페이지로 이동

  // 이전 페이지로 이동하는 함수
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1)); // 이전 페이지로 이동

  return (
    <>
      <Admin_modelHeader/> 
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow" style={{width: '80%', position: 'relative',left: '50%', transform: 'translateX(-50%)'}}>
              <CardHeader className="border-0 d-flex justify-content-between">
                <div>
                  <h1 className="mb-0">모델 업데이트</h1>
                </div>
                <div>
                  <Button color="primary" onClick={() => setIsUploadModalOpen(true)}>
                    모델 등록
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ fontSize: "16px" }}>버전</th>
                      <th scope="col" style={{ fontSize: "16px" }}>수정사항</th>
                      <th scope="col" style={{ fontSize: "16px" }}>작성자</th>
                      <th scope="col" style={{ fontSize: "16px" }}>등록 일자</th>
                      <th scope="col" style={{ fontSize: "16px" }}>파일</th>
                      {/* <th scope="col" style={{ fontSize: "16px" }}></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    { modelList.map((model, i) => (
                        <tr key={i}>
                          <td>{model.model_NAME}</td>
                          <td>{model.model_DETAIL}</td>
                          <td>관리자</td>
                          <td>{model.model_AT}</td>
                          <td>
                            <a href={model.fileName} target="_blank" rel="noopener noreferrer">{model.model_FILE}</a>
                          </td>
                          {/* <td>
                            <Button color="danger" onClick={() => {
                              setSelectedModel(model);
                              setIsDeleteModalOpen(true);
                              }}>
                                삭제
                            </Button>
                          </td> */}
                        </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink previous onClick={prevPage} />
                    </PaginationItem>
                    {[...Array(Math.ceil(models.length / itemsPerPage)).keys()].map((number) => (
                      <PaginationItem key={number + 1} active={currentPage === number + 1}>
                        <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === Math.ceil(models.length / itemsPerPage)}>
                      <PaginationLink next onClick={nextPage} />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(false)}>
        <ModalHeader toggle={() => setIsDeleteModalOpen(false)}>삭제 확인</ModalHeader>
        <ModalBody>
          선택한 모델을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteModels}>삭제</Button>
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>취소</Button>
        </ModalFooter>
      </Modal>

      {/* 모델 등록 모달 */}
      <Modal isOpen={isUploadModalOpen} toggle={() => setIsUploadModalOpen(false)} size="lg">
        <ModalHeader toggle={() => setIsUploadModalOpen(false)}>모델 등록</ModalHeader>
        <Form onSubmit={handleUploadModel}>
          <ModalBody>
            <FormGroup>
              <Label for="version">버전</Label>
              <Input type="text" name="version" id="version" required />
            </FormGroup>
            <FormGroup>
              <Label for="description">설명</Label>
              <Input type="textarea" name="description" id="description" required />
            </FormGroup>
            <FormGroup>
              <Label for="file">파일</Label>
              <Input type="file" name="file" id="file" required />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">등록</Button>
            <Button color="secondary" onClick={() => setIsUploadModalOpen(false)}>취소</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AdminModel;