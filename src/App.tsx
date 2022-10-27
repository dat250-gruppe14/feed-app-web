import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from './routes/components/ErrorBoundary';
import { Routes } from './routes/Routes';
import GlobalStyle from './styles/global';
import { Header } from './components/Header';
import { PageWrapper } from './components/PageWrapper';
import { Card } from './components/Card';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PageWrapper>
          <GlobalStyle />
          <Header />
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </PageWrapper>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
