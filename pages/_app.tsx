// /pages/_app.tsx
import type { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import { Global, css } from "@emotion/react";
import { RecoilRoot } from "recoil";



const globalStyles = css`
  body {
    margin: 0; // 기본 마진 8px를 삭제하기 위하여
  }

  * {
    // 모든 스타일에 대해서 적용
    font-family: "myfont";
  }

  @font-face {
    font-family: "myfont"; // 이 뒤에 폰트 요소를 추가하여 순위를 줄 수 있음
    src: url("/fonts/ArialCEItalic.ttf");
  }

  @font-face {
    font-family: "Cafe24Ohsquare-v2.0";
    src: url("/fonts/Cafe24Ohsquare-v2.0.otf") format("opentype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </RecoilRoot>
  );
}
