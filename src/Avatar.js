import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-position: center;
  background-size: 100%;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center; 
  position: relative;
  vertical-align: middle;
`

const Avatar = ({ name }) => (
  <Container className="avatar">{name}</Container>
)

export default Avatar;