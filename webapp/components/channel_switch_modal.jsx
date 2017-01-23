// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import SuggestionList from './suggestion/suggestion_list.jsx';
import SuggestionBox from './suggestion/suggestion_box.jsx';
import SwitchChannelProvider from './suggestion/switch_channel_provider.jsx';

import {FormattedMessage} from 'react-intl';
import {Modal} from 'react-bootstrap';

import ChannelStore from 'stores/channel_store.jsx';
import UserStore from 'stores/user_store.jsx';

import Constants from 'utils/constants.jsx';
import * as Utils from 'utils/utils.jsx';
import * as ChannelActions from 'actions/channel_actions.jsx';

import React from 'react';
import $ from 'jquery';
export default class SwitchChannelModal extends React.Component {
    constructor() {
        super();

        this.onInput = this.onInput.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onExited = this.onExited.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDmUserChange = this.handleDmUserChange.bind(this);
        this.suggestionProviders = [new SwitchChannelProvider()];

        this.state = {
            dmUsers: UserStore.getDirectProfiles(),
            text: '',
            error: ''
        };
    }

    componentDidMount() {
        UserStore.addDmListChangeListener(this.handleDmUserChange);
    }

    componentWillUnmount() {
        UserStore.removeDmListChangeListener(this.handleDmUserChange);
    }

    handleDmUserChange() {
        this.setState({
            dmUsers: UserStore.getDirectProfiles()
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.show && !prevProps.show) {
            const textbox = this.refs.search.getTextbox();
            textbox.focus();
            Utils.placeCaretAtEnd(textbox);
        }
    }

    onShow() {
        this.setState({
            text: '',
            error: ''
        });
    }

    onHide() {
        this.setState({
            text: '',
            error: ''
        });
        this.props.onHide();
    }

    onExited() {
        setTimeout(() => {
            $('#post_textbox').get(0).focus();
        });
    }

    onInput(e) {
        this.setState({text: e.target.value});
    }

    handleKeyDown(e) {
        this.setState({
            error: ''
        });
        if (e.keyCode === Constants.KeyCodes.ENTER) {
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const name = this.state.text.trim();
        let channel = null;

        if (name.indexOf(Utils.localizeMessage('channel_switch_modal.dm', '(Direct Message)')) > 0) {
            const dmUsername = name.substr(0, name.indexOf(Utils.localizeMessage('channel_switch_modal.dm', '(Direct Message)')) - 1);
            let user = null;
            for (const id in this.state.dmUsers) {
                if (this.state.dmUsers[id].username === dmUsername) {
                    user = this.state.dmUsers[id];
                    break;
                }
            }

            if (user) {
                Utils.openDirectChannelToUser(
                    user,
                    (ch) => {
                        channel = ch;
                    },
                    () => {
                        channel = null;
                    }
                );
            }
        } else {
            channel = ChannelStore.getByName(this.state.text.trim());
        }

        if (channel !== null) {
            ChannelActions.goToChannel(channel);
            this.onHide();
        } else if (this.state.text !== '') {
            this.setState({
                error: Utils.localizeMessage('channel_switch_modal.not_found', 'No matches found.')
            });
        }
    }

    render() {
        const message = this.state.error;
        return (
            <Modal
                className='modal-browse-channel'
                ref='modal'
                show={this.props.show}
                onHide={this.onHide}
                onExited={this.onExited}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        <span>
                            <FormattedMessage
                                id='channel_switch_modal.title'
                                defaultMessage='Switch Channels'
                            />
                        </span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='modal__hint'>
                        <FormattedMessage
                            id='channel_switch_modal.help'
                            defaultMessage='Type channel name. Use ↑↓ to browse, TAB to select, ↵ to confirm, ESC to dismiss'
                        />
                    </div>
                    <SuggestionBox
                        ref='search'
                        className='form-control focused'
                        type='input'
                        onInput={this.onInput}
                        value={this.state.text}
                        onKeyDown={this.handleKeyDown}
                        listComponent={SuggestionList}
                        maxLength='64'
                        providers={this.suggestionProviders}
                        preventDefaultSubmit={false}
                        listStyle='bottom'
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className='modal__error'>
                        {message}
                    </div>
                    <button
                        type='button'
                        className='btn btn-default'
                        onClick={this.onHide}
                    >
                        <FormattedMessage
                            id='edit_channel_header_modal.cancel'
                            defaultMessage='Cancel'
                        />
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={this.handleSubmit}
                    >
                        <FormattedMessage
                            id='channel_switch_modal.submit'
                            defaultMessage='Switch'
                        />
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

SwitchChannelModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired
};

