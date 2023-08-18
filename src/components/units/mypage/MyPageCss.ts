// pages/MyPage/MyPageCss.ts
import styled from "@emotion/styled";

// 마이페이지 기본 틀
export const MyPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 사이드바 컨테이너 설정
export const SidebarContainer = styled.div`
  margin-top: 8%;
  margin-left: 3%;
  width: 20%;
  justify-content: center;
`;

// 사이드 바 요소 설정
export const SidebarTab = styled.div<{
  selected: boolean;
}>`
  // props.selected를 미리 정의
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  background-color: ${({ selected }) => (selected ? "#5eb6f6" : "#f8f9fa")};
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  color: ${({ selected }) => (selected ? "#ffffff" : "#495057")};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }

  a:visited {
    text-decoration: none;
    color: inherit;
  }
`;

// 내용 부분 컨테이너
export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 13%;
  flex: 2;
`;

// 사각형 컴포넌트 기본 컨테이너
export const SquareComponent = styled.div<{
  active: boolean;
}>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  /* 위에는 기본 박스 설정 */
  flex-basis: calc(50% - 10px);
  min-height: 150px;
  border-top: 3px solid #5eb6f6;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: box-shadow 0.3s ease;

  ${({ active }) =>
    active &&
    `
    height: 49%;
    width: 46%;
    position: absolute;
    left: 37%;
    top: 18%;
    transform: translate(0%, 0%);
    z-index: 1;
    animation: expandAnimation 0.5s ease-in-out forwards, 
               positionAnimation 0.5s ease-in-out forwards, 
               hideOtherComponents 0.5s ease-in-out forwards,
               adjustOtherComponents 0.5s ease-in-out forwards;
  `}

  @keyframes expandAnimation {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.03) rotate(2deg);
    }
    50% {
      transform: scale(1.05) rotate(-2deg);
    }
    75% {
      transform: scale(1.03) rotate(2deg);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes hideOtherComponents {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

  @keyframes adjustOtherComponents {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// 사각형 컴포넌트의 위치 컨테이너
export const SquareComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%; /* Adjust the width as needed */
`;

// 사각형 컴포넌트 2개씩 보여주는 컨테이너
export const RowContainer = styled.div`
  display: flex;
  gap: 10%;
  margin-bottom: 20px;
`;

// 확대된 내용 컨텐츠
export const EnlargedContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
