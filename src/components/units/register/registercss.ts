import styled from "@emotion/styled";
import palette from "../../../../styles/palette";

// 회원가입 레이아웃 담당
export const AuthTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center align content vertically */
  align-items: center; /* Center align content horizontally */
  margin-top: 30px; /* Add some margin at the top for better positioning */
  margin-left: 30px;
`;

// white box

export const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    /* 글자 간격 */
    letter-spacing: 2px;
  }
`;

// 회원가입 or 로그인폼 보여줌.

export const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

// button margin
export const ButtonWithMarinTop = styled.button`
  margin-top: 1rem;
`;

// styled input

export const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  /* Scss 에서 쓰는 요소가 서로 반복될 때 margin-top 을 줌 >>> input 과 input 사이에 margin-top 줌. */
  & + & {
    margin-top: 1rem;
  }
`;
