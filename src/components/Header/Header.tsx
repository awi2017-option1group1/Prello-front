import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, MenuItem, MenuMenu, Icon, Label, Image, Popup, PopupContent, 
    ItemGroup, Item, ItemImage, ItemContent, ItemHeader, ItemMeta } from 'semantic-ui-react'

import SearchBar from '../SearchBar'

const UserMenu = (
    <MenuItem>
        <Image avatar={true} src="https://semantic-ui.com/images/wireframe/square-image.png" />
        John Doe
    </MenuItem>
)

const LoggedMenu: React.StatelessComponent = () => (
    <Menu stackable={true}>
        <MenuItem header={true}>Prello</MenuItem>
        <NavLink to="/" exact={true} className="item" activeClassName="active">
            <Icon name="home" />
            Home
        </NavLink>
        <NavLink to="/board" className="item" activeClassName="active">
            <Icon name="block layout" />
            Boards
        </NavLink>
        <NavLink to="/team" className="item" activeClassName="active">
            <Icon name="users" />
            Teams
        </NavLink>
        <MenuItem>
            <SearchBar />
        </MenuItem>
        <MenuMenu position="right">
            <Link to="/profile#notifications" className="item">
                <Icon name="alarm" />
                Notifications
                <Label circular={true} color="grey" content="0" />
            </Link>
            <Popup trigger={UserMenu} on="click" position="bottom center">
                <PopupContent>
                    <ItemGroup>
                    <Item>
                        <ItemImage 
                            avatar={true} 
                            size="mini"
                            src="https://semantic-ui.com/images/wireframe/square-image.png" 
                        />
                        <ItemContent>
                            <ItemHeader className="header">John Doe</ItemHeader>
                            <ItemMeta className="meta">john.doe@example.com</ItemMeta>
                        </ItemContent>
                    </Item>
                    </ItemGroup>
                    <Menu vertical={true}>
                        <Link to="/profile" className="item">
                            <Icon name="unhide" />
                            Profile
                        </Link>
                        <Link to="/profile/update" className="item">
                            <Icon name="user" />
                            Update my profile
                        </Link>
                        <Link to="/profile#notifications" className="item">
                            <Icon name="alarm" />
                            Notifications
                        </Link>
                        <Link to="/profile/settings" className="item">
                            <Icon name="settings" />
                            Settings
                        </Link>
                        <Link to="/logout" className="item">
                            <Icon name="sign out" />
                            Logout
                        </Link>
                    </Menu>
                </PopupContent>
            </Popup>
        </MenuMenu>
    </Menu>    
)

const Header: React.StatelessComponent = () => (
    <header>
        <LoggedMenu />
    </header>
)

export default Header
