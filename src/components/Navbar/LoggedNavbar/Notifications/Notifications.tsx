import * as React from 'react'
import { Link } from 'react-router-dom'
import { Label, Popup, PopupContent, Item, MenuItem, Icon, Button } from 'semantic-ui-react'
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
            <Item key={n.id}>
                <Item.Content verticalAlign="middle">
                    <Label
                        color="grey"
                        circular={true}
                        content={1}
                    />
                    <Link to={'/boards/' + n.about} className="item">
                        The board {n.about} has been updated by the user {n.from}
                    </Link>
                </Item.Content>
            </Item>
        ))

        const UserMenu = (
            <MenuItem>
                <Icon name="alarm"/>
                Notifications
                <Label
                    color="grey"
                    circular={true}
                    content={this.props.notifications.length}
                />
            </MenuItem>
        )

        const popup = (
            <Popup trigger={UserMenu} on="click" position="bottom center" id="navbar-more">
                <PopupContent>
                    <Item.Group divided={true}>
                        {itemsList}
                        <Item>
                            <Item.Content verticalAlign="middle">
                                <Button
                                    color="red"
                                    circular={true}
                                    content={'Mark all as read'}
                                    fluid={true}
                                    onClick={this.props.deleteUserNotifications}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
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

        return (
            <div className="notif-container">
                {(this.props.notifications.length === 0) ? menuItem : popup}
            </div>
        )
    }
}

export default Notifications
