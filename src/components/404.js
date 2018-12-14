import React from 'react'

export default class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        this.context.router.replace('/')
    }

    render() {
        return <div><span>页面跑丢了 404 异常</span></div>
    }
}
