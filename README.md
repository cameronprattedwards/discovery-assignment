How to go about it
==================

Components:

LandingPage
VideoPage


YouTube API key: AIzaSyA1Uo7bcfC_Xh2aHKXH5zaCQwwfYMN-H9k

https://www.googleapis.com/youtube/v3/search?q=surfing&maxResults=25&part=snippet&key=AIzaSyA1Uo7bcfC_Xh2aHKXH5zaCQwwfYMN-H9k

https://www.googleapis.com/youtube/v3/channels?id=UCJkMlOu7faDgqh4PfzbpLdg&part=snippet%2CcontentDetails%2Cstatistics&key=AIzaSyA1Uo7bcfC_Xh2aHKXH5zaCQwwfYMN-H9k




https://www.googleapis.com/youtube/v3/channels?key=AIzaSyA1Uo7bcfC_Xh2aHKXH5zaCQwwfYMN-H9k&forUsername=klauskkpm&part=id

Nerdwriter channel ID: UCJkMlOu7faDgqh4PfzbpLdg

The backend should just pass 

Nerdwriter uploads playlist: UUJkMlOu7faDgqh4PfzbpLdg




https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUJkMlOu7faDgqh4PfzbpLdg&maxResults=10&part=snippet%2CcontentDetails&key=AIzaSyA1Uo7bcfC_Xh2aHKXH5zaCQwwfYMN-H9k




How can we get a featured video for the channel? We could just get the last video they posted. In the case of Nerdwriter, that would look like: 

https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUJkMlOu7faDgqh4PfzbpLdg&maxResults=1&part=snippet%2CcontentDetails&key=AIzaSyA1Uo7bcfC_Xh2aHKXH5zaCQwwfYMN-H9k

You would then get the nextPageToken from that request, and that's where your related-videos search would begin. 

So actions:

loadFeaturedVideo
loadRelatedVideos

So on the landing page, when it loads, you getFeaturedVideo, and that gives you the pageToken for the related videos, 

Let's not make this more complicated than it needs to be? Well, we do need to load 10 more videos every time we scroll down. They could be totally unrelated videos. 

On the homepage, we just send a request for 11 videos


Questions:

Should the alphabetical order be maintained each time you load 10 more videos? That would mean the new videos would just kind of get mixed in with the old videos. Seems like crappy UX.
What does "various categories" mean? If they are related videos for the featured video, does that count? Or do we need to intentionally vary the categories of the video? 

Okay. I can move past these questions. What I need is a state shape that can provide my components with a featured video and additional videos. I can encapsulate all the stuff I have questions about in the actions/reducers.

What does my page need?

In terms of design, it's really just one big video and 10 small videos.

The player page should not load new related videos on scroll.

Actions:

loadAdditionalVideos
loadPage

{
	landingPage: {
		featuredVideo: 'asd932kjsajd',
		relatedVideos: [
			'938475lkjsfd8',
			'4839sldkjf',
			'349587slkdjf',
			'2304982348',
			'938475lkjsfd8',
			'4839sldkjf',
			'349587slkdjf',
			'2304982348',
			'349587slkdjf',
			'2304982348',
		],
		loadingAdditionalVideos: false,
		error: null,
	},
	viewerPages: {
		'2304982348': {
			featuredVideo: '2304982348',
			relatedVideos: [
				'938475lkjsfd8',
				'4839sldkjf',
				'349587slkdjf',
				'2304982348',
				'938475lkjsfd8',
				'4839sldkjf',
				'349587slkdjf',
				'2304982348',
				'349587slkdjf',
				'2304982348',
			],
			error: 'Failed to load'
		},
		'349587slkdjf': {
			featuredVideo: '349587slkdjf',
			relatedVideos: [
				'938475lkjsfd8',
				'4839sldkjf',
				'349587slkdjf',
				'2304982348',
				'938475lkjsfd8',
				'4839sldkjf',
				'349587slkdjf',
				'2304982348',
				'349587slkdjf',
				'2304982348',
			],
			error: null,
		}
	}
}

What about scrolling? We shouldn't load additional videos until the page has finished loading, right?

Well, on a page where everything fits without scrolling, we should load additional videos until it *doesn't* all fit on the same page, or until we've loaded 30 videos, whichever comes first.

When additional videos finish loading, we should check to see whether we've filled the whole space yet. If not, load more videos. 

There's another way to do this. And that is to *ensure* that we always fill up all the space, by making the videos just stack vertically and adding a description or something. 

If I use react-infinite, it should just take care of this for me, by automatically loading more if all the space isn't taken up. 








