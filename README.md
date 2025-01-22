# YouTubeAPI-Edge [![npm](https://img.shields.io/npm/v/youtubeapi-edge)](https://www.npmjs.com/package/youtubeapi-edge)

YouTubeAPI-Edge is a lightweight library for interacting with the [YouTube API](https://developers.google.com/youtube/v3/docs), designed to run seamlessly in **modern JavaScript environments**, including **edge platforms** like [Cloudflare Workers](https://workers.cloudflare.com/).

**Note:** This library is a work in progress. Currently, only `list` methods for GET requests are supported. Expect potential bugs and missing features.

---

## Features

- **Edge-compatible:** Designed to run in environments that support the Web standard `fetch` API, such as Cloudflare Workers.
- **Standardized HTTP client:** Uses the Web standard `fetch` API instead of Node.js-specific HTTP libraries like `http` or `axios`, ensuring broad compatibility.
- **Familiar and intuitive interface:** Mirrors the interface of the official [Google API Node.js Client](https://github.com/googleapis/google-api-nodejs-client) for ease of use.

## Installation

Install the library using your preferred package manager:

```bash
npm install youtubeapi-edge
# OR
yarn add youtubeapi-edge
# OR
pnpm add youtubeapi-edge
```

---

## Usage

To use the library, initialize it with your Google API key and specify the API version (default is `v3`).

```typescript
import { youtubeapiEdge } from "youtubeapi-edge";

const youtube = youtubeapiEdge({
  auth: process.env["GOOGLE_API_KEY"]!, // Replace with your API key
  version: "v3",
});

const result = await youtube.channels.list({
  id: channelId, // Replace with the target channel ID
  part: ["snippet"],
});
```

---

## API Documentation

This library is designed to align with the interface of the official [Google API Node.js Client](https://github.com/googleapis/google-api-nodejs-client). Below are some of the supported endpoints and examples of how to use them.

### `channels`
Fetch details about YouTube channels.

[Documentation](https://developers.google.com/youtube/v3/docs/channels/list)

```typescript
const result = await youtube.channels.list({
  id: channelId, // Replace with the target channel ID
  part: ["snippet"],
});
```

### `videos`
Fetch details about specific YouTube videos.

[Documentation](https://developers.google.com/youtube/v3/docs/videos)

```typescript
const result = await youtube.videos.list({
  id: videoId, // Replace with the target video ID
  part: ["snippet", "statistics"],
});
```

### `search`
Search for YouTube videos, channels, or playlists.

[Documentation](https://developers.google.com/youtube/v3/docs/search)

```typescript
const result = await youtube.search.list({
  part: ["snippet"],
  q: "query", // Replace with your search query
});
```

### `playlists`
Fetch details about playlists from a specific channel.

[Documentation](https://developers.google.com/youtube/v3/docs/playlists)

```typescript
const result = await youtube.playlists.list({
  channelId: channelId, // Replace with the target channel ID
  part: ["snippet"],
});
```

### `commentThreads`
Fetch top-level comments and replies for a specific video.

[Documentation](https://developers.google.com/youtube/v3/docs/commentThreads)

```typescript
const result = await youtube.commentThreads.list({
  videoId: videoId, // Replace with the target video ID
  part: ["snippet", "replies"],
});
```

### `comments`
Fetch replies to a specific comment.

[Documentation](https://developers.google.com/youtube/v3/docs/comments)

```typescript
const result = await youtube.comments.list({
  parentId: commentParentId, // Replace with the parent comment ID
  part: ["snippet"],
});
```

### `videoCategories`
Retrieve YouTube video category data.

[Documentation](https://developers.google.com/youtube/v3/docs/videoCategories)

```typescript
const result = await youtube.videoCategories.list({
  part: ["snippet"],
});
```
