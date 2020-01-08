import limitedRoutes from '../router/limited';

/**
 * generate dynamic routes according to the name of authorised routes
 * @param authorisedRoutes
 * @param routes
 * @returns {[]}
 */
export default function dynamicRoutes(authorisedRoutes, routes = limitedRoutes) {
  const matched = [];

  if (!Array.isArray(authorisedRoutes) || !Array.isArray(routes)) return matched;

  authorisedRoutes.forEach(name => {
    const route = routes.find(item => item.name === name);

    if (!route) return;

    matched.push(route);

    const { children } = route;

    if (!children || !children.length) return;

    route.children = dynamicRoutes(authorisedRoutes, children);

  });

  return matched;

}
