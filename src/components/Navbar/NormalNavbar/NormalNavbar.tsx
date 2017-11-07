import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, MenuItem, MenuMenu, Icon, Button } from 'semantic-ui-react'

const UnloggedNavbar: React.StatelessComponent = () => (
    <Menu stackable={true}>
        <MenuItem header={true}>Prello</MenuItem>
        <NavLink to="/" exact={true} className="item" activeClassName="active">
            <Icon name="home" />
            Home
        </NavLink>
        <NavLink to="/about-us" className="item" activeClassName="active">
            <Icon name="hand peace" />
            About
        </NavLink>
        <MenuMenu position="right">
            <Menu.Item>
                <Button circular={true} as={Link} primary={true} to="/register">Register</Button>
                <a className="ui button circular" href="/auth/login">Login</a>
          </Menu.Item>
        </MenuMenu>
    </Menu>    
)

export default UnloggedNavbar
