// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import Client from 'client/web_client.jsx';

export function track(category, action, label, property, value) {
    Client.track(category, action, label, property, value);
}

export function trackPage() {
    Client.trackPage();
}
