import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Router>
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Icebreaker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/">Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/profile">Profile</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/Matches">Matches</Link></NavLink>
              </NavItem>
                 <NavItem>
                <NavLink><Link to="/Friends">Friends</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      <Route exact path="/" component={Home}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/matches" component={Matches}/>
      <Route path="/friends" component={Friends}/>
      </div>
      </Router>
    );
  }
}

import Head from './pages/Head'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Matches from './pages/Matches'
import Friends from './pages/Friends'
