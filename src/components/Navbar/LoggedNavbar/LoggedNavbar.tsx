import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
    Icon,
    Item,
    ItemContent,
    ItemGroup,
    ItemHeader,
    ItemMeta,
    Menu,
    MenuItem,
    MenuMenu,
    Popup,
    PopupContent,
} from 'semantic-ui-react'

import { ILoggedUser } from '../../../redux/users/types'

import Avatar from '../../common/Avatar/Avatar'
import SearchBar from '../../SearchBar'
import Notifications from './Notifications'

import './LoggedNavbar.css'

class LoggedNavbarProps {
    user: ILoggedUser
}

class LoggedNavbar extends React.Component<LoggedNavbarProps> {
    constructor(props: LoggedNavbarProps) {
        super(props)
    }

    renderMenuItem() {
        return (
            <MenuItem>
                <Avatar user={this.props.user} />
            </MenuItem>
        )
    }

    render() {
        return (
            <Menu stackable={true}>
                <MenuItem header={true}>Prello</MenuItem>
                <NavLink to="/overview" className="item" activeClassName="">
                    <Icon name="home" />
                    Home
                </NavLink>
                <NavLink to="/overview" className="item" activeClassName="">
                    <Icon name="block layout" />
                    Boards
                </NavLink>
                <NavLink to="/team" className="item disabled" activeClassName="">
                    <Icon name="users" />
                    Teams
                </NavLink>
                <MenuItem>
                    <SearchBar userID={this.props.user.uid}/>
                </MenuItem>
                <MenuMenu position="right">
                    <Notifications />
                    <Popup
                        trigger={this.renderMenuItem()}
                        on="click"
                        position="bottom center"
                        id="navbar-more"
                    >
                        <PopupContent>
                            <ItemGroup>
                            <Item>
                                <ItemContent>
                                    <ItemHeader className="header">{this.props.user.username}</ItemHeader>
                                    <ItemMeta className="meta">{this.props.user.email}</ItemMeta>
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
                                <Link to="/profile#notifications" className="item disabled">
                                    <Icon name="alarm" />
                                    Notifications
                                </Link>
                                <Link to="/profile/settings" className="item disabled">
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
    }
}

export default LoggedNavbar
