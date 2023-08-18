import styled from "@emotion/styled";
import palette from "../../../../styles/palette";
import Button from "../../../components/commons/button/loginbutton";

export const LoginWrapper = styled.div`
  position: fixed; // 어떤 페이지든 상관 없게 위치를 고정
  z-index: 1; // 가장 우선순위를 높게 만듬
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    position: fixed; // 어떤 페이지든 상관 없게 위치를 고정
    z-index: 1; // 가장 우선순위를 높게 만듬
    /* width: 100%; */
    max-width: 150px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    position: fixed; // 어떤 페이지든 상관 없게 위치를 고정
    z-index: 1; // 가장 우선순위를 높게 만듬
    /* width: 100%; */
    max-width: 150px;
  }
`;

export const LoginFormWrapper = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  /* &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 27%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  } */

  @media (max-width: 768px) {
    width: calc(100% - 10px);
    transform: none;
    margin-top: 80%;
    margin-left: -55%;
    &::before {
      content: "";
      position: absolute;
      bottom: 71%;
      left: 5%;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #ffffff transparent;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: calc(100% - 20px);
    transform: none;
    margin-top: 80%;
    margin-left: -55%;
    &::before {
      content: "";
      position: absolute;
      bottom: 71%;
      left: 5%;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #ffffff transparent;
    }
  }

  @media (min-width: 1025px) {
    width: calc(100% - 250px);
    transform: none;
    margin-top: 30%;
    margin-left: 40%;
    &::before {
      content: "";
      position: absolute;
      bottom: 71%;
      left: 65%;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #ffffff transparent;
    }
  }
`;

export const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
  background-color: ${(props) => (props.disabled ? "#f2f2f2" : "#5eb6f6")};
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.gray[7]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;
