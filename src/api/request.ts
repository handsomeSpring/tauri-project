
import { fetch } from '@tauri-apps/plugin-http';
import { getToken } from './auth';

const baseApiUrl = 'https://api.idvasg.cn/api/';
interface RequestOptions {
  url: string
  method: 'PUT' | 'DELETE' | 'POST' | 'GET',
  params?: Object
  data?: Object
}

function createUrl(url: string, params = {}) {
  let urlParams: string[] = [];
  if (params && typeof params === 'object' && !Array.isArray(params) && Object.keys(params).length > 0) {
    for (const [key, value] of Object.entries(params)) {
      urlParams.push(`${key}=${encodeURIComponent(value)}`);
    }
    return baseApiUrl + url + '?' + urlParams.join("&")
  } else {
    return baseApiUrl + url;
  }
}
export const request = (options: RequestOptions) => {
  return new Promise((resolve, reject) => {
    const { url, method, params, data } = options;
    fetch(createUrl(url, params), {
      method: method || 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      timeout: 10000,
      body: JSON.stringify(data)
    })
      .then(async (response: Response) => {
        console.log(response, 'response')
        if (response.status === 200) {
          let contentType;
          let result;
          const headersArray = response.headers.entries();
          for (const [key, value] of headersArray) {
            if (key === 'content-type') {
              contentType = value;
              break;
            }
          }
          if (contentType && contentType.includes('application/json')) {
            result = await response.json();
          } else {
            result = await response.text();
          }
          return resolve(result);
        } else {
          reject({
            message: "服务端错误代码：" + response.status + "-" + response.statusText,
          });
        }
      })
      .catch((e: any) => reject({ message: `网络错误: ${e}` }));
  })
}
