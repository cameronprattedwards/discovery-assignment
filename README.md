Video Viewer
============

To run:

First, you'll need to get a YouTube Data API key from https://console.developers.google.com/apis/dashboard. Then:

```bash
git clone https://github.com/cameronprattedwards/discovery-assignment.git
cd discovery-assignment
npm install
node_modules/.bin/webpack
node_modules/.bin/babel-node apiServer --key {YOUR YOUTUBE API KEY}
node_modules/.bin/babel-node webServer
```

Then visit http://localhost:7000, and start clicking around!

Things that I would change, given more time, and if I were to move toward making the app production-ready:

- Add unit and integration tests
- Unify the design of the additional-videos sections between the viewing page and the landing page
- ducks/landingPage.js and ducks/viewingPage.js have tons of duplicate code. I would consolidate the code. For example, I would add a getRelatedVideos() utility method that would accept a featured video ID and, optionally, a page token, and would fetch the related video data from YouTube and deserialize it, and return an object with additional videos and the next page token.
- Use a Higher Order Component to consolidate the duplicate logic in LandingPage and ViewingPage. They both call loadPage on mount, and both render a large featured video. The HOC would just need to accept the thumbnails section, since that's the only thing that differs (one has infinite scroll and the other doesn't).
- Create a Thumbnail component, since the thumbnail layout is identical between the two pages.
- Add eslint and scss-lint, and lint everything: alphabetize the SCSS rules, shorten line lengths, make sure whitespace is consistent, etc.
- Prune the dependency list in package.json. I installed some stuff up front assuming I would need it and didn't end up needing it.
- Add server-side rendering
- Clean up the design: at least add a title to the website explaining what it's for :)
- Serve everything using HTTP2 and enable compression to make the site speedier.
- The requirements for the assignment specify that related videos should be alphabetized. I should have clarified before beginning the project whether related videos should be alphabetized in groups of 10 or if the entire list (of up to 30 videos) should be alphabetized. If they were alphabetized in groups of 10, I would simply add the following to ducks/landingPage.js#loadMoreVideos, ducks/landingPage.js#loadPage, and ducks/viewingPage.js#loadPage:

```javascript
additionalVideos = _.sortBy(additionalVideos, 'title');
```

- If the entire list was meant to be alphabetized, I would add essentially the same code to the loadMoreVideosSuccessReducer and loadPageSuccessReducer, except I would concatenate any new videos to the old list, then sort them as a complete list.
- The assignment also requires that videos come from "various categories." I'm not sure if this means that the app logic is responsible for ensuring the variety of the video categories (once again, I should have clarified this at the beginning of the project). If that is the case, simply fetching related videos for the featured video doesn't cut it. I instead would send 10 requests to the YouTube API, each for separate video categories (https://developers.google.com/youtube/v3/docs/search/list#videoCategoryId), then add those to the list as they came in.
- Display errors that occur when loading additional videos.
- Swap the "Loading..." text out for a spinner, and add a spinner for the infinite scroll.
- Stop using babel-node and start using babel-register.
