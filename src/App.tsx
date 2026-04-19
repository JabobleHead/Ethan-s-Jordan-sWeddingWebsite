import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SiteHeader } from './components/SiteHeader';
import { SkipToContent } from './components/SkipToContent';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './theme';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Registry from './pages/Registry';
import WeddingParty from './pages/WeddingParty';
import FAQ from './pages/FAQ';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <SkipToContent />
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/wedding-party" element={<WeddingParty />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
