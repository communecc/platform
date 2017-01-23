// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package utils

import (
	"testing"
)

func TestConfig(t *testing.T) {
	TranslationsPreInit()
	LoadConfig("config.json")
	InitTranslations(Cfg.LocalizationSettings)
}
