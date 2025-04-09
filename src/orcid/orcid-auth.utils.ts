/**
 * Generates the URL for initializing the ORCID auth process.
 * @param baseUrl - The base URL for the auth initiation.
 * @param scope - An optional scope parameter that defines the level of access requested during OAuth authentication
 * @returns The constructed URL for initiating the ORCID auth process
 */
export const getOrcidAuthInitUrl = (
  baseUrl: string | URL,
  scope?: string
): URL => {
  const url = new URL('rsc/orcid/oauth/init', baseUrl);
  if (scope) {
    url.searchParams.append('scope', scope);
  }
  return url;
};
