import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    color: white;
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: 'Sarala', sans-serif;
  }

  body {
    background: ${colors.backgroundPrimary};
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;
