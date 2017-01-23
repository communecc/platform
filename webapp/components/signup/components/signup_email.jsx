// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import LoadingScreen from 'components/loading_screen.jsx';

import * as GlobalActions from 'actions/global_actions.jsx';
import {track} from 'actions/analytics_actions.jsx';

import BrowserStore from 'stores/browser_store.jsx';

import * as Utils from 'utils/utils.jsx';
import Client from 'client/web_client.jsx';
import Constants from 'utils/constants.jsx';

import React from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {browserHistory, Link} from 'react-router/es6';

import logoImage from 'images/logo.png';

export default class SignupEmail extends React.Component {
    static get propTypes() {
        return {
            location: React.PropTypes.object
        };
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.getInviteInfo = this.getInviteInfo.bind(this);
        this.renderEmailSignup = this.renderEmailSignup.bind(this);
        this.isUserValid = this.isUserValid.bind(this);

        this.state = this.getInviteInfo();
    }

    getInviteInfo() {
        let data = this.props.location.query.d;
        let hash = this.props.location.query.h;
        const inviteId = this.props.location.query.id;
        let email = '';
        let teamDisplayName = '';
        let teamName = '';
        let teamId = '';
        let loading = true;
        let serverError = '';
        let noOpenServerError = false;

        if (hash && hash.length > 0) {
            const parsedData = JSON.parse(data);
            email = parsedData.email;
            teamDisplayName = parsedData.display_name;
            teamName = parsedData.name;
            teamId = parsedData.id;
            loading = false;
        } else if (inviteId && inviteId.length > 0) {
            loading = true;
            Client.getInviteInfo(
                inviteId,
                (inviteData) => {
                    if (!inviteData) {
                        return;
                    }

                    serverError = '';
                    teamDisplayName = inviteData.display_name;
                    teamName = inviteData.name;
                    teamId = inviteData.id;
                },
                () => {
                    noOpenServerError = true;
                    serverError = (
                        <FormattedMessage
                            id='signup_user_completed.invalid_invite'
                            defaultMessage='The invite link was invalid.  Please speak with your Administrator to receive an invitation.'
                        />
                    );
                }
            );

            loading = false;
            data = null;
            hash = null;
        } else {
            loading = false;
        }

        return {
            data,
            hash,
            email,
            teamDisplayName,
            teamName,
            teamId,
            inviteId,
            loading,
            serverError,
            noOpenServerError
        };
    }

    finishSignup() {
        GlobalActions.emitInitialLoad(
            () => {
                const query = this.props.location.query;
                GlobalActions.loadDefaultLocale();
                if (query.redirect_to) {
                    browserHistory.push(query.redirect_to);
                } else {
                    browserHistory.push('/select_team');
                }
            }
        );
    }

    handleSignupSuccess(user, data) {
        track('signup', 'signup_user_02_complete');
        Client.loginById(
            data.id,
            user.password,
            '',
            () => {
                if (this.state.hash > 0) {
                    BrowserStore.setGlobalItem(this.state.hash, JSON.stringify({usedBefore: true}));
                }

                GlobalActions.emitInitialLoad(
                    () => {
                        const query = this.props.location.query;
                        if (query.redirect_to) {
                            browserHistory.push(query.redirect_to);
                        } else {
                            browserHistory.push('/select_team');
                        }
                    }
                );
            },
            (err) => {
                if (err.id === 'api.user.login.not_verified.app_error') {
                    browserHistory.push('/should_verify_email?email=' + encodeURIComponent(user.email) + '&teamname=' + encodeURIComponent(this.state.teamName));
                } else {
                    this.setState({serverError: err.message});
                }
            }
        );
    }

    isUserValid() {
        const providedEmail = this.refs.email.value.trim();
        if (!providedEmail) {
            this.setState({
                nameError: '',
                emailError: (<FormattedMessage id='signup_user_completed.required'/>),
                passwordError: '',
                serverError: ''
            });
            return false;
        }

        if (!Utils.isEmail(providedEmail)) {
            this.setState({
                nameError: '',
                emailError: (<FormattedMessage id='signup_user_completed.validEmail'/>),
                passwordError: '',
                serverError: ''
            });
            return false;
        }

        const providedUsername = this.refs.name.value.trim().toLowerCase();
        if (!providedUsername) {
            this.setState({
                nameError: (<FormattedMessage id='signup_user_completed.required'/>),
                emailError: '',
                passwordError: '',
                serverError: ''
            });
            return false;
        }

        const usernameError = Utils.isValidUsername(providedUsername);
        if (usernameError === 'Cannot use a reserved word as a username.') {
            this.setState({
                nameError: (<FormattedMessage id='signup_user_completed.reserved'/>),
                emailError: '',
                passwordError: '',
                serverError: ''
            });
            return false;
        } else if (usernameError) {
            this.setState({
                nameError: (
                    <FormattedMessage
                        id='signup_user_completed.usernameLength'
                        values={{
                            min: Constants.MIN_USERNAME_LENGTH,
                            max: Constants.MAX_USERNAME_LENGTH
                        }}
                    />
                ),
                emailError: '',
                passwordError: '',
                serverError: ''
            });
            return false;
        }

        const providedPassword = this.refs.password.value;
        const pwdError = Utils.isValidPassword(providedPassword);
        if (pwdError) {
            this.setState({
                nameError: '',
                emailError: '',
                passwordError: pwdError,
                serverError: ''
            });
            return false;
        }

        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.isUserValid()) {
            this.setState({
                nameError: '',
                emailError: '',
                passwordError: '',
                serverError: ''
            });

            const user = {
                email: this.refs.email.value.trim(),
                username: this.refs.name.value.trim().toLowerCase(),
                password: this.refs.password.value,
                allow_marketing: true
            };

            Client.createUserWithInvite(user,
                this.state.data,
                this.state.hash,
                this.state.inviteId,
                this.handleSignupSuccess.bind(this, user),
                (err) => {
                    this.setState({serverError: err.message});
                }
            );
        }
    }

    renderEmailSignup() {
        let emailError = null;
        let emailHelpText = (
            <span className='help-block'>
                <FormattedMessage
                    id='signup_user_completed.emailHelp'
                    defaultMessage='Valid email required for sign-up'
                />
            </span>
        );
        let emailDivStyle = 'form-group';
        if (this.state.emailError) {
            emailError = (<label className='control-label'>{this.state.emailError}</label>);
            emailHelpText = '';
            emailDivStyle += ' has-error';
        }

        let nameError = null;
        let nameHelpText = (
            <span className='help-block'>
                <FormattedMessage
                    id='signup_user_completed.userHelp'
                    defaultMessage="Username must begin with a letter, and contain between {min} to {max} lowercase characters made up of numbers, letters, and the symbols '.', '-' and '_'"
                    values={{
                        min: Constants.MIN_USERNAME_LENGTH,
                        max: Constants.MAX_USERNAME_LENGTH
                    }}
                />
            </span>
        );
        let nameDivStyle = 'form-group';
        if (this.state.nameError) {
            nameError = <label className='control-label'>{this.state.nameError}</label>;
            nameHelpText = '';
            nameDivStyle += ' has-error';
        }

        let passwordError = null;
        let passwordDivStyle = 'form-group';
        if (this.state.passwordError) {
            passwordError = <label className='control-label'>{this.state.passwordError}</label>;
            passwordDivStyle += ' has-error';
        }

        let yourEmailIs = null;
        if (this.state.email) {
            yourEmailIs = (
                <FormattedHTMLMessage
                    id='signup_user_completed.emailIs'
                    defaultMessage="Your email address is <strong>{email}</strong>. You'll use this address to sign in to {siteName}."
                    values={{
                        email: this.state.email,
                        siteName: global.window.mm_config.SiteName
                    }}
                />
            );
        }

        let emailContainerStyle = 'margin--extra';
        if (this.state.email) {
            emailContainerStyle = 'hidden';
        }

        return (
            <form>
                <div className='inner__content'>
                    <div className={emailContainerStyle}>
                        <h5><strong>
                            <FormattedMessage
                                id='signup_user_completed.whatis'
                                defaultMessage="What's your email address?"
                            />
                        </strong></h5>
                        <div className={emailDivStyle}>
                            <input
                                type='email'
                                ref='email'
                                className='form-control'
                                defaultValue={this.state.email}
                                placeholder=''
                                maxLength='128'
                                autoFocus={true}
                                spellCheck='false'
                                autoCapitalize='off'
                            />
                            {emailError}
                            {emailHelpText}
                        </div>
                    </div>
                    {yourEmailIs}
                    <div className='margin--extra'>
                        <h5><strong>
                            <FormattedMessage
                                id='signup_user_completed.chooseUser'
                                defaultMessage='Choose your username'
                            />
                        </strong></h5>
                        <div className={nameDivStyle}>
                            <input
                                type='text'
                                ref='name'
                                className='form-control'
                                placeholder=''
                                maxLength={Constants.MAX_USERNAME_LENGTH}
                                spellCheck='false'
                                autoCapitalize='off'
                            />
                            {nameError}
                            {nameHelpText}
                        </div>
                    </div>
                    <div className='margin--extra'>
                        <h5><strong>
                            <FormattedMessage
                                id='signup_user_completed.choosePwd'
                                defaultMessage='Choose your password'
                            />
                        </strong></h5>
                        <div className={passwordDivStyle}>
                            <input
                                type='password'
                                ref='password'
                                className='form-control'
                                placeholder=''
                                maxLength='128'
                                spellCheck='false'
                            />
                            {passwordError}
                        </div>
                    </div>
                    <p className='margin--extra'>
                        <button
                            type='submit'
                            onClick={this.handleSubmit}
                            className='btn-primary btn'
                        >
                            <FormattedMessage
                                id='signup_user_completed.create'
                                defaultMessage='Create Account'
                            />
                        </button>
                    </p>
                </div>
            </form>
        );
    }

    render() {
        track('signup', 'signup_user_01_welcome');

        let serverError = null;
        if (this.state.serverError) {
            serverError = (
                <div className={'form-group has-error'}>
                    <label className='control-label'>{this.state.serverError}</label>
                </div>
            );
        }

        if (this.state.loading) {
            return (<LoadingScreen/>);
        }

        let emailSignup;
        if (global.window.mm_config.EnableSignUpWithEmail === 'true') {
            emailSignup = this.renderEmailSignup();
        } else {
            return null;
        }

        let terms = null;
        if (!this.state.noOpenServerError && emailSignup) {
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

        if (this.state.noOpenServerError) {
            emailSignup = null;
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
                        {emailSignup}
                        {serverError}
                        {terms}
                    </div>
                </div>
            </div>
        );
    }
}
