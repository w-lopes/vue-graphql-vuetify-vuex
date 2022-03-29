import env from '@/env';
import axios from 'axios';
import { pathOr, pipe, map, prop } from 'ramda';
import query from '@/shared/queries/userSeachQuery';
import store from '@/store';

/**
 * Create axios configs.
 *
 * @returns {Object}
 */
const getAxiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${env.gitLabKey}`
  }
});

/**
 * Create a query variables object.
 *
 * @param {string} partialUserName
 * @param {number} resultQuantity
 * @param {string} endCursor
 * @returns {Object}
 */
const getQueryVariables = (partialUserName, resultQuantity, endCursor) => ({
  partialUserName,
  first: resultQuantity,
  after: endCursor,
});

/**
 * Update store with autocomplete paginate info.
 *
 * @param {object} response
 */
const updateAutocompletePagination = (response) => {
  const hasNextPage = normalizeHasNextPage(response);
  const endCursor = normalizeEndCursor(response);

  store.commit('setAutoCompleteHasNextPage', hasNextPage);
  store.commit('setAutocompleteEndCursor', endCursor);
}

/**
 * Get end cursor from API response.
 *
 * @param {object} response
 * @returns {string}
 */
export const normalizeEndCursor = pathOr('', ['data', 'data', 'users', 'pageInfo', 'endCursor']);

/**
 * Get from API result if it has next page.
 *
 * @param {object} response
 * @returns {boolean}
 */
export const normalizeHasNextPage = pathOr(false, ['data', 'data', 'users', 'pageInfo', 'hasNextPage']);

/**
 * Normalize the response from the API.
 *
 * @param {Object} response
 * @returns {Array}
 */
export const normalizeUserApiResponse = pipe(
  pathOr([], ['data', 'data', 'users', 'edges']),
  map(({ node }) => ({
    avatarUrl: prop('avatarUrl', node),
    username: prop('username', node),
    name: prop('name', node),
    webUrl: prop('webUrl', node),
  }))
);

/**
 * Get users from the GitLab API.
 *
 * @param {string} partialUserName
 * @returns {array}
 */
const getUsersApi = async (partialUserName = '') => {
  if (!partialUserName) {
    return [];
  }

  const endCursor = store.state.autocompletePage.endCursor;
  const response = await axios.post(
    `${env.gitLabGraphQLUrl}`,
    {
      query,
      variables: getQueryVariables(partialUserName, 5, endCursor),
    },
    getAxiosConfig()
  );

  updateAutocompletePagination(response);

  return normalizeUserApiResponse(response)
};

export default getUsersApi;
