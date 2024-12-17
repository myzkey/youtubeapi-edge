/**
 * Appends the given params to the given URL and returns the new URL.
 * @param baseUrl
 * @param params
 * @param apiKey
 * @returns
 */
export function appendParamsToUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean>,
  apiKey: string,
): URL {
  const url = new URL(baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })
  url.searchParams.append('key', apiKey)
  return url
}
