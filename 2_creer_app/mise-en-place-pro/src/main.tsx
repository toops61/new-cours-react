import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/style.css';
import { store } from './redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          cacheTime: 3600000
        }
      }
    })}>
    <Provider store = {store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </QueryClientProvider>
  </React.StrictMode>,
)
