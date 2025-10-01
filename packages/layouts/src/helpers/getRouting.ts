import type { APIContext } from 'astro';

export const getRouting = (url: APIContext['url'], originPathname: APIContext['originPathname'], routePattern: APIContext['routePattern'], params: APIContext['params']) => {
  const patternItems = routePattern.split('/');
  const pathItems = url.pathname.split('/');

  const parentPath = pathItems.filter(item => patternItems.includes(item)).join('/');

  return {
    url,
    pattern: {
      routePattern,
      patternItems,
      params,
    },
    path: {
      pathname: url.pathname,
      pathItems,
      parentPath,
      originPathname,
      rewrite: originPathname.replace(/\/$/, '') !== url.pathname,
    },
    query: Object.fromEntries(url.searchParams),
  };
}
