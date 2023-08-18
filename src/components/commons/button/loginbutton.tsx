import React from "react";
// css import
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import palette from "../../../../styles/palette";

// button styling
const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.violet[6]};
  &:hover {
    background: ${palette.violet[4]};
  }
  /* fullWidth props =ture */
  ${(props) =>
    props &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  /* fullWidth cyan =ture */
  ${(props) =>
    props &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;
// Button 에 받아오는 props 를 모두 styledButton 에 전달한다는 의미
const Button = (props: any) => {
  return <StyledButton {...props} />;
};

export default Button;
