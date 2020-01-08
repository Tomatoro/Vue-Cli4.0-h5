import router from '../router';
import store from '../store';
import axios from 'axios';
import whiteList from '../config/white-list';
import util from '../util';
import { Toast } from 'vant';

// create an axios instance with default configuration
const instance = axios.create({
  baseURL: window.location.origin,
  timeout: 8000,
  maxContentLength: 5 * 1024
});

// request interceptor
instance.interceptors.request.use(
  function(config) {
    const { url, headers } = config;

    // not login endpoint
    // TODO: get and attach token to header
    (!/.*\/login/i.test(url)) && (headers['tk'] = 'TOKEN');

    return config;
  },
  function(e) {
    console.error('http config error: ', e);

    return Promise.reject(e);
  }
);

// response interceptor
instance.interceptors.response.use(
  function(res) {
    const { data } = res;

    return Promise.resolve(data);
  },
  function(e) {
    console.error('http response error: ', e);

    return Promise.reject(e);
  }
);

export default async params => {
  let {
    url,
    method,
    data,
    headers,
    timeout,
    silence
  } = params;

  method = method ? method.toLowerCase() : 'get';

  // common configuration for request
  const commonConf = {
    url,
    method
  };
  headers && (commonConf.headers = headers);
  timeout && (commonConf.timeout = timeout);

  // content-type
  const contentType = headers ? headers['Content-Type'] || headers['content-type'] : '';
  // payload according to method and content-type
  const specialConf = method === 'get' || method === 'delete' || method === 'head'
    ? {
      params: data
    }
    // post, put or patch
    : contentType.includes('application/x-www-form-urlencoded')
      // FormData
      ? {
        data,
        transformRequest: [data => util.query.serialize(data)]
      }
      // JSON
      : {
        data
      };

  // send request
  try {
    !silence && store.commit('mttRequestCount');

    const res = await instance.request(Object.assign({}, commonConf, specialConf));

    !silence && store.commit('mttRequestCount', true);

    // respond nothing
    if (!res) {
      !silence && Toast.fail('服务异常，请重试');

      return null;
    }

    // response code of business
    const { code } = res;

    // token invalid or expired
    if (code === '10001') {
      const { currentRoute: { name } } = router;

      await router.replace({
        name: 'login',
        // specify where to redirect after login successfully
        query: { to: name }
      });

      Toast.fail('登录失效，请重新登录');

      return null;
    }

    // business error
    if (code !== '10000') return whiteList.includes(code) ? res : null;

    return res;

  } catch (e) {
    if (!silence) {
      store.commit('mttRequestCount', true);

      Toast.fail('网络异常，请重试');
    }

    return null;
  }
};
