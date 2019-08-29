import React from 'react';
import styled from 'styled-components';

const Pickle = styled.span`
  top: 0;
  transition: top .2s ease-in-out .2s, transform .2s ease-in-out 0s;
`
const Cheese = styled.span`
  top: 9px;
  transition: opacity 0s ease-in-out .4s;
`

const Patty = styled.span`
  bottom: 0;
  transition: bottom .2s ease-in-out .2s, transform .2s ease-in-out 0s;
`

const Hamburger = styled.button`
  background: none;
  border: none;
  outline: none;
  height: 21px;
  width: 24px;
  padding: 0;
  margin: 0;
  position: relative;

  ${Pickle}, ${Cheese}, ${Patty} {
    left: 0;
    background-color: #fff;
    height: 3px;
    position: absolute;
    width: 24px;
  }

  &.active {
    ${Pickle} {
      top: 9px;
      transform: rotate(-45deg);
      transition: top .2s ease-in-out 0s, transform .2s ease-in-out .2s;
    }

    ${Cheese} {
      opacity: 0;
      top: 9px;
      transition: opacity 0s ease-in-out .1s;
    }

    ${Patty} {
      bottom: 9px;
      transform: rotate(45deg);
      transition: bottom .2s ease-in-out 0s, transform .2s ease-in-out .2s;
    }
  }
`

const Container = styled.header`
  display: block;
  height: 74px;
  position: relative;
  text-align: center;
  transform: translateZ(0);
  z-index: 1000;

  .title {
    color: #ffffff;
    font-family: Arial;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    line-height: 74px;
    padding: 0 10px;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
  }

  .header-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    left: 8px;
    top: 12px;
    position: absolute;
    z-index: 1001;
  }
`
const Header = ({nav, onToggleNav}) => {
  return (
    <Container>
      <div className="header-actions">
        <Hamburger type="button" className={`action-nav ${nav ? 'active': ''}`} aria-label="Toggle menu" onClick={() => onToggleNav()}>
          <Pickle />
          <Cheese />
          <Patty />
        </Hamburger>
      </div>
      <section className="title">Page title</section>
    </Container>
  );
}

export default Header;