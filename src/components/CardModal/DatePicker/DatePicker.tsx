import * as React from 'react'
import { StateProps } from '../../StateProps'
import { Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import * as moment from 'moment'
import { ICard } from '../../../redux/cards/types'

import './DatePicker.css'

export interface DatePickerProps extends StateProps {
    card: ICard
    currentMoment: moment.Moment
    setDueDate: (date: moment.Moment) => void
}

class DatePickerComponent extends React.Component<DatePickerProps> {

    constructor(props: DatePickerProps) {
        super(props)
    }

    render() {
        return (
            <DatePicker
                selected={(this.props.card.due) ? moment(this.props.card.due, 'dd-mm-yyyy') : this.props.currentMoment}
                onChange={this.props.setDueDate}
                customInput={<Button
                    content="Add due date"
                    icon="calendar"
                    labelPosition="left"
                    primary={true}
                    circular={true}
                    fluid={true}
                />}
                popperPlacement="top-start"
            />
        )
    }
}

export default DatePickerComponent
