#!/usr/bin/env bash

#jsx
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e "s/'Mattermost'/'Commune'/g"
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/mattermost.org/youcommune.com/g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/mattermost.com/youcommune.com/g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/mattermost.example/youcommune.example/g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/Mattermost /Commune CC /g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/Mattermost,/Commune CC,/g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/Mattermost./Commune CC./g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/2016/2017/g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/made with love for a better web/Uniting religious communities/g'
find . -name '*.jsx' -print0 | xargs -0 perl -pi -e 's/"Mattermost"/"Commune CC"/g'

#json
find . -name '*.json' -print0 | xargs -0 perl -pi -e "s/'Mattermost'/'Commune'/g"
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/mattermost.org/youcommune.com/g'
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/mattermost.com/youcommune.com/g'
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/mattermost.example/youcommune.example/g'
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/Mattermost /Commune CC /g'
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/2016/2017/g'
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/"Mattermost"/"Commune CC"/g'
find . -name '*.json' -print0 | xargs -0 perl -pi -e 's/Mattermost,/Commune CC,/g'

#cleanup
find . -name '*.bak' -print0 | xargs -0 rm

