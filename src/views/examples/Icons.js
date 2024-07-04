import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Dropdown,   
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import LiveHeader from "components/Headers/LiveHeader.js";
import { useDispatch, useSelector } from 'react-redux';
import { sendDetectionData, changeIndex } from "../../store.js";
import { useNavigate } from "react-router-dom";

// 일반 사진 5장 추가 
import detetct01 from "../../assets/img/yolo_img/carabiner1.png";
import detetct02 from "../../assets/img/yolo_img/carabiner2.png";
import detetct03 from "../../assets/img/yolo_img/carabiner3.png";
import detetct04 from "../../assets/img/yolo_img/carabiner4.png";
import detetct05 from "../../assets/img/yolo_img/carabiner5.png";
import detetct1 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_01.png";
import detetct2 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_02.png";
import detetct3 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_03.png";
import detetct4 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_04.png";
import detetct5 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_05.png";
import detetct6 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_06.png";
import detetct7 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_07.png";
import detetct8 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_08.png";
import detetct9 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_09.png";
import detetct11 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_22.jpg";
import detetct12 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_23.jpg"
import detetct13 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_24.jpg";
import detetct14 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_25.jpg";
import detetct15 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_26.jpg";
import detetct16 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_27.jpg";
import detetct17 from "../../assets/img/yolo_img/KakaoTalk_20240613_173527932_28.jpg";       
import detetct18 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_10.png"; 
import detetct19 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_14.png"; 
import detetct20 from "../../assets/img/yolo_img/KakaoTalk_20240612_143558875_16.png"; 



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
import axios from "axios";


// 실시간 분석 페이지.

const Icons = () => {
  const [isForceStopModalOpen, setIsForceStopModalOpen] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [detectionData, setDetectionData] = useState({});
  const [detectionTime, setDetectionTime] = useState(null);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(true);
  const [imgsatus, setimgsatus] = useState(false);
  const [detectedIndexes, setDetectedIndexes] = useState([]);
  const [slideData, setSlideData] = useState([

    { img: detetct1, typeNUM: 82 },
    { img: detetct2, typeNUM: 270},
    { img: detetct3, typeNUM: 152 },
    { img: detetct4, typeNUM: 264 },
    { img: detetct5, typeNUM: 264 },
    { img: detetct6, typeNUM: 330 },
    { img: detetct7, typeNUM: 180 },
    { img: detetct8, typeNUM: 330 },
    { img: detetct9, typeNUM: 373 },
    { img: detetct11, typeNUM: 71},
    { img: detetct12, typeNUM: 71},
    { img: detetct13, typeNUM: 71},
    { img: detetct14, typeNUM: 71},
    { img: detetct15, typeNUM: 71},
    { img: detetct16, typeNUM: 71},
    { img: detetct17, typeNUM: 71},    
    { img: detetct18, typeNUM: 71}, 
    { img: detetct19, typeNUM: 71}, 
    { img: detetct20, typeNUM: 71}, 
    {img : detetct01, typeNUM: 1},
    {img : detetct02, typeNUM: 2},
    {img : detetct04, typeNUM: 4},
  
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevIndex = useSelector((state)=>{ return state.nowIndex; });  //이전까지 애니메이션 돌던 인덱스
  const sliderWrapperRef = useRef(null);
  // 다른 페이지 다녀온후 기존에 돌던 인덱스 번호로 이동시키기.
  // 원래 스테이트
 //  const [currentIndex, setCurrentIndex] = useState(slideData.length - 1);
  const [currentIndex, setCurrentIndex] = useState(prevIndex == 0 ? slideData.length - 1 : prevIndex);
  const slideWidth = 830; // Image width (800px) + padding (20px) + margin-right (10px)
  let imgRef = useRef();
  const [detectedIgms, setdetectedIgms] = useState(
    [processed01, processed02,processed03,processed04,processed05,processed06,processed07,processed08,processed09,processed10,processed11,
      processed12,processed13,processed14,processed15,processed16,processed17,processed18,processed19,processed20,processedPNG22,processedPNG23, 
      processedPNG24,processedPNG25,processedPNG26, processedPNG27,processedPNG28,processedPNG29,processedJPG01,processedJPG02,processedJPG03,
      processedJPG06,processedJPG07,processedJPG09,processedJPG010,processedJPG011,processedJPG012, processedJPG013,processedJPG014,processedJPG015,
      processedJPG016,processedJPG017,processedJPG018, processedJPG019, processedJPG020,processed21, processed22,processed23,processed24,processed25,
      processed26, processed27,processed28,processed29, processed173527932, processed143558875]
  );

  
  useEffect(() => { // 애니메이션 돌아가는 코드.
    const sliderWrapper = sliderWrapperRef.current;
    const totalSlides = slideData.length;   

   // console.log(processed03);
    // FastApi모델 동작api에 전송해주자.
    const postYoloModel =  async (index) => {
          console.log("실행되니? ");
          console.log(index);
   
          let strArr = slideData[index].img.split('media/')[1].split(".");
          strArr.splice(1,1)
          strArr.join(".");
          console.log(strArr.join("."));

          let sendImg = { //fastAPI로 보낼 이미지 이름.
              imgname : strArr.join(".")
          };          
          console.log(sendImg);
          
          try{
            const {data} = await axios.post(`http://127.0.0.1:8000/predict`, sendImg);
            console.log(data);
            // 예측결과 배열에 값이 들어있으면 탐지신호 동작.
            if(data?.predictions.length > 0){ 
               // 일단 탐지된 빨간보더 뜨고 액션 멈추고, 탐지된 정보 DB저장됨.
               autoDetection(data?.predictions, currentIndex);
            } else{ // 일반 품목도 wrokload디비에 추가함.
                nomalInsertWorload();
            }    
          } catch(e){
            console.log(e);
          }
    
    };

    // 일반 품목도 wrokload디비에 추가하는 함수.
    const nomalInsertWorload = async () => {
        const compNum = JSON.parse(localStorage.getItem('compnum'));
        let memID = { comid : compNum };
        try{
            const {data} = await axios.post(`http://localhost:8081/controller/detection/normal`, memID);
            console.log(data);
        } catch (e){
            console.log(e);
        }
    };  


    function moveSlide(index) { 
        sliderWrapper.style.transition = 'transform 2s linear';
        sliderWrapper.style.transform = `translateX(${index * -slideWidth}px)`;
        setCurrentIndex(index);
        // 어차피 인덱스 번호 가 루프 돌필요없다.검색대는 한번씩만 스캔하고 지나가니깐.
        if(currentIndex >= 0){ 
          // FastApi모델 동작api에 전송해주자.
          postYoloModel(currentIndex);
        }      

        if (index === totalSlides || index === -totalSlides) {  
            setTimeout(() => {
              sliderWrapper.style.transition = 'none';
              sliderWrapper.style.transform = `translateX(${(totalSlides - 1) * -slideWidth}px)`;      
              setCurrentIndex(totalSlides - 1);
            }, 10);
        }
    }

    let interval;
    if (isSlideshowRunning) {
        interval = setInterval(() => {
            moveSlide(currentIndex - 1);     
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isSlideshowRunning, currentIndex]);

  const toggleForceStopModal = () => {
    setIsForceStopModalOpen(!isForceStopModalOpen);
  };

  const toggleRestartModal = () => {
    setIsRestartModalOpen(!isRestartModalOpen);
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

  const handleForceStop = () => {
    setIsForceStopModalOpen(false);
    setIsSlideshowRunning(false);
  };

  const handleRestart = () => {
    setIsRestartModalOpen(false);
    setIsSlideshowRunning(true);
  };
  

   // 자동 탐지된 빨간보더 뜨고 액션 멈춤 DB에 데이터 저장.
   const autoDetection = async (autoData, index) => {
      const compNum = JSON.parse(localStorage.getItem('compnum'));
      console.log(slideData[index].img.split('media/')[1]);
      let strArr = slideData[index].img.split('media/')[1].split(".");
      strArr.splice(1,1)
      strArr.join(".");
      console.log(strArr.join("."));
      console.log(imgRef.current);
     // imgRef.current.setAttribute("src", `detectImg/processed_${strArr.join('.')}`); // 탐지 박스가 그려진 이미지로 교체.
      const typeNUmArr = autoData.map((data) =>{ // typenum 배열
          return data.class + 1;
      });
      const imgPathArr = autoData.map((data)=>{  // 이미지패스경로 배열.
           return data.image_path;
      });
      const TypeNameArr = autoData.map((data)=>{  // 타입name 배열.
           return data.name;
      });

      // 이미탐지된 이미지경로에  실시간 탐지에 걸린 이지미 이름이있다면 그 이미 탐지된 이미지로 갈아치워줌.
      let thereImg = detectedIgms.filter((item,i)=>{
          return item.includes(strArr[0]);
      });
      console.log("탐지이미지 ",thereImg);

      // 애니메이션 src테그배열
      const aniIMG = document.querySelectorAll('.animationIMG');
      if(thereImg){        
        setimgsatus(true);
        aniIMG[index].setAttribute("src", thereImg[0]); // 탐지된 이미지로 갈아 치워줌.
      }
      else {setimgsatus(false);}

      let sendDectData = {
          identifiID: compNum,
          typeNUM : typeNUmArr,  // class가 TYPE_NUM
          detectionFILE : imgPathArr 
      };
     // console.log(sendDectData);
    
      try{
        const {data} = await axios.post("http://localhost:8081/controller/detection/stop", sendDectData);
        console.log(data);
      }  catch(e){
        console.log(e);
      }

      slideData[index]['nameArr'] = TypeNameArr; // 타입이름이 담김 배열 키,밸류로 넣어줌.
      console.log(slideData[index] ,"새 객체");
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setDetectionData({...slideData[index], DTimgPath: thereImg[0], index: index+1}); // 단건분석 페이지로 넘겨줄 data
      setDetectionTime(formattedTime);  // 단건분석페이지로 넘겨줄 탐지시간.
      setDetectedIndexes(prev => [...prev, index]);
      dispatch(sendDetectionData(slideData[index]));  //리덕스로 보냄.
      setIsSlideshowRunning(false); 
};


  // 더블 클릭시 일단 탐지된 빨간보더 뜨고 액션 멈춤.
  const handleDetection = async (item, index) => {
      const compNum = JSON.parse(localStorage.getItem('compnum'));
      console.log(item.img.split('media/')[1]);
      let strArr = item.img.split('media/')[1].split(".");
      strArr.splice(1,1)
      strArr.join(".");
      console.log(strArr.join("."));
      
      let sendDectData = {
          identifiID: compNum,
          typeNUM : item.typeNUM,
          detectionFILE : strArr.join(".")
      };
      console.log(sendDectData);
    
      try{
         const {data} = await axios.post("http://localhost:8081/controller/detection/stop", sendDectData);
         console.log(data);
      }  catch(e){
         console.log(e);

      }
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setDetectionData({...slideData[index], imgName:strArr.join(".")}); // 단건분석 페이지로 넘겨줄 data
      setDetectionTime(formattedTime);
      setDetectedIndexes(prev => [...prev, index]);
      dispatch(sendDetectionData(item));
      setIsSlideshowRunning(false); 
  };

  const handleNavigate = () => {
    console.log(detectionData); 
    // 리덕스로 인덱스번호 보냄.
    dispatch(changeIndex(currentIndex));
    navigate('/admin/maps', { state: { item: detectionData, detectionTime } });
  };

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0% { border-color: red; }
            50% { border-color: transparent; }
            100% { border-color: red; }
          }
          .blink {
            border: 10px solid red;
            animation: blink 1s infinite;
          }
          .slider-container {
            overflow: hidden;
            width: 100%;
            background-color: black; 
            border: 1px solid #ccc;
            position: relative;
            
          }
          .slider-wrapper {
            display: flex;
            transition: transform 2s linear;
            transform: translateX(${(slideData.length - 1) * -slideWidth}px); 
            padding: 10px;
          }
          .icon-slide {
            min-width: 800px;
            margin-right: 10px;
            background-color: #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 700px;
            font-size: 24px;
            color: #333;
            cursor: pointer; 
            box-sizing: border-box;
          }
          .icon-slide.shrink img { 
            width: 790px;
            height: 690px;
          }
        `}
      </style>
      <LiveHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                <h3 className="mb-0">실시간 분석</h3>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    {selectedModel ? selectedModel : "모델 선택"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleModelSelect("model2")}>v1.0.1_240610</DropdownItem>
                    <DropdownItem onClick={() => handleModelSelect("model1")}>v1.0.1_240613</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody>
                <div className="slider-container">
                  <div className="slider-wrapper" ref={sliderWrapperRef}>
                    { slideData.map((item, index) => (
                      <div
                        className={`icon-slide ${detectedIndexes.includes(index) ? 'blink shrink' : ''}`}
                        key={index}
                        // 더블 클릭시 일단 탐지된 빨간보더 뜨고 액션 멈춤.
                        onDoubleClick={() => handleDetection(item, index)}
                      >
                        <img src={item.img} className="animationIMG" ref={imgRef} width={'800px'} height={'680px'} alt={`Slide ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ border: 1, border: 3, marginTop: 20 }}>
                  {/* 단건분석 이동할수 있는 컨포넌트 */}
                  <AlarmDetection detectionData={detectionData} detectionTime={detectionTime} handleNavigate={handleNavigate} />  
                  <Button
                    color="danger"
                    onClick={toggleForceStopModal}
                    style={{ marginRight: "10px" }}
                  >
                    작업중지
                  </Button>
                  <Button color="primary" onClick={toggleRestartModal}>
                    재시작
                  </Button>
                </div>
                {!isSlideshowRunning && <p style={{ color: "red" }}>작업이 중지되었습니다.</p>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={isForceStopModalOpen} toggle={toggleForceStopModal} className="modal-dialog-centered">
        <ModalHeader toggle={toggleForceStopModal}>작업 중지</ModalHeader>
        <ModalBody>
          정말로 작업을 중지하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleForceStop}>
            작업 중지
          </Button>
          <Button color="secondary" onClick={toggleForceStopModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isRestartModalOpen} toggle={toggleRestartModal} className="modal-dialog-centered">
        <ModalHeader toggle={toggleRestartModal}>재시작</ModalHeader>
        <ModalBody>
          정말로 재시작하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRestart}>
            재시작
          </Button>
          <Button color="secondary" onClick={toggleRestartModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

function AlarmDetection(props) {  
  // console.log(props.detectionData);
  
  return (
    <div>
      {props.detectionData.img && (
        <p style={{ color: "red" }}>
          {props.detectionData.index}번 이미지에서 이상탐지가 발생했습니다. 시간: {props.detectionTime}
          <Button color="danger" onClick={props.handleNavigate} style={{ marginLeft: "25px" }}>
            바로가기
          </Button>
        </p>
      )}
    </div>
  );
}



export default Icons;