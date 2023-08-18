import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import axios from "axios"; // axios 임포트
const WritePostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 200px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyleButton = styled.button`
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const FontDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  font-size: 14px;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
`;
const SizeDropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
  font-size: 14px;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;
const fontOptions = [
  { label: "기본 글꼴", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier", value: "Courier, monospace" },
  // 원하는 글꼴 옵션을 추가하세요
];

const sizeOptions = [
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  // 원하는 크기 옵션을 추가하세요
];
const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fontStyle, setFontStyle] = useState("Arial, sans-serif");
  const [fontSize, setFontSize] = useState("16px");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tag, setTag] = useState("study");
  const router = useRouter();

  const handleFontChange = (e: any) => {
    setFontStyle(e.target.value);
  };

  const handleSizeChange = (e: any) => {
    setFontSize(e.target.value);
  };
  //파일 불러오기
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // 사용자 정보 조회
      const UserDataResponse = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            query {
              fetchUserLoggedIn {
                email
                name
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (
        UserDataResponse.data.data &&
        UserDataResponse.data.data.fetchUserLoggedIn
      ) {
        const UserData = UserDataResponse.data.data.fetchUserLoggedIn;
        const userName = UserData.name;

        // 여기에서 작성한 글을 서버에 저장하는 로직을 구현
        const saveDataResponse = await axios.post(
          "http://backend-practice.codebootcamp.co.kr/graphql",
          {
            query: `
              mutation {
                createUseditem(createUseditemInput: {
                  name: "${userName}",
                  remarks: "${title}",
                  contents: ${JSON.stringify(content)},
                  price: 0,
                  tags: ["study"],
                  images: ["none"]
                }) {
                  _id
                  name
                  remarks
                  contents
                  price
                  tags
                  images
                }
              }
            `,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        router.push("/QuestionRoom");
      }
    } catch (error) {
      console.error("스터디 등록 에러 발생:", error);
    }
  };

  return (
    <WritePostContainer>
      <h2>글쓰기</h2>
      <form onSubmit={onSubmit}>
        <div>
          <FontDropdown value={fontStyle} onChange={handleFontChange}>
            {fontOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </FontDropdown>
          <SizeDropdown value={fontSize} onChange={handleSizeChange}>
            {sizeOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </SizeDropdown>
        </div>
        <div>
          <label>
            이미지 첨부
            <ImageUploadInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ fontFamily: fontStyle, fontSize: fontSize }}
        />
        <ContentTextarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ fontFamily: fontStyle, fontSize: fontSize }}
        />
        <div>
          {selectedImage && <ImagePreview src={selectedImage} alt="Uploaded" />}
        </div>
        <SubmitButton type="submit">글쓰기</SubmitButton>
      </form>
    </WritePostContainer>
  );
};

export default WritePost;
