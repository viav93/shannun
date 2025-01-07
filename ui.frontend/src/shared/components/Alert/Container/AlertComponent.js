import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertCompItems from '../Presentation/AlertCompItems';
import { omit } from 'lodash';

/**
 * Alert Component Container
 */
class AlertComponent extends Component {
    constructor(props){
        super(props);
        this.alertRef = null;
    }

    componentDidMount = () => {
        const { removeRoleAttribute = false } = this.props;
        if(removeRoleAttribute){
            const alertDomNode = ReactDOM.findDOMNode(this);
            if(alertDomNode && alertDomNode instanceof HTMLElement){
                alertDomNode.removeAttribute('role');
            }
        }
    }

    render() {
        const newProps = omit(this.props, 'removeRoleAttribute');
        return (
            <AlertCompItems
                {...newProps}
            />
        )
    }
}

// default export
export default AlertComponent;