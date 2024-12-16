
const API_BASE = 'https://www.googleapis.com/youtube';

const VERSIONS = {
  v3: 'v3',
} as const;

export async function youtubeFetch(
  endpoint: string,
  version: keyof typeof VERSIONS,
  params: Record<string, string>,
  apiKey: string
): Promise<any> {
  const url = new URL(`${API_BASE}/${version}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  url.searchParams.append('key', apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}


export async function baseYoutubeFetch(
  params: {
    version: keyof typeof VERSIONS;
    auth: string;
  }
): Promise<any> {
  return {
    search: {
      list: async (params: Record<string, string>) => {
        const url = new URL(`${API_BASE}/${params.version}/search`);
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
        url.searchParams.append('key', params.auth);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      }
    },
    videos: {
      list: async (params: Record<string, string>) => {
        const url = new URL(`${API_BASE}/${params.version}/videos`);
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
        url.searchParams.append('key', params.auth);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      }
    },
    channels: {
      list: async (requestParams: Record<string, string>) => {
        const url = new URL(`${API_BASE}/${params.version}/channels`);
        Object.entries(requestParams).forEach(([key, value]) => url.searchParams.append(key, value));
        url.searchParams.append('key', params.auth);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      }
    }
  }
}


// export const searchYoutube = async (keyword: string): { title: string; url: string; description: string; }[] => {
//   const youtube = google.youtube({
//     version: "v3",
//     auth: process.env["GOOGLE_API_KEY"] ?? "",
//   });
//   const searchRes = await youtube.search.list({
//     q: keyword,
//     part: ["snippet"],
//     relevanceLanguage: "ja", // 日本語の動画を検索
//     type: ["video"],
//   });

//   // 先頭3件を抽出
//   const targetItems = (searchRes.data.items ?? []).slice(0, 3)
//   return targetItems.map((item) => ({
//     title: item.snippet?.title ?? "",
//     url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
//     description: item.snippet?.description ?? "",
//   }));
// };