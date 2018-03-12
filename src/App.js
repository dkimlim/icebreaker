import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {
  Button,
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

import Head from './pages/Head'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Matches from './pages/Matches'
import Potentials from './pages/Potentials'
import Chats from './pages/Chats'
import axios from 'axios';
import Filters from './pages/Filters'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      potentials:[]
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
          <NavbarBrand><Link to="/">Icebreaker</Link></NavbarBrand>
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
                <NavLink><Link to="/Potentials">Potentials</Link></NavLink>
              </NavItem>
                 <NavItem>
                <NavLink><Link to="/Chats">Chats</Link></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

      <Route exact path="/" component={Home}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/filters" component={Filters}/>
      <Route path="/potentials" component={Potentials}/>
      <Route path="/chats" component={Chats}/>

      </div>
      </Router>
    );
  }
}


