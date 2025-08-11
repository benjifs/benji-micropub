import Micropub from '@benjifs/micropub'
import GitHubStore from '@benjifs/github-store'

const {
	ME,
	TOKEN_ENDPOINT,
	GITHUB_TOKEN,
	GITHUB_USER,
	GITHUB_REPO,
} = process.env

const store = new GitHubStore({
	token: GITHUB_TOKEN,
	user: GITHUB_USER,
	repo: GITHUB_REPO,
})

export const micropub = new Micropub({
	store,
	me: ME,
	tokenEndpoint: TOKEN_ENDPOINT,
	contentDir: 'src/content',
	// mediaDir: 'uploads',
	// https://micropub.spec.indieweb.org/#configuration
	config: {
		'media-endpoint': 'https://micropub.benji.dog/media',
		'syndicate-to': [
			{ uid: 'https://fed.brid.gy/', name: 'w/ Bridgy Fed', checked: true },
			{ uid: 'https://brid.gy/publish/bluesky', name: 'to Bluesky' },
			{ uid: 'https://brid.gy/publish/mastodon', name: 'to benji@corteximplant.com' }
		],
		'post-types': [
			{ type: 'note', name: 'Note' },
			{ type: 'photo', name: 'Photo' },
			{ type: 'reply', name: 'Reply' },
			{ type: 'bookmark', name: 'Bookmark' },
			{ type: 'like', name: 'Like' },
			{ type: 'article', name: 'Article' },
			{ type: 'rsvp', name: 'RSVP' },
			// { type: 'repost', name: 'Repost' },
			{ type: 'watch', name: 'Watch' },
			{ type: 'read', name: 'Read' },
			{ type: 'listen', name: 'Listen' },
			{ type: 'game', name: 'Game' },
		],
	},
	formatSlug: (type, filename) => {
		const typeToSlug = {
			like: 'likes',
			bookmark: 'bookmarks',
			rsvp: 'rsvp',
			article: 'articles',
			watch: 'watched',
			read: 'read',
			listen: 'listen',
			play: 'play',
		}
		return `${typeToSlug[type] || 'notes'}/${filename}`
	},
})
