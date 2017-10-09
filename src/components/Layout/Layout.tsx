import * as React from 'react'

import Header from '../Header'
import Footer from '../Footer'

class LayoutProps {
    children: React.ReactNode
}

const Layout: React.StatelessComponent<LayoutProps> = (props) => (
    <div>
        <Header />

        <main>
            {props.children}
        </main>

        <Footer />
    </div>
)

export default Layout
