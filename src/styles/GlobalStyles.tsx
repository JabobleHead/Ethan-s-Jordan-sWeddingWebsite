import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: 300;
    font-size: 15px;
    line-height: 1.85;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
  }

  :focus {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.burgundy};
    outline-offset: 3px;
    border-radius: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
