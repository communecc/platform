// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package api

import (
	"github.com/commune/platform/model"
	"strings"
	"testing"
)

func TestShortcutsCommand(t *testing.T) {
	th := Setup().InitBasic()
	Client := th.BasicClient
	channel := th.BasicChannel

	rs := Client.Must(Client.Command(channel.Id, "/shortcuts ", false)).Data.(*model.CommandResponse)
	if !strings.Contains(rs.Text, "CTRL") {
		t.Fatal("failed to display shortcuts")
	}

	rs = Client.Must(Client.Command(channel.Id, "/shortcuts mac", false)).Data.(*model.CommandResponse)
	if !strings.Contains(rs.Text, "CMD") {
		t.Fatal("failed to display Mac shortcuts")
	}
}
