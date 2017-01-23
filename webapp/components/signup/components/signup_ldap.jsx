// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import FormError from 'components/form_error.jsx';

import * as GlobalActions from 'actions/global_actions.jsx';
import {track} from 'actions/analytics_actions.jsx';

import * as Utils from 'utils/utils.jsx';
import Client from 'client/web_client.jsx';

import React from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {browserHistory, Link} from 'react-router/es6';

import logoImage from 'images/logo.png';

export default class SignupLdap extends React.Component {
    static get propTypes() {
        return {
            location: React.PropTypes.object
        };
    }

    constructor(props) {
        super(props);

        this.handleLdapSignup = this.handleLdapSignup.bind(this);
        this.handleLdapSignupSuccess = this.handleLdapSignupSuccess.bind(this);

        this.handleLdapIdChange = this.handleLdapIdChange.bind(this);
        this.handleLdapPasswordChange = this.handleLdapPasswordChange.bind(this);

        this.state = ({
            ldapError: '',
            ldapId: '',
            ldapPassword: ''
        });
    }

    handleLdapIdChange(e) {
        this.setState({
            ldapId: e.target.value
        });
    }

    handleLdapPasswordChange(e) {
        this.setState({
            ldapPassword: e.target.value
        });
    }

    handleLdapSignup(e) {
        e.preventDefault();

        this.setState({ldapError: ''});

        Client.webLoginByLdap(
            this.state.ldapId,
            this.state.ldapPassword,
            null,
            this.handleLdapSignupSuccess,
            (err) => {
                this.setState({
                    ldapError: err.message
                });
            }
        );
    }

    handleLdapSignupSuccess() {
        if (this.props.location.query.id || this.props.location.query.h) {
            Client.addUserToTeamFromInvite(
                this.props.location.query.d,
                this.props.location.query.h,
                this.props.location.query.id,
                () => {
                    this.finishSignup();
                },
                () => {
                    // there's not really a good way to deal with this, so just let the user log in like normal
                    this.finishSignup();
                }
            );
        } else {
            this.finishSignup();
        }
    }

    finishSignup() {
        GlobalActions.emitInitialLoad(
            () => {
                GlobalActions.loadDefaultLocale();
                browserHistory.push('/select_team');
            }
        );
    }

    render() {
        track('signup', 'signup_user_01_welcome');

        let ldapIdPlaceholder;
        if (global.window.mm_config.LdapLoginFieldName) {
            ldapIdPlaceholder = global.window.mm_config.LdapLoginFieldName;
        } else {
            ldapIdPlaceholder = Utils.localizeMessage('login.ldap_username', 'AD/LDAP Username');
        }

        let errorClass = '';
        if (this.state.ldapError) {
            errorClass += ' has-error';
        }

        let ldapSignup;
        if (global.window.mm_config.EnableLdap === 'true' && global.window.mm_license.IsLicensed === 'true' && global.window.mm_license.LDAP) {
            ldapSignup = (
                <div className='inner__content'>
                    <h5>
                        <strong>
                            <FormattedMessage
                                id='signup.ldap'
                                defaultMessage='AD/LDAP Credentials'
                            />
                        </strong>
                    </h5>
                    <form
                        onSubmit={this.handleLdapSignup}
                    >
                        <div className='signup__email-container'>
                            <FormError
                                error={this.state.ldapError}
                                margin={true}
                            />
                            <div className={'form-group' + errorClass}>
                                <input
                                    className='form-control'
                                    name='ldapId'
                                    value={this.state.ldapId}
                                    placeholder={ldapIdPlaceholder}
                                    onChange={this.handleLdapIdChange}
                                    spellCheck='false'
                                    autoCapitalize='off'
                                />
                            </div>
                            <div className={'form-group' + errorClass}>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='password'
                                    value={this.state.ldapPassword}
                                    placeholder={Utils.localizeMessage('login.password', 'Password')}
                                    onChange={this.handleLdapPasswordChange}
                                    spellCheck='false'
                                />
                            </div>
                            <div className='form-group'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={!this.state.ldapId || !this.state.ldapPassword}
                                >
                                    <FormattedMessage
                                        id='login.signIn'
                                        defaultMessage='Sign in'
                                    />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else {
            return null;
        }

        let terms = null;
        if (ldapSignup) {
            terms = (
                <p>
                    <FormattedHTMLMessage
                        id='create_team.agreement'
                        defaultMessage="By proceeding to create your account and use {siteName}, you agree to our <a href='/static/help/terms.html'>Terms of Service</a> and <a href='/static/help/privacy.html'>Privacy Policy</a>. If you do not agree, you cannot use {siteName}."
                        values={{
                            siteName: global.window.mm_config.SiteName
                        }}
                    />
                </p>
            );
        }

        let description = null;
        if (global.window.mm_license.IsLicensed === 'true' && global.window.mm_license.CustomBrand === 'true' && global.window.mm_config.EnableCustomBrand === 'true') {
            description = global.window.mm_config.CustomDescriptionText;
        } else {
            description = (
                <FormattedMessage
                    id='web.root.signup_info'
                    defaultMessage='All team communication in one place, searchable and accessible anywhere'
                />
            );
        }

        return (
            <div>
                <div className='signup-header'>
                    <Link to='/signup_user_complete'>
                        <span className='fa fa-chevron-left'/>
                        <FormattedMessage
                            id='web.header.back'
                        />
                    </Link>
                </div>
                <div className='col-sm-12'>
                    <div className='signup-team__container padding--less'>
                        <img
                            className='signup-team-logo'
                            src={logoImage}
                        />
                        <h1>{global.window.mm_config.SiteName}</h1>
                        <h4 className='color--light'>
                            {description}
                        </h4>
                        <h4 className='color--light'>
                            <FormattedMessage
                                id='signup_user_completed.lets'
                                defaultMessage="Let's create your account"
                            />
                        </h4>
                        <span className='color--light'>
                            <FormattedMessage
                                id='signup_user_completed.haveAccount'
                                defaultMessage='Already have an account?'
                            />
                            {' '}
                            <Link
                                to={'/login'}
                                query={this.props.location.query}
                            >
                                <FormattedMessage
                                    id='signup_user_completed.signIn'
                                    defaultMessage='Click here to sign in.'
                                />
                            </Link>
                        </span>
                        {ldapSignup}
                        {terms}
                    </div>
                </div>
            </div>
        );
    }
}
