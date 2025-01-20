import { youtubeapiEdge } from 'youtubeapi-edge'

export default {
  async fetch(
    _request: Request,
    context: { YOUTUBE_API_KEY: string },
  ): Promise<Response> {
    const youtube = youtubeapiEdge({
      version: 'v3',
      auth: context.YOUTUBE_API_KEY,
    })
    try {
      const channelList = await youtube.channels.list({
        part: [
          'id',
          'snippet',
          'brandingSettings',
          'contentDetails',
          'statistics',
          'topicDetails',
          'status',
        ],
        id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
      })
      const videoList = await youtube.videos.list({
        part: ['snippet'],
        chart: 'mostPopular',
      })
      const searchList = await youtube.search.list({
        part: ['snippet'],
        q: 'hoge',
      })
      const playlists = await youtube.playlists.list({
        channelId: 'UCljYHFazflmGaDr5Lo90KmA',
        part: ['snippet'],
      })
      const commentThreads = await youtube.commentThreads.list({
        videoId: 'Vb0XaKEowaE',
        part: ['snippet', 'replies'],
      })
      return new Response(
        JSON.stringify({
          channelList,
          videoList,
          searchList,
          playlists,
          commentThreads,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}
