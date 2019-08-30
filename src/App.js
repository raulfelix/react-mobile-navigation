import React, {useState} from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import Header from './Header';
import Background from './Background';
import Media from './Media';

const Container = styled.div`
  bottom: 0; 
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 300ms cubic-bezier(0.65, 0.05, 0.36, 1);
  z-index: 2;

  @media ${Media.small} {
    ${({isActive}) => isActive && `
      transform: translate3d(calc(100vw - 70px), 0, 0);
    `}
  }

  @media ${Media.medium} {
    ${({isActive}) => isActive && `
      transform: translate3d(260px, 0, 0);
    `}
  }
`

const Content = styled.div`
  padding: 16px;
`

const Foreground = styled.div`
  bottom: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`

const Overlay = styled.div`
  background-color: rgba(0,0,0,0.4);
  backface-visibility: hidden;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: opacity 200ms 0s, visibility 0s .2s;

  ${({isActive}) => isActive && `
    opacity: 1;
    visibility: visible;
    transition: opacity 0s 0s, visibility 0s 0s;
  `}
`
function App() {
  const [nav, setNav] = useState(false)

  return (
    <>
      <Background />
      <Foreground>
        <Container isActive={nav}>
          <Navigation navOpen={nav} />
          <Header
            nav={nav}
            onToggleNav={() => setNav(!nav)}
          />
          <Content>
            Magic...
          </Content>
          <Overlay isActive={nav} />
        </Container>
      </Foreground>
    </>
  );
}

export default App;
