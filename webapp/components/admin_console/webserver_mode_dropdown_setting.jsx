// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import * as Utils from 'utils/utils.jsx';

import DropdownSetting from './dropdown_setting.jsx';
import {FormattedMessage} from 'react-intl';

const WEBSERVER_MODE_HELP_TEXT = (
    <div>
        <table
            className='table table-bordered table-margin--none'
            cellPadding='5'
        >
            <tbody>
                <tr>
                    <td>
                        <FormattedMessage
                            id='admin.webserverModeGzip'
                            defaultMessage='gzip'
                        />
                    </td>
                    <td>
                        <FormattedMessage
                            id='admin.webserverModeGzipDescription'
                            defaultMessage='The Commune CC server will serve static files compressed with gzip.'
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <FormattedMessage
                            id='admin.webserverModeUncompressed'
                            defaultMessage='Uncompressed'
                        />
                    </td>
                    <td>
                        <FormattedMessage
                            id='admin.webserverModeUncompressedDescription'
                            defaultMessage='The Commune CC server will serve static files uncompressed.'
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <FormattedMessage
                            id='admin.webserverModeDisabled'
                            defaultMessage='Disabled'
                        />
                    </td>
                    <td>
                        <FormattedMessage
                            id='admin.webserverModeDisabledDescription'
                            defaultMessage='The Commune CC server will not serve static files.'
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <p className='help-text'>
            <FormattedMessage
                id='admin.webserverModeHelpText'
                defaultMessage='gzip compression applies to static content files. It is recommended to enable gzip to improve performance unless your environment has specific restrictions, such as a web proxy that distributes gzip files poorly.'
            />
        </p>
    </div>
);

export default class WebserverModeDropdownSetting extends React.Component {
    render() {
        return (
            <DropdownSetting
                id='webserverMode'
                values={[
                    {value: 'gzip', text: Utils.localizeMessage('admin.webserverModeGzip', 'gzip')},
                    {value: 'uncompressed', text: Utils.localizeMessage('admin.webserverModeUncompressed', 'Uncompressed')},
                    {value: 'disabled', text: Utils.localizeMessage('admin.webserverModeDiabled', 'Disabled')}
                ]}
                label={
                    <FormattedMessage
                        id='admin.webserverModeTitle'
                        defaultMessage='Webserver Mode:'
                    />
                }
                value={this.props.value}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                helpText={WEBSERVER_MODE_HELP_TEXT}
            />
        );
    }
}
WebserverModeDropdownSetting.defaultProps = {
};

WebserverModeDropdownSetting.propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired
};
