import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from './components/GlobalStyle';

import Pages from './pages';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// 로컬 토큰 확인
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

// 초기 로드에 캐시 데이터 쓰기
cache.writeData({ data });

// 토큰을 확인하고 콘텍스트에 대한 헤더 반환
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

// 캐시 초기화 후 캐시 데이터 쓰기
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
