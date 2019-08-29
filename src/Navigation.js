import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import NavLink from './NavLink';

const Brand = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  padding: 0 16px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`
const Identity = styled.div`
  color: #fff;
  padding-left: 60px;
`

const NavHeader = styled.div`
  background-color: rgba(0,0,0,0.4);
  padding: 40px 20px;

  .avatar {
    position: absolute;
  }
  .text-1 {
    font-size: 20px;
    margin: 0 0 4px 0;
    line-height: 1.3;
  }
  .text-2 {
    color: #7A7A7A;
    font-size: 14px;
    margin: 0 0 0 0;
  }
`

const NavContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(100vw - 70px);
  transform: translate3d(-100%, 0, 0);
`
const NavSection = styled.div`
  background-color: rgba(255,255,255, 0.2);
  height: 1px;
  margin: 0 0 0 16px;
`
const Nav = styled.nav`
  height: 100vh;
  position: absolute;
  transform: translateZ(0);
`
export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._initLinkState();
    this.$el = document.getElementById('shell-wrap');
    this.onRouteChange = this.onRouteChange.bind(this);
  }

  render() {
    return (
      <Nav>
        <NavContainer>
          <NavHeader>
            <Avatar name="CK" />
            <Identity>
              <p className="text-1">Clark Kent</p>
              <p className="text-2">Watchgful protector</p>
            </Identity>
          </NavHeader>
          <NavLink name="Navigation item 1" />
          <NavLink name="Navigation item 2" />
          <NavLink name="Navigation item 3" />
          <NavSection />
          <NavLink name="Logout" />
          <Brand>
            <span className="app-logo">Logo</span>
            <span className="text">App name</span>
          </Brand>
        </NavContainer>
      </Nav>
    );
  }

  /**
   * Navigate to a named route when a link
   * is selected.
   * @param  {string} route
   */
  onNavigate(route) {
    this.closeDraw();
  }

  /**
   * Callback triggered from router
   * whenever a route changes so that we
   * update the link states.
   * @param  {string} route
   */
  onRouteChange(route) {
    let o = this._initLinkState();
    o[route] = true;
    this.setState(o);
  }

  /**
   * Log out.
   */
  onLogoff() {
    this.closeDraw();
  }

  getClass(key) {
    return this.state[key] ? 'is-active': '';
  }

  closeDraw() {
    this.$el.classList.remove('nav-active');
  }

  _initLinkState() {
    var o = {};
    o['WAITING'] = false;
    o['SERVING'] = false;
    o['PAUSED'] = false;
    return o;
  }

  /**
   * Update the queue list counts when
   * the navigation draw is activated.
   */
  onNavDrawOpen() {
    
  }
}