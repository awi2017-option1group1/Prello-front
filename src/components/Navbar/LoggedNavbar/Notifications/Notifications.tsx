import * as React from 'react'
import { Link } from 'react-router-dom'
import { Label, Popup, PopupContent, MenuItem, Icon, Button, List } from 'semantic-ui-react'
import * as moment from 'moment'
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

        const itemsList = this.props.notifications.map(n => {

            const content = (n.type === 'board_updated') ?
                    `The board ${n.about} has been updated by the user ${n.from}` :
                (n.type === 'card_user_assigned') ?
                    `The user ${n.from} added you to the card ${n.about}` :
                    `The card ${n.about} you are assigned to have been updated by user ${n.from}`

            const link = (n.type === 'board_updated') ?
                    `/boards/${n.about}` :
                (n.type === 'card_user_assigned') ?
                    `/boards/${n.about}` :
                    `/boards/${n.about}`

            return (
                <List.Item key={n.id}>
                    <List.Icon name="block layout" size="large" verticalAlign="middle" />
                    <List.Content>
                        {(n.date) ? moment(n.date, moment.ISO_8601).fromNow() : ''}
                        <List.Header>
                            <Link to={link} className="item">
                                {content}
                            </Link>
                        </List.Header>
                    </List.Content>
                </List.Item>
            )})

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
