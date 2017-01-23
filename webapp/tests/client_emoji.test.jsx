// Copyright (c) 2017 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import assert from 'assert';
import TestHelper from './test_helper.jsx';

const fs = require('fs');

describe('Client.Emoji', function() {
    this.timeout(100000);

    const testGifFileName = 'testEmoji.gif';

    before(function() {
        // write a temporary file so that we have something to upload for testing
        const buffer = new Buffer('R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');
        const testGif = fs.openSync(testGifFileName, 'w+');
        fs.writeFileSync(testGif, buffer);
    });

    after(function() {
        fs.unlinkSync(testGifFileName);
    });

    it('addEmoji', function(done) {
        TestHelper.initBasic(() => {
            const name = TestHelper.generateId();

            TestHelper.basicClient().addEmoji(
                {creator_id: TestHelper.basicUser().id, name},
                fs.createReadStream(testGifFileName),
                function(data) {
                    assert.equal(data.name, name);
                    assert.notEqual(data.id, null);

                    TestHelper.basicClient().deleteEmoji(data.id);
                    done();
                },
                function(err) {
                    done(new Error(err.message));
                }
            );
        });
    });

    it('deleteEmoji', function(done) {
        TestHelper.initBasic(() => {
            TestHelper.basicClient().addEmoji(
                {creator_id: TestHelper.basicUser().id, name: TestHelper.generateId()},
                fs.createReadStream(testGifFileName),
                function(data) {
                    TestHelper.basicClient().deleteEmoji(
                        data.id,
                        function() {
                            done();
                        },
                        function(err) {
                            done(new Error(err.message));
                        }
                    );
                },
                function(err) {
                    done(new Error(err.message));
                }
            );
        });
    });

    it('listEmoji', function(done) {
        TestHelper.initBasic(() => {
            const name = TestHelper.generateId();
            TestHelper.basicClient().addEmoji(
                {creator_id: TestHelper.basicUser().id, name},
                fs.createReadStream(testGifFileName),
                function() {
                    TestHelper.basicClient().listEmoji(
                        function(data) {
                            assert(data.length > 0, true);

                            let found = false;
                            for (const emoji of data) {
                                if (emoji.name === name) {
                                    found = true;
                                    break;
                                }
                            }

                            if (found) {
                                done();
                            } else {
                                done(new Error('test emoji wasn\'t returned'));
                            }
                        },
                        function(err) {
                            done(new Error(err.message));
                        }
                    );
                },
                function(err) {
                    done(new Error(err.message));
                }
            );
        });
    });
});
