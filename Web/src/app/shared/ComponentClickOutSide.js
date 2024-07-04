import React from 'react';
import ReactDOM from 'react-dom';
export default class ComponentClickOutSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillReceiveProps(props) {
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
        if ((!domNode || !domNode.contains(event.target))&&!this.props.disableClickOutSide) {
            this.props.handleClickOutside()
        }
    }
    render() {
        return (
            <div className='component-click-outSide' style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}