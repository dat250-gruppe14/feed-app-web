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

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;
