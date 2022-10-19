import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from './routes/components/ErrorBoundary';
import { Routes } from './routes/Routes';
import GlobalStyle from './styles/global';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <GlobalStyle />
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
