// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import AppStoreButton from 'images/app-store-button.png';
import IPhone6Mockup from 'images/iphone-6-mockup.png';

export default class GetIosApp extends React.Component {
    render() {
        return (
            <div className='get-app get-ios-app'>
                <h1 className='get-app__header'>
                    <FormattedMessage
                        id='get_app.iosHeader'
                        defaultMessage='Commune CC works best if you switch to our iPhone app'
                    />
                </h1>
                <hr/>
                <a
                    className='get-ios-app__app-store-link'
                    href={global.window.mm_config.IosAppDownloadLink}
                    rel='noopener noreferrer'
                >
                    <img src={AppStoreButton}/>
                </a>
                <img
                    className='get-app__screenshot'
                    src={IPhone6Mockup}
                />
                <h2 className='get-ios-app__already-have-it'>
                    <FormattedMessage
                        id='get_app.alreadyHaveIt'
                        defaultMessage='Already have it?'
                    />
                </h2>
                <a
                    className='btn btn-primary get-ios-app__open-mattermost'
                    href='mattermost://'
                >
                    <FormattedMessage
                        id='get_app.openCommune CC'
                        defaultMessage='Open Commune CC'
                    />
                </a>
                <span className='get-app__continue-with-browser'>
                    <FormattedMessage
                        id='get_app.continueWithBrowser'
                        defaultMessage='Or {link}'
                        values={{
                            link: (
                                <Link to='/switch_team'>
                                    <FormattedMessage
                                        id='get_app.continueWithBrowserLink'
                                        defaultMessage='continue with browser'
                                    />
                                </Link>
                            )
                        }}
                    />
                </span>
            </div>
        );
    }
}