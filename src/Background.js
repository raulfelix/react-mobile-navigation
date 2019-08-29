import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  right: 0;
  z-index: 1;
  background: rgb(41,63,111);
  background: linear-gradient(180deg, rgb(189, 89, 238) 0%, #003296 100%);
`

export default function() {
  return (
    <Container />
  )
}