import { youtubeapiEdge } from 'youtubeapi-edge'

export default {
  async fetch(
    request: Request,
    context: { YOUTUBE_API_KEY: string },
  ): Promise<Response> {
    const youtube = youtubeapiEdge({
      version: 'v3',
      auth: context.YOUTUBE_API_KEY,
    })
    const url = new URL(request.url)
    const path = url.pathname
    const query = url.searchParams

    try {
      let response
      switch (path) {
        case '/channels':
          response = await youtube.channels.list({
            part: ['id', 'snippet', 'statistics'],
            id: query.get('id') || 'UCX6OQ3DkcsbYNE6H8uQQuVA',
          })
          break

        case '/videos':
          response = await youtube.videos.list({
            part: ['snippet'],
            chart: 'mostPopular',
          })
          break

        case '/search':
          response = await youtube.search.list({
            part: ['snippet'],
            q: query.get('q') || 'hoge',
          })
          break

        case '/playlists':
          response = await youtube.playlists.list({
            channelId: query.get('channelId') || 'UCljYHFazflmGaDr5Lo90KmA',
            part: ['snippet'],
          })
          break

        case '/commentThreads':
          response = await youtube.commentThreads.list({
            videoId: query.get('videoId') || 'Vb0XaKEowaE',
            part: ['snippet', 'replies'],
          })
          break

        case '/comments':
          response = await youtube.comments.list({
            parentId: query.get('parentId') || 'UgzVeH0kiBO1tMxWsw14AaABAg',
            part: ['snippet'],
          })
          break
        case '/videoCategories':
          response = await youtube.videoCategories.list({
            part: ['snippet'],
            regionCode: query.get('regionCode') || 'JP',
          })
          break

        default:
          return new Response('Not Found', { status: 404 })
      }
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}
