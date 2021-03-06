// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package api

import (
	"bytes"
	"github.com/commune/platform/model"
	"github.com/commune/platform/utils"
	"io"
	"os"
)

type AutoPostCreator struct {
	client         *model.Client
	channelid      string
	Fuzzy          bool
	TextLength     utils.Range
	HasImage       bool
	ImageFilenames []string
	Users          []string
	Mentions       utils.Range
	Tags           utils.Range
}

// Automatic poster used for testing
func NewAutoPostCreator(client *model.Client, channelid string) *AutoPostCreator {
	return &AutoPostCreator{
		client:         client,
		channelid:      channelid,
		Fuzzy:          false,
		TextLength:     utils.Range{100, 200},
		HasImage:       false,
		ImageFilenames: TEST_IMAGE_FILENAMES,
		Users:          []string{},
		Mentions:       utils.Range{0, 5},
		Tags:           utils.Range{0, 7},
	}
}

func (cfg *AutoPostCreator) UploadTestFile() ([]string, bool) {
	filename := cfg.ImageFilenames[utils.RandIntFromRange(utils.Range{0, len(cfg.ImageFilenames) - 1})]

	path := utils.FindDir("web/static/images")
	file, err := os.Open(path + "/" + filename)
	defer file.Close()

	data := &bytes.Buffer{}
	_, err = io.Copy(data, file)
	if err != nil {
		return nil, false
	}

	resp, appErr := cfg.client.UploadPostAttachment(data.Bytes(), cfg.channelid, filename)
	if appErr != nil {
		return nil, false
	}

	return []string{resp.FileInfos[0].Id}, true
}

func (cfg *AutoPostCreator) CreateRandomPost() (*model.Post, bool) {
	var fileIds []string
	if cfg.HasImage {
		var err1 bool
		fileIds, err1 = cfg.UploadTestFile()
		if err1 == false {
			return nil, false
		}
	}

	var postText string
	if cfg.Fuzzy {
		postText = utils.FuzzPost()
	} else {
		postText = utils.RandomText(cfg.TextLength, cfg.Tags, cfg.Mentions, cfg.Users)
	}

	post := &model.Post{
		ChannelId: cfg.channelid,
		Message:   postText,
		FileIds:   fileIds}
	result, err2 := cfg.client.CreatePost(post)
	if err2 != nil {
		return nil, false
	}
	return result.Data.(*model.Post), true
}

func (cfg *AutoPostCreator) CreateTestPosts(rangePosts utils.Range) ([]*model.Post, bool) {
	numPosts := utils.RandIntFromRange(rangePosts)
	posts := make([]*model.Post, numPosts)

	for i := 0; i < numPosts; i++ {
		var err bool
		posts[i], err = cfg.CreateRandomPost()
		if err != true {
			return posts, false
		}
	}

	return posts, true
}
