// src/components/commons/layout/index.tsx
import { useRouter } from "next/router";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";

import styled from "@emotion/styled";

// const HIDDEN_HEADERS = [
//   // "/MyPage"
// ];

// const HIDDEN_FOOTER = [
//   //"/queryroom"
// ];

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  /* overflow: hidden; */
`;

const ContentWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  min-height: calc(
    100vh - 115px - 50px
  ); /* Account for header and footer heights */
  padding-top: 115px; /* Set to the same height as the header */
  padding-bottom: 50px; /* Set to the height of the footer */
  overflow-y: auto; /* Enable vertical scrolling for the content */

  @media (max-width: 768px) {
    /* Adjust styles for smaller screens */
  }
`;

// const ContentWrapper = styled.div<{ HeaderSize: boolean }>`
//   // 레아이웃 중 바디의 CSS 설정
//   position: relative;
//   top: 0;
//   left: 0;
//   min-height: calc(
//     100vh - ${({ HeaderSize }) => (HeaderSize ? "0" : "100%")} - 50%
//   );
//   padding-top: ${({ HeaderSize }) => (HeaderSize ? "0" : "70%")};
//   padding-bottom: 50px;
//   overflow-y: auto;

//   /* Adjust for header navigation bar */
//   @media (min-height: 320px) {
//     position: relative;
//     top: 0;
//     left: 0;
//     min-height: calc(
//       100vh - ${({ HeaderSize }) => (HeaderSize ? "0" : "70px")} - 50px
//     );
//     padding-top: ${({ HeaderSize }) => (HeaderSize ? "0" : "70px")};
//     padding-bottom: 50px;
//     overflow-y: auto;
//   }
// `;

const FootWrapper = styled.div`
  width: 100%;
  height: 50px; /* Set to the height of the footer */
  bottom: 0;
`;

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  console.log("===========");
  console.log(router.asPath);
  console.log("===========");

  // const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath); // 헤더를 숨길 페이지 경로 (지금은 숨길 페이지가 없으니 모든 페이지)
  // const isHiddenFooter = HIDDEN_FOOTER.includes(router.asPath);

  return (
    <Wrapper>
      <LayoutHeader />
      <ContentWrapper>{props.children}</ContentWrapper>
      <FootWrapper>
        <LayoutFooter />
      </FootWrapper>
    </Wrapper>
  );
}
