import getUsersApi, {normalizeEndCursor, normalizeHasNextPage, normalizeUserApiResponse} from '@/shared/api/getUsersApi';
import * as axios from "axios";

jest.mock("axios");

const mockAxiosResponse = {
  data: {
    data: {
      users: {
        edges: [{
          node: {
            avatarUrl: 'https://avatars1.githubusercontent.com/u/2715?v=4',
            username: 'wlopes0',
            name: 'Wlopes0',
            webUrl: ''
          }
        }, {
          node: {
            avatarUrl: 'https://avatars1.githubusercontent.com/u/2715?v=4',
            username: 'wlopes1',
            name: 'Wlopes1',
            webUrl: ''
          }
        }, {
          node: {
            avatarUrl: 'https://avatars1.githubusercontent.com/u/2715?v=4',
            username: 'wlopes2',
            name: 'Wlopes2',
            webUrl: ''
          }
        }, {
          node: {
            avatarUrl: 'https://avatars1.githubusercontent.com/u/2715?v=4',
            username: 'wlopes3',
            name: 'Wlopes3',
            webUrl: ''
          }
        }, {
          node: {
            avatarUrl: 'https://avatars1.githubusercontent.com/u/2715?v=4',
            username: 'wlopes4',
            name: 'Wlopes4',
            webUrl: ''
          }
        }],
        pageInfo: {
          endCursor: 'endcursor.example',
          hasNextPage: true
        }
      }
    }
  }
};

axios.post.mockResolvedValueOnce(mockAxiosResponse);

describe('Integration functions', () => {

  it('should fetch API loading by partial username', async () => {
    const result = await getUsersApi('wlopes');

    expect(result.length).toBe(5);
    expect(result.every(({ username }) => username.includes('wlopes'))).toBe(true);
  });

  it('should normalize API response to format expected on app', () => {
    const result = normalizeUserApiResponse(mockAxiosResponse);

    result.forEach(user => {
      expect(user).toHaveProperty('avatarUrl');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('webUrl');
    });
  });

  it('should return empty array if API response is with error messages', () => {
    const result = normalizeUserApiResponse({
      errors: [
        {
          message: 'No users found',
          type: 'not_found',
          path: 'users',
        }
      ]
    });
    expect(result.length).toBe(0);
  });

  it('should get endCursor from API response', () => {
    const result = normalizeEndCursor(mockAxiosResponse);
    expect(result).toBe('endcursor.example');
  });

  it('should get if has next page from API response', () => {
    const result = normalizeHasNextPage(mockAxiosResponse);
    expect(result).toBe(true);
  });
});
