// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package model

import (
	"strings"
	"testing"
)

func TestNewId(t *testing.T) {
	for i := 0; i < 1000; i++ {
		id := NewId()
		if len(id) > 26 {
			t.Fatal("ids shouldn't be longer than 26 chars")
		}
	}
}

func TestRandomString(t *testing.T) {
	for i := 0; i < 1000; i++ {
		r := NewRandomString(32)
		if len(r) != 32 {
			t.Fatal("should be 32 chars")
		}
	}
}

func TestAppError(t *testing.T) {
	err := NewLocAppError("TestAppError", "message", nil, "")
	json := err.ToJson()
	rerr := AppErrorFromJson(strings.NewReader(json))
	if err.Message != rerr.Message {
		t.Fatal()
	}

	err.Error()
}

func TestMapJson(t *testing.T) {

	m := make(map[string]string)
	m["id"] = "test_id"
	json := MapToJson(m)

	rm := MapFromJson(strings.NewReader(json))

	if rm["id"] != "test_id" {
		t.Fatal("map should be valid")
	}

	rm2 := MapFromJson(strings.NewReader(""))
	if len(rm2) > 0 {
		t.Fatal("make should be ivalid")
	}
}

func TestValidEmail(t *testing.T) {
	if !IsValidEmail("corey+test@hulen.com") {
		t.Error("email should be valid")
	}

	if IsValidEmail("@corey+test@hulen.com") {
		t.Error("should be invalid")
	}
}

func TestValidLower(t *testing.T) {
	if !IsLower("corey+test@hulen.com") {
		t.Error("should be valid")
	}

	if IsLower("Corey+test@hulen.com") {
		t.Error("should be invalid")
	}
}

func TestEtag(t *testing.T) {
	etag := Etag("hello", 24)
	if len(etag) <= 0 {
		t.Fatal()
	}
}

var hashtags = map[string]string{
	"#test":           "#test",
	"test":            "",
	"#test123":        "#test123",
	"#123test123":     "",
	"#test-test":      "#test-test",
	"#test?":          "#test",
	"hi #there":       "#there",
	"#bug #idea":      "#bug #idea",
	"#bug or #gif!":   "#bug #gif",
	"#hüllo":          "#hüllo",
	"#?test":          "",
	"#-test":          "",
	"#yo_yo":          "#yo_yo",
	"(#brakets)":      "#brakets",
	")#stekarb(":      "#stekarb",
	"<#less_than<":    "#less_than",
	">#greater_than>": "#greater_than",
	"-#minus-":        "#minus",
	"_#under_":        "#under",
	"+#plus+":         "#plus",
	"=#equals=":       "#equals",
	"%#pct%":          "#pct",
	"&#and&":          "#and",
	"^#hat^":          "#hat",
	"##brown#":        "#brown",
	"*#star*":         "#star",
	"|#pipe|":         "#pipe",
	":#colon:":        "#colon",
	";#semi;":         "#semi",
	"#Mötley;":        "#Mötley",
	".#period.":       "#period",
	"¿#upside¿":       "#upside",
	"\"#quote\"":      "#quote",
	"/#slash/":        "#slash",
	"\\#backslash\\":  "#backslash",
	"#a":              "",
	"#1":              "",
	"foo#bar":         "",
}

func TestParseHashtags(t *testing.T) {
	for input, output := range hashtags {
		if o, _ := ParseHashtags(input); o != output {
			t.Fatal("failed to parse hashtags from input=" + input + " expected=" + output + " actual=" + o)
		}
	}
}
