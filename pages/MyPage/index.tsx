// pages/MyPage/index.tsx
import React, { useEffect, useState } from "react";
import {
  RowContainer,
  SquareComponent,
  SquareComponentContainer,
  EnlargedContent,
} from "../../src/components/units/mypage/MyPageCss";
import MyPageLayout from "../../src/components/units/mypage/MyPageLayout";
import WhenToMeet from "../../src/components/units/mypage/WhenToMeet";
import Challenge from "../../src/components/units/mypage/Challenge";
import TodayStudyLog from "../../src/components/units/mypage/TodayStudyLog";
import AllStudyLog from "../../src/components/units/mypage/AllStudyLog";

const user = {
  id: 1,
  username: "exampleUser",
  loginTime: new Date("2023-08-09T09:00:00"), // Replace with actual login time
};

const calculateActivityTime = () => {
  const currentTime = new Date();
  // const timeDifference = currentTime - user.loginTime;
  // const minutes = Math.floor(timeDifference / 60000); // Convert to minutes
  // return minutes;
};

const MyPage = (): JSX.Element => {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [enterTime, setEnterTime] = useState(null); // 사용자가 방에 입장한 시간

  useEffect(() => {
    // 사용자가 질문방 페이지로 접속한 경우, localStorage에 저장된 입장 시간을 가져옴
    const fetchEnterTime = () => {
      const storedEnterTime = localStorage.getItem("enterTime");
      if (storedEnterTime) {
        // setEnterTime(new Date(storedEnterTime));
      }
    };

    fetchEnterTime();
  }, []);

  return (
    <MyPageLayout>
      <SquareComponentContainer>
        <RowContainer>
          <SquareComponent
            onClick={() => {
              selectedComponent === "StudyLog"
                ? setSelectedComponent("") // 선택한 컴포넌트 클릭시 true면 빈 문자열로 만들어 확장된 창을 닫고
                : setSelectedComponent("StudyLog"); // false이면 선택한 컴포넌트로 만들어 창을 확장
            }}
            active={selectedComponent === "StudyLog"} // SquareComponent에 active props를 넘김(확장 관련)
          >
            {selectedComponent === "StudyLog" ? (
              <EnlargedContent>
                <h3>오늘 공부 시간</h3>
                <p>활동 시간: {calculateActivityTime()} 분</p>
              </EnlargedContent>
            ) : (
              <TodayStudyLog />
            )}
          </SquareComponent>
          <SquareComponent
            onClick={() => {
              selectedComponent === "AllStudyLog"
                ? setSelectedComponent("")
                : setSelectedComponent("AllStudyLog");
            }}
            active={selectedComponent === "AllStudyLog"}
          >
            {selectedComponent === "AllStudyLog" ? (
              <EnlargedContent>
                <h3>전체 공부 시간</h3>
                <p>활동 시간: {calculateActivityTime()} 분</p>
              </EnlargedContent>
            ) : (
              <AllStudyLog />
            )}
          </SquareComponent>
        </RowContainer>
        <RowContainer>
          <SquareComponent
            onClick={() => {
              selectedComponent === "WhenToMeet"
                ? setSelectedComponent("")
                : setSelectedComponent("WhenToMeet");
            }}
            active={selectedComponent === "WhenToMeet"}
          >
            {selectedComponent === "WhenToMeet" ? (
              <EnlargedContent>
                <h1>Hello</h1>
              </EnlargedContent>
            ) : (
              <WhenToMeet />
            )}
          </SquareComponent>
          <SquareComponent
            onClick={() => {
              selectedComponent === "challenge"
                ? setSelectedComponent("")
                : setSelectedComponent("challenge");
            }}
            active={selectedComponent === "challenge"}
          >
            {selectedComponent === "challenge" ? (
              <EnlargedContent>
                <h3>도전과제</h3>
              </EnlargedContent>
            ) : (
              <Challenge />
            )}
          </SquareComponent>
        </RowContainer>
      </SquareComponentContainer>
    </MyPageLayout>
  );
};

export default MyPage;
