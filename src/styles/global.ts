import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
  * {
    background: ${colors.backgroundPrimary};
    box-sizing: border-box;
    color: white;
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: 'Sarala', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }
`;
