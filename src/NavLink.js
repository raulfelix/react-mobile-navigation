import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: #fff;
  display: block;
  height: 50px;
  line-height: 50px;
  padding: 0 2em;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  white-space: nowrap;
`
const NavLink = ({path = '', name}) => (
  <Link href={path}>{name}</Link>
)

export default NavLink;
