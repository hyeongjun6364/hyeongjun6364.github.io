import styled from "@emotion/styled";

export const ContentWrapper = styled.div`
  margin-top: 2%;
  text-align: center;
`;
export const StudyTitleContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  border: 2px solid #5eb6f6;
  padding: 10px 0 30px 0;
  border-radius: 20px;
  margin-bottom: 50px;
`;

export const StudyFormWrapper = styled.form`
  width: 60%;
  margin: 0 auto;

  & > * {
    padding: 1%;
  }
`;

export const StudyTitleInput = styled.input`
  width: 500px;
  height: 40px;
  margin: 10px;
  border-radius: 50px;
  border: 1px solid;
`;

export const SubmitButton = styled.button`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* width: 200px; */
  /* height: 50px; */
  font-size: 20px;
  /* padding: 20px; */
  border: none;
  background-color: #5eb6f6;
  color: #fff;
  border-radius: 5px;
  margin-top: 50px;
  vertical-align: middle;
  cursor: pointer;
`;
