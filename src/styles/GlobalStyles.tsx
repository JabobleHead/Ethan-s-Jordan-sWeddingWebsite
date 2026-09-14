import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/background.png';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
    background-color: ${({ theme }) => theme.colors.cream};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: 300;
    font-size: 15px;
    line-height: 1.85;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Fixed page background. A pseudo-element is used instead of
     background-attachment: fixed, which iOS Safari ignores. The cream
     wash keeps dark text readable over the photo. */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(rgba(250, 247, 244, 0.62), rgba(250, 247, 244, 0.62)),
      url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
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
