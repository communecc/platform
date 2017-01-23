// Copyright (c) 2015 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import * as TextFormatting from 'utils/text_formatting.jsx';
import * as Utils from 'utils/utils.jsx';

import React from 'react';

export default class MessageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.message) {
            const options = Object.assign({}, this.props.options, {
                siteURL: Utils.getSiteURL()
            });

            return (
                <div
                    onClick={Utils.handleFormattedTextClick}
                    dangerouslySetInnerHTML={{__html: TextFormatting.formatText(this.props.message, options)}}
                />
            );
        }

        return <div/>;
    }
}

MessageWrapper.defaultProps = {
    message: ''
};
MessageWrapper.propTypes = {
    message: React.PropTypes.string,
    options: React.PropTypes.object
};
