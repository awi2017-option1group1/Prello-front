import * as React from 'react'
import { Loader } from 'semantic-ui-react'

import './spinner.css'

const Spinner: React.StatelessComponent = () => (
    <div className="loader-container">
        <Loader active={true} />
    </div>
)

export default Spinner
