// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package api

import (
	"github.com/commune/platform/utils"
	"testing"
)

func TestGetLicenceConfig(t *testing.T) {
	th := Setup().InitBasic()
	Client := th.BasicClient

	if result, err := Client.GetClientLicenceConfig(""); err != nil {
		t.Fatal(err)
	} else {
		cfg := result.Data.(map[string]string)

		if _, ok := cfg["IsLicensed"]; !ok {
			t.Fatal(cfg)
		}

		// test etag caching
		if cache_result, err := Client.GetClientLicenceConfig(result.Etag); err != nil {
			t.Fatal(err)
		} else if len(cache_result.Data.(map[string]string)) != 0 {
			t.Log(cache_result.Data)
			t.Fatal("cache should be empty")
		}

		utils.ClientLicense["IsLicensed"] = "true"

		if cache_result, err := Client.GetClientLicenceConfig(result.Etag); err != nil {
			t.Fatal(err)
		} else if len(cache_result.Data.(map[string]string)) == 0 {
			t.Fatal("result should not be empty")
		}

		utils.ClientLicense["SomeFeature"] = "true"

		if cache_result, err := Client.GetClientLicenceConfig(result.Etag); err != nil {
			t.Fatal(err)
		} else if len(cache_result.Data.(map[string]string)) == 0 {
			t.Fatal("result should not be empty")
		}

		utils.ClientLicense = map[string]string{"IsLicensed": "false"}
	}
}
