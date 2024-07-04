import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col, Button, Input, ListGroup,Table, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import MapsHeader from "components/Headers/MapsHeader";
import { useLocation } from 'react-router-dom';
import axios from "axios";
// import path from `../../assets/img/yolo_img/processed_${num}`;



// 탐지 완료 이미지.
import processed01 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_01.png";
import processed02 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_02.png";
import processed03 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_03.png";
import processed04 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_04.png";
import processed05 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_05.png";
import processed06 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_06.png";
import processed07 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_07.png";
import processed08 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_08.png";
import processed09 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_09.png";
import processed10 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_10.png";
import processed11 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_11.png";
import processed12 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_12.png";
import processed13 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_13.png";
import processed14 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_14.png";
import processed15 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_15.png";
import processed16 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_16.png";
import processed17 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_17.png";
import processed18 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_18.png";
import processed19 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_19.png";
import processed20 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_20.png";
import processedPNG22 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_22.png";
import processedPNG23 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_23.png";
import processedPNG24 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_24.png";
import processedPNG25 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_25.png";
import processedPNG26 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_26.png";
import processedPNG27 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_27.png";
import processedPNG28 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_28.png";
import processedPNG29 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875_29.png";
import processedJPG01 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_01.jpg"
import processedJPG02 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_02.jpg"
import processedJPG03 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_03.jpg";
import processedJPG06 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_06.jpg";
import processedJPG07 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_07.jpg";
import processedJPG09 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_09.jpg";
import processedJPG010 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_10.jpg";
import processedJPG011 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_11.jpg";
import processedJPG012 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_12.jpg";
import processedJPG013 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_13.jpg";
import processedJPG014 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_14.jpg";
import processedJPG015 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_15.jpg";
import processedJPG016 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_16.jpg";
import processedJPG017 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_17.jpg";
import processedJPG018 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_18.jpg";
import processedJPG019 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_19.jpg";
import processedJPG020 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_20.jpg";
import processed21 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_21.jpg";
import processed22 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_22.jpg";
import processed23 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_23.jpg";
import processed24 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_24.jpg";
import processed25 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_25.jpg";
import processed26 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_26.jpg";
import processed27 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_27.jpg";
import processed28 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_28.jpg";
import processed29 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_29.jpg";
import processed173527932 from "../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932.jpg";
import processed143558875 from "../../assets/img/yolo_img/processed_KakaoTalk_20240612_143558875.png";


const Maps = () => {
  const location = useLocation();
  const { item, detectionTime } = location.state || {};
  const [localDetectionData, setLocalDetectionData] = useState(item ? { name: item.nameArr, img: item.DTimgPath, time: detectionTime, index: item.index } : {});

  return (
    <>
      <MapsHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper detectionData={localDetectionData} setDetectionData={setLocalDetectionData} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

const MapWrapper = (props) => {
  const [file, setFile] = useState(null);
  const [detectionList, setDetectionList] = useState([]);
  const [userDetectall, setuserDetectall] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const fileInputRef = useRef(null);
  const imgTEG = useRef();
  const [detectedIgms, setdetectedIgms] = useState(
    [processed01, processed02,processed03,processed04,processed05,processed06,processed07,processed08,processed09,processed10,processed11,
      processed12,processed13,processed14,processed15,processed16,processed17,processed18,processed19,processed20,processedPNG22,processedPNG23, 
      processedPNG24,processedPNG25,processedPNG26, processedPNG27,processedPNG28,processedPNG29,processedJPG01,processedJPG02,processedJPG03,
      processedJPG06,processedJPG07,processedJPG09,processedJPG010,processedJPG011,processedJPG012, processedJPG013,processedJPG014,processedJPG015,
      processedJPG016,processedJPG017,processedJPG018, processedJPG019, processedJPG020,processed21, processed22,processed23,processed24,processed25,
      processed26, processed27,processed28,processed29, processed173527932, processed143558875]
  );
  const [innerDtcImg, setinnerDtcImg] = useState("");


  useEffect(() => {
      if (props.detectionData?.img) {
        // num = props.detectionData?.imgName
        // processed_이미지가져오기 위해 스트링 잘나오나 체크.
      // console.log(`${props.detectionData?.img.split('/KakaoTalk')[0]}/processed_${props.detectionData?.imgName}`); 
        const newItem = {
          name: `전송된 이미지: ${props.detectionData.index}번`,
          src: props.detectionData.img,
        };
        setDetectionList(prevList => [...prevList, newItem]);
      }

      // 해당회원의 Detection 정보 가져오기.
      getUserDeteclist();

  }, [props.detectionData]);

  // 해당회원의 Detection 정보 가져오기.
  const getUserDeteclist = async () => {
      const compNum = JSON.parse(localStorage.getItem('compnum'));
      try{
        const {data} = await axios.get(`http://localhost:8081/controller/detection/combinationType?compnum=${compNum}`);
        console.log(data);
        setuserDetectall(data);
      } catch(e){
         console.log(e);
      }
  };


  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // selectedFile.name에 YOLO모델에 넣어줄 이름이 있다.
      console.log(selectedFile.name);
      // FastApi모델 동작api실행.
      postYoloModel(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        const newItem = {
          name: `내 업로드: ${selectedFile.name}`,
          src: reader.result,
          DTCimg : innerDtcImg // 탐지된 이미지
        };
        setDetectionList(prevList => [...prevList, newItem]); // 탐지 리스트에 항목 추가
      };
      reader.readAsDataURL(selectedFile);
  };

  const handleUpload = () => {
      setFile(null);
      setImageSrc(null);
  };


  // FastApi모델 동작api에 전송해주자.
  const postYoloModel =  async (imgname) => {
      console.log("단건 분석 실행되지? ");
      let sendImg = { //fastAPI로 보낼 이미지 이름.
          imgname : imgname
      };    
      console.log(sendImg);

      let reasult;
      let filterDETimg;
      try{
          reasult = await axios.post(`http://127.0.0.1:8000/predict`, sendImg);
          console.log(reasult?.data);
          // 예측결과 배열에 값이 들어있으면 탐지신호 동작.
          
          if(reasult?.data?.predictions.length > 0){
                const detectNameArr = reasult?.data?.predictions.map((data) => {return data.name; });
                alert(`${detectNameArr.join(", ")} 가 탐지 되었습니다.`);

              //  const processedPath = `/argon-dashboard-react/static/media/processed_${imgname}`;
                filterDETimg = detectedIgms.filter((DEimg) => {
                    return  DEimg.includes(imgname.split(".")[0]);
                });
                console.log(imgname.split(".")[0]);
                console.log(filterDETimg[0]);

                // 탐지된 이미지 넣어줌.
                setinnerDtcImg(filterDETimg[0]);
                imgTEG.current.setAttribute("src", filterDETimg[0]);
              // 일단 탐지된 빨간보더 뜨고 액션 멈추고, 탐지된 정보 DB저장됨.
          //   autoDetection(data?.predictions, currentIndex);
          } else{ // 일반 품목도 wrokload디비에 추가함.
              alert("탐지된 물품이 없습니다.")
          //   nomalInsertWorload();
          }    
        } catch(e){
          console.log(e);
        }
  };


  // 이버튼 클릭시 위해물품 탐지 단건분석 시작한다.
  const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
  };


  const handleListItemClick = (item) => {
    console.log(item);
    if(item.DTCimg){  // 탐지된 물품이 있을시 내업로드 이미지 클릭하면 탐지된 이미지로 바뀜.
      console.log(item.DTCimg);
      setImageSrc(item.DTCimg); 
    } else { setImageSrc(item.src); }  // 탐지물품이 없으면 기존 올린 이미지 보여줌.
   
  };

  const handleDownloadCSV = () => {
    const csvContent = detectionList.map(item => item.name).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "detection_list.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseImage = () => {
    setImageSrc(null);
    if (props.detectionData) {
      const updatedDetectionData = { ...props.detectionData, img: null };
      props.setDetectionData(updatedDetectionData);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };


  // 딥러닝 모델 선택 기능.
  const handleModelSelect =  async (modelName) => {
     setSelectedModel(modelName);
     try{
        const {data} = await axios.get(`http://127.0.0.1:8000/modelchange/${modelName}`);
        console.log(data);
        alert(`선택하신 ${data}`);
        
     } catch(e){
       console.log(e);
     }
  };



  return (
    <Row style={{ height: '680px' }}>
      <Col md="8" className="d-flex align-items-center justify-content-center">
        <div style={{ width: '100%', height: '100%', textAlign: 'center', position: 'relative' }}>
          <Input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            innerRef={fileInputRef}
          />

          {  
            (props.detectionData?.img || imageSrc) ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                //  src={props.detectionData?.img ? path : imageSrc }
                src={props.detectionData?.img || imageSrc }
              //  src="../../assets/img/yolo_img/processed_KakaoTalk_20240613_173527932_22.jpg"
                ref={imgTEG}
                alt="Selected file preview"
                style={{
                  width: '85%',
                  height: '100%',
                  objectFit: 'contain', // 이미지가 컨테이너를 가득 채우지 않도록 조정
                  maxHeight: '680px' // 최대 높이 설정
                }}
              />
              <Button color="danger" size="sm" onClick={handleCloseImage} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
          ) : (
            <Button color="primary" className="btn-icon" size="lg" onClick={handleButtonClick} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          )}

          {file && (
            <Button color="secondary" onClick={handleUpload} style={{ marginTop: '10px' }}>
              업로드
            </Button>
          )}
        </div>
      </Col>
      <Col md="4">
        <div style={{ height: '100%', padding: '20px', boxSizing: 'border-box', borderLeft: '0.5px solid ', borderColor: "gray" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* <h3 className="mb-0">위해물품 탐지 리스트</h3> */}
            <h3 className="mb-0"></h3>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>
                {selectedModel ? selectedModel : "모델 선택"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleModelSelect("model2")}>v1.0.1_240610</DropdownItem>
                <DropdownItem onClick={() => handleModelSelect("model1")}>v1.0.1_240613</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{fontSize : '16px'}}>번호</th>
                <th scope="col" style={{fontSize : '16px'}}>탐지된품목</th>
                <th scope="col" style={{fontSize : '16px'}}>탐지 일자</th>
              </tr>
            </thead>
            <tbody>
              { userDetectall.map((item,i)=>{ 
                  return (
                      <tr key={i}>
                        <th style={{padding:'10px 1.5rem'}}>{i+1}</th>
                        <th style={{padding:'10px 1.5rem'}}>{item.type_NAME_ENG}</th>
                        <th style={{padding:'10px 1.5rem'}}>{item.detection_DATE}</th>
                      </tr>
                  );
               })                
              }              
            </tbody>
          </Table> */}
          
          {/* <Button color="primary" onClick={handleDownloadCSV} style={{ marginTop: '10px' }}>
            CSV 다운로드
          </Button> */}

          <h3 style={{ marginTop : '10px'}}>내가 업로드한 사진</h3>
          <ListGroup>
            {detectionList.map((item, index) => (
              <ListGroupItem key={index} onClick={() => handleListItemClick(item)} style={{ cursor: 'pointer' , marginTop : '10px'}}>
                {item.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </Col>
    </Row>
  );
};

export default Maps;