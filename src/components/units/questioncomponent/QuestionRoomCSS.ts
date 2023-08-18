import styled from "@emotion/styled";



export const WriteQuestionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right:1%;
`;

export const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;


export const TagButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-right: 100px;
`;

export const QuestionCard = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  cursor:pointer;
  display:flex;
  align-items: center;
`;


export const TextContainer = styled.div`
  flex: 1;
`;

export const ImageContainer = styled.div`
  margin-left: 20px;
`;
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


export const PaginationBox = styled.div`
.pagination { display: flex; justify-content: center; margin-top: 15px;}
ul { list-style: none; padding: 0; }
ul.pagination li {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #e2e2e2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem; 
  margin-top:30px;
}
ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
ul.pagination li.active a { color: white; }
ul.pagination li.active { background-color: #337ab7; }
ul.pagination li a:hover,
ul.pagination li a.active { color: blue; }
`
