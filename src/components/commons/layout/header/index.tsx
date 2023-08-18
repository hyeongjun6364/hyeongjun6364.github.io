// 백엔드 이어보기
// src/components/commons/header/index.tsx(LayoutHeader)
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import {
  isLoginVisibleState,
  userNameState,
  isLoginState,
} from "../../recoilState";
import LoginButton from "../../../units/login";
import {
  StyledLink,
  StyledDropdown,
  DropdownItem,
  DynamicNavBarWrapper,
  DropdownItemStyledLink,
  LogoContainer,
  LogoImage,
  NavDynamicSize,
} from "./headercss";
import axios from "axios";

const LayoutHeader = (): JSX.Element => {
  const router = useRouter();
  // 로그인 창 표시 여부를 관리하는 Recoil 상태
  const [isLoginVisible, setIsLoginVisible] =
    useRecoilState(isLoginVisibleState);
  // 로그인(사용자 이름을 저장) 되었나 확인하는 Recoil 상태
  const [isLoginUserName, setIsLoginUserName] = useRecoilState(userNameState);
  // 버튼의 선택 여부를 추적하는 상태
  const [isSelected, setIsSelected] = useState(false);
  // 로그인 되었나 로그인 되지 않았나 확인할 수 있는 RecoilState
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  // 드롭다운 메뉴의 가시성을 관리하는 상태
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  useEffect(() => {
    // 전부 랜더링 된 다음 가장 마지막에 랜더링
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn"); // localStorage의 값을 가져오고
    const storedUsername = localStorage.getItem("username");
    if (storedIsLoggedIn === "true" && storedUsername) {
      // 로그인이 되었고 username이 있으면
      setIsLogin(true);
      setIsLoginUserName(storedUsername);
    }
  }, []);

  // 링크 클릭시 특정 경로로 이동하는 함수
  const onClickHeader = (path: string): void => {
    // 로그인 창 숨기기
    setIsLoginVisible(false);
    // 지정된 경로로 이동
    void router.push(path);
  };

  // 로그인 창을 보여줄지 토글하는 함수
  const onClickLogin = async (): Promise<void> => {
    // 로그인 창 토글
    setIsLoginVisible(!isLoginVisible);
  };

  // 사용자 로그아웃 처리하는 함수
  const onClickLogout = async (): Promise<void> => {
    try {
      localStorage.removeItem("username");
      // 사용자 이름을 저장하는 localStoreage 제거
      localStorage.removeItem("isLoggedIn");
      // 로그인 상태 저장하는 localStoreage 제거

      setIsLoginUserName(null);
      // 사용자 이름을 null로 저장하는 RecoilState 설정
      setIsLogin(false);
      // 사용자 로그아웃을 false로 저장하는 RecoilState 설정

      // await recordLogoutActivity();

      router.push("/");

      const response = await axios.post(
        "http://localhost:4000/api/auth/logout"
      );
      // 로그아웃 버튼을 누르면 로그아웃 백엔드로 보내서 로그아웃을 했다고 알림
      if (response.data) {
        // 로그아웃 했다고 제대로 post 보내면 로그를 띄움
        console.log("로그아웃 성공(POST)");
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  // const recordLogoutActivity = async () => {
  //   // async 추가
  //   try {
  //     // 서버 시간 가져오기 (worldtimeapi.org 사용)
  //     const serverTimeResponse = await fetchServerTime();
  //     const serverTimeData = await serverTimeResponse.json();

  //     // 서버 시간을 사용하여 로그아웃 활동 기록 생성
  //     const logoutLog = {
  //       timestamp: serverTimeData.utc_datetime, // 서버 시간 사용
  //       action: "logout",
  //     };
  //     console.log("로그아웃 활동 기록:", logoutLog);
  //   } catch (error) {
  //     console.error("로그아웃 활동 기록 중 오류:", error);
  //   }
  // };

  // // 서버 시간 가져오는 API 호출 (worldtimeapi.org 사용)
  // const fetchServerTime = async () => {
  //   const response = await fetch(
  //     "https://worldtimeapi.org/api/timezone/Asia/Seoul"
  //   );
  //   return response;
  // };

  // 헤더 드롭다운에 마우스 진입시 실행되는 함수
  const onMouseHeaderDropDown = () => {
    // 드롭다운의 가시성을 토글
    setDropdownVisibility(true); // dropdownVisibility를 true로 설정
  };

  // 헤더 드롭다운에서 마우스 이탈시 실행되는 함수
  const onMouseHeaderDropIn = () => {
    // 드롭다운 숨기기
    setDropdownVisibility(false); // dropdownVisibility를 true로 설정
  };

  // 사용자 드롭다운 메뉴의 내용을 렌더링하는 함수
  const renderDropdownContent = () => {
    console.log("드롭다운 내용 렌더링 중");
    return (
      <div>
        {/* 사용자의 "마이페이지"로 이동하는 링크 */}
        <DropdownItem>
          <div>
            <DropdownItemStyledLink
              onClick={() => {
                onClickHeader("/MyPage");
              }}
              className={router.pathname === "/MyPage" ? "selected" : ""}
            >
              마이페이지
            </DropdownItemStyledLink>
          </div>
        </DropdownItem>
        {/* 로그아웃 링크 */}
        <DropdownItem>
          <DropdownItemStyledLink onClick={onClickLogout}>
            로그아웃
          </DropdownItemStyledLink>
        </DropdownItem>
      </div>
    );
  };

  // 질문 드롭다운 메뉴의 내용을 렌더링하는 함수
  const renderDropdownQuestion = () => {
    console.log("질문 드롭다운 내용 렌더링 중");
    return (
      <div>
        {/* "질문방"으로 입장하는 링크 */}
        <DropdownItem>
          <DropdownItemStyledLink
            onClick={() => onClickHeader("/QuestionRoom")}
            className={router.pathname === "/QuestionRoom" ? "selected" : ""}
          >
            질문방 입장
          </DropdownItemStyledLink>
        </DropdownItem>
        {/* 질문 작성 링크 */}
        <DropdownItem>
          <DropdownItemStyledLink onClick={() => onClickHeader("/Write")}>
            질문 작성
          </DropdownItemStyledLink>
        </DropdownItem>
        {/* 질문 수정 링크 */}
        <DropdownItem>
          <DropdownItemStyledLink onClick={() => onClickHeader("/EditPost")}>
            질문 수정
          </DropdownItemStyledLink>
        </DropdownItem>
      </div>
    );
  };

  // 로고에 대한 설정
  const onClickLogo = () => {
    router.push("/");
  };

  return (
    <DynamicNavBarWrapper
      // 헤더 래퍼: 동적 확장 및 드롭다운 가시성
      isLogin={isLoginUserName !== null && isLoginVisible === false} // 로그인 상태를 넘김 (기본이 로그인됨)
      isDropdownVisible={dropdownVisibility} // 드롭다운 상태를 넘김 (dropdownVisibility == true)
      isHovered={isSelected || dropdownVisibility} // 호버 상태를 넘김(isSelected == true || dropdownVisibility == true)
    >
      {/* 로고 */}
      <LogoContainer onClick={onClickLogo}>
        <LogoImage src="/logo.png" alt="로고" />
      </LogoContainer>

      {/* <div
        style={{
          // position: "fixed",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          paddingLeft: "20%",
          paddingRight: "2%",
          // paddingTop: "1%",
        }}
      > */}
      <NavDynamicSize>
        {/* "질문방"으로 이동하는 링크 */}
        <div style={{ margin: "1%" }}>
          {/* 헤더가 확장됨에 따라 요소는 같이 확장시키지 않기 위한 div */}
          <StyledLink
            onClick={() => {
              isLoginUserName === null
                ? alert("로그인 후 시도해주십시오")
                : onClickHeader("/QuestionRoom");
            }}
            onMouseEnter={onMouseHeaderDropDown} // 마우스가 영역에 들어 갔을 때 드롭인
            onMouseLeave={onMouseHeaderDropIn} // 마우스가 영역에 들어 갔을 때 드롭다운
            // 사용자가 로그인한 경우와 버튼이 선택되지 않은 경우에 비활성화
            // disabled={isLogin === true && isSelected === true}
            // 조건에 따라 선택된 스타일 적용
            className={router.pathname === "/QuestionRoom" ? "selected" : ""} // 라우팅 된 페이지가 /QuestionRoom이면 selected
            // style={{ width: "4%" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              질문방
              {/* 사용자가 로그인한 경우 질문 드롭다운 렌더링 */}
              {isLoginUserName && ( // 로그인이 된 경우는 드롭바를 내림
                <StyledDropdown isVisible={dropdownVisibility}>
                  {renderDropdownQuestion()}
                </StyledDropdown>
              )}
            </div>
          </StyledLink>
        </div>

        {/* "지식 공유방"으로 이동하는 링크 */}
        <div style={{ margin: "1%" }}>
          <StyledLink
            onClick={() => {
              onClickHeader("/Study");
            }}
            className={router.pathname === "/Study" ? "selected" : ""}
          >
            스터디
          </StyledLink>
        </div>

        {/* 로그인 버튼 또는 사용자 이름 버튼 */}
        <div style={{ margin: "1%" }}>
          <StyledLink
            onClick={() => {
              if (!isLoginUserName) {
                setIsSelected((prev) => !prev);
                onClickLogin();
              }
            }}
            onMouseEnter={onMouseHeaderDropDown}
            onMouseLeave={onMouseHeaderDropIn}
            // 사용자가 로그인한 경우와 버튼이 선택되지 않은 경우에 비활성화
            // disabled={!!isLoginUserName && !isSelected}
            // 조건에 따라 선택된 스타일 적용
            className={
              (isLoginVisible || (isLoginUserName && isSelected)) &&
              !isLoginUserName
                ? "selected"
                : ""
            }
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <UserOutlined />
              {/* 사용자 이름 환영 메시지 또는 "로그인" 표시 */}
              {isLogin ? `Welcome ${isLoginUserName}!` : "로그인"}
              {/* 사용자가 로그인한 경우 사용자 드롭다운 렌더링 */}
              {isLoginUserName && (
                <StyledDropdown isVisible={dropdownVisibility}>
                  {renderDropdownContent()}
                </StyledDropdown>
              )}
            </div>
          </StyledLink>
        </div>
      </NavDynamicSize>
      {/* 로그인 패널 표시 및 사용자가 로그인하지 않은 경우 로그인 버튼 표시 */}
      {isLoginVisible && !isLoginUserName && <LoginButton />}
    </DynamicNavBarWrapper>
  );
};

export default LayoutHeader;
