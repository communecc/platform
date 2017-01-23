#html
find . -name '*.html' -print0 | xargs -0 perl -pi -e "s/'Mattermost'/'Commune'/g"
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/mattermost.org/youcommune.com/g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/mattermost.com/youcommune.com/g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/mattermost.example/youcommune.example/g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/Mattermost /Commune CC /g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/Mattermost,/Commune CC,/g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/Mattermost./Commune CC./g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/2016/2017/g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/made with love for a better web/Uniting religious communities/g'
find . -name '*.html' -print0 | xargs -0 perl -pi -e 's/"Mattermost"/"Commune CC"/g'
