import { createGlobalStyle } from 'styled-components';
import Pricedown from 'fonts/pricedown.ttf';

const devBg =
    typeof process !== 'undefined' &&
    process.env &&
    process.env.NODE_ENV !== 'production';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pricedown';
    src: url(${Pricedown});
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-enter-active {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-exit-active {
    transition: opacity 500ms;
  }

  /* Mantine mounts color scheme on <html>; body uses var(--mantine-color-body).
     Keep viewport transparent in-game (resolved via cssVariablesResolver + fallbacks below). */
  :root,
  html {
    color-scheme: normal !important;
  }

  :root,
  html,
  html[data-mantine-color-scheme='dark'],
  html[data-mantine-color-scheme='light'] {
    background-color: ${devBg ? '#1e1e1e' : 'rgba(0, 0, 0, 0)'} !important;
    background: ${devBg ? '#1e1e1e' : 'rgba(0, 0, 0, 0)'} !important;
  }

  html,
  body {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    background-color: ${devBg ? '#1e1e1e' : 'rgba(0, 0, 0, 0)'} !important;
    background: ${devBg ? '#1e1e1e' : 'rgba(0, 0, 0, 0)'} !important;
  }

  #app {
    background: ${devBg ? '#1e1e1e' : 'rgba(0, 0, 0, 0)'} !important;
    background-color: ${devBg ? '#1e1e1e' : 'rgba(0, 0, 0, 0)'} !important;
    /* Critical for FiveM: let mouse events reach gameplay when overlay is logically empty */
    pointer-events: none !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  *::-webkit-scrollbar {
    width: 0;
  }

  /* Menu list scrollbar — slim, tinted to brand purple */
  .pulsar-menu-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .pulsar-menu-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      rgba(122, 34, 201, 0.55),
      rgba(201, 125, 255, 0.35)
    );
    border-radius: 99px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  .pulsar-menu-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      180deg,
      rgba(122, 34, 201, 0.75),
      rgba(201, 125, 255, 0.5)
    );
  }
  .pulsar-menu-scroll::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.35);
    border-radius: 99px;
  }
`;

export default GlobalStyle;
