/**
 * validate the route that user typed in location is valid or not
 * @param routeName
 * @param routes
 * @returns {boolean}
 */
export default function validateRoute(routeName, routes) {
  let valid = false;

  if (!routeName || !routes || !routes.length) return valid;

  for (let i = 0; i < routes.length; i++) {
    if (valid) break;

    const { name, children } = routes[i];

    if (name === routeName) {
      valid = true;

      break;
    }

    children && children.length && (valid = validateRoute(routeName, children));
  }

  return valid;

}

