import React, { Component } from 'react';
import { isFunction } from '../../../shared/utils/Utility/Utility';
import { omit } from 'lodash';

class Anchor extends Component {
    constructor(props) {
        super(props);
        this.anchorRef = null;
    }

    /**
     * On Anchor Click Handler
     * @param {*} e - Event Object
     */
    onClickHandlerEvt = (e) => {
        const { onClikHandler } = this.props;
        if (isFunction(onClikHandler)) {
            onClikHandler(e);
        }
    };

    /**
     * On Anchor Ref Callback
     */
    anchorRefCallBack = (ele) => {
        this.anchorRef = ele;
        const { refCallback } = this.props;
        if (isFunction(refCallback)) {
            refCallback(this.anchorRef);
        }
    }

    /**
     * Render Component
     */
    render() {
        const { axRole, href = '#', children, relkeyword = '', ...rest } = this.props;
        const newProps = omit(rest, ['refCallback', 'onClikHandler']);
        // Added for adding SEO no follow to the footer links
        const relAttr = {};
        // If relkeyword is not empty /follow then add its value in rel attribute
        if (relkeyword && !['follow', 'undefined'].includes(relkeyword)) {
            relAttr['rel'] = relkeyword.toLowerCase();
        }
        // Returning Anchor Element
        return (<a href={href || '#'}  {...relAttr} ref={this.anchorRefCallBack} role={axRole || 'link'} onClick={this.onClickHandlerEvt} {...newProps}>{children}</a>); // eslint-disable-line jsx-a11y/no-redundant-roles
    }
}

// Default Export
export default Anchor;
