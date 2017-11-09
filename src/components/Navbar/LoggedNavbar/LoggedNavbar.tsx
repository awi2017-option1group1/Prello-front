import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, MenuItem, MenuMenu, Icon, Image, Label, Popup, PopupContent,
    ItemGroup, Item, ItemImage, ItemContent, ItemHeader, ItemMeta } from 'semantic-ui-react'

import { ILoggedUser } from '../../../redux/users/types'

import SearchBar from '../../SearchBar'

import './LoggedNavbar.css'

class LoggedNavbarProps {
    user: ILoggedUser
}

const UserMenu = (
    <MenuItem>
        <Image avatar={true} src="https://semantic-ui.com/images/wireframe/square-image.png" />
    </MenuItem>
)

const LoggedNavbar: React.StatelessComponent<LoggedNavbarProps> = (props) => (
    <Menu stackable={true}>
        <MenuItem header={true}>Prello</MenuItem>
        <NavLink to="/overview" className="item" activeClassName="active">
            <Icon name="home" />
            Home
        </NavLink>
        <NavLink to="/overview" className="item" activeClassName="active">
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
            <Popup trigger={UserMenu} on="click" position="bottom center" id="navbar-more">
                <PopupContent>
                    <ItemGroup>
                    <Item>
                        <ItemImage
                            avatar={true}
                            size="mini"
                            src="https://semantic-ui.com/images/wireframe/square-image.png"
                        />
                        <ItemContent>
                            <ItemHeader className="header">{props.user.username}</ItemHeader>
                            <ItemMeta className="meta">{props.user.email}</ItemMeta>
                        </ItemContent>
                    </Item>
                    </ItemGroup>
                    <Menu vertical={true}>
                        <Link to="/profile" className="item">
                            <Icon name="user" />
                            Profile
                        </Link>
                        <Link to="/profile#notifications" className="item">
                            <Icon name="alarm" />
                            Notifications
                        </Link>
                        <Link to="/profile/settings" className="item">
                            <Icon name="settings" />
                            Settings
                        </Link>
                        <a href="/auth/logout" className="item">
                            <Icon name="sign out" />
                            Logout
                        </a>
                    </Menu>
                </PopupContent>
            </Popup>
        </MenuMenu>
    </Menu>
)

export default LoggedNavbar
