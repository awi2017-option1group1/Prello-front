import * as React from 'react'
import { Link } from 'react-router-dom'
import { Label, Popup, PopupContent, MenuItem, Icon, Button, List } from 'semantic-ui-react'
import { INotification } from '../../../../redux/notifications/types'

import './Notifications.css'

class NotifDropDownProps {
    notifications: INotification[]
    loadData?: () => void
    deleteUserNotifications: () => void
}

class Notifications extends React.Component<NotifDropDownProps> {

    constructor(props: NotifDropDownProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }
    
    createGroupedNotifications (notifications: INotification[]): [{notif: INotification, quantity: number}] {
        let grouped: [{notif: INotification, quantity: number}] =
            [{notif: notifications[0], quantity: 1}]
        notifications.map(n => {
            const foundIndex = grouped.findIndex((x) => {
                return x.notif.about === n.about
            })
            if (!foundIndex) {
                grouped.push({notif: n, quantity: 0})
            } else {
                grouped[foundIndex].quantity++
            }
        })
        return grouped
    }

    render() {
        // const groupedNotifications = this.createGroupedNotifications(this.props.notifications)

        const itemsList = this.props.notifications.map(n => (
            <List.Item key={n.id}>
                <List.Icon name="block layout" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header>
                        <Link to={'/boards/' + n.about} className="item">
                            The board {n.about} has been updated by the user {n.from}
                        </Link>
                    </List.Header>
                </List.Content>
            </List.Item>
        ))

        const UserMenu = (
            <MenuItem>
                <Icon name="alarm"/>
                Notifications
                {this.props.notifications.length === 0 && <Label
                    color="grey"
                    circular={true}
                    content="0"
                />}
                {this.props.notifications.length > 0 && <Label
                    color="red"
                    circular={true}
                    content={this.props.notifications.length}
                />}    
            </MenuItem>
        )

        const popup = (
            <Popup trigger={UserMenu} on="click" position="bottom center" id="navbar-more">
                <PopupContent>
                    <List divided={true} relaxed={true}>
                        {itemsList}
                    </List>
                    <Button
                        primary={true}
                        circular={true}
                        content={'Mark all as read'}
                        fluid={true}
                        onClick={this.props.deleteUserNotifications}
                    />
                </PopupContent>
            </Popup>
        )

        const menuItem = (
            <div className="item">
                <Icon name="alarm" />
                Notifications
                <Label circular={true} color="grey" content="0" />
            </div>
        )

        if (this.props.notifications.length === 0) {
            return menuItem
        } else {
            return popup
        }
    }
}

export default Notifications
