import React from 'react'

const ExampleHoC = WrappedComponent => class extends React.PureComponent {
  render () {
    return <WrappedComponent {...this.props} />
  }
}
export default ExampleHoC
