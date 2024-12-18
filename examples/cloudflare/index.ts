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
        part: 'snippet',
        id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
      })
      const videoList = await youtube.videos.list({
        part: 'snippet',
        chart: 'mostPopular',
      })
      const searchList = await youtube.search.list({
        part: 'snippet',
        q: 'hoge',
      })
      return new Response(
        JSON.stringify({
          channelList,
          videoList,
          searchList,
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
