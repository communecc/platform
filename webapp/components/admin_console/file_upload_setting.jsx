// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import $ from 'jquery';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Setting from './setting.jsx';

import * as Utils from 'utils/utils.jsx';

export default class FileUploadSetting extends Setting {
    static get propTypes() {
        return {
            id: React.PropTypes.string.isRequired,
            label: React.PropTypes.node.isRequired,
            helpText: React.PropTypes.node,
            uploadingText: React.PropTypes.node,
            onSubmit: React.PropTypes.func.isRequired,
            disabled: React.PropTypes.bool,
            fileType: React.PropTypes.string.isRequired,
            error: React.PropTypes.string
        };
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            fileName: null,
            serverError: props.error
        };
    }

    handleChange() {
        const files = this.refs.fileInput.files;
        if (files && files.length > 0) {
            this.setState({fileSelected: true, fileName: files[0].name});
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        $(this.refs.upload_button).button('loading');
        this.props.onSubmit(this.props.id, this.refs.fileInput.files[0], (error) => {
            $(this.refs.upload_button).button('reset');
            if (error) {
                Utils.clearFileInput(this.refs.fileInput);
            }
            this.setState({fileSelected: false, fileName: null, serverError: error});
        });
    }

    render() {
        let serverError;
        if (this.state.serverError) {
            serverError = <div className='form-group has-error'><label className='control-label'>{this.state.serverError}</label></div>;
        }

        var btnClass = 'btn';
        if (this.state.fileSelected) {
            btnClass = 'btn btn-primary';
        }

        let fileName;
        if (this.state.fileName) {
            fileName = this.state.fileName;
        } else {
            fileName = (
                <FormattedMessage
                    id='admin.file_upload.noFile'
                    defaultMessage='No file uploaded'
                />
            );
        }

        return (
            <Setting
                label={this.props.label}
                helpText={this.props.helpText}
                inputId={this.props.id}
            >
                <div>
                    <div className='file__upload'>
                        <button
                            className='btn btn-default'
                            disabled={this.props.disabled}
                        >
                            <FormattedMessage
                                id='admin.file_upload.chooseFile'
                                defaultMessage='Choose File'
                            />
                        </button>
                        <input
                            ref='fileInput'
                            type='file'
                            disabled={this.props.disabled}
                            accept={this.props.fileType}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button
                        className={btnClass}
                        disabled={!this.state.fileSelected}
                        onClick={this.handleSubmit}
                        ref='upload_button'
                        data-loading-text={`<span class=\'glyphicon glyphicon-refresh glyphicon-refresh-animate\'></span> ${this.props.uploadingText}`}
                    >
                        <FormattedMessage
                            id='admin.file_upload.uploadFile'
                            defaultMessage='Upload'
                        />
                    </button>
                    <div className='help-text no-margin'>
                        {fileName}
                    </div>
                    {serverError}
                </div>
            </Setting>
        );
    }
}
