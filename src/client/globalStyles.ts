import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #c5c5c5;
  };

  input, button, textarea {
    font-family: inherit;
  };

  .App {
    width: 100%;
    min-height: 100vh;
    background: url('/assets/images/common/profile-page.jpg') fixed;
  }
`;

export default GlobalStyles;
