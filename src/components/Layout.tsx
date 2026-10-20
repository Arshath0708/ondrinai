import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { BackToTop } from '@/components/BackToTop';
import { FloatingImpactBar } from '@/components/FloatingImpactBar';
import { AIAvatarGuide } from '@/components/AIAvatarGuide';
import { ThemeProvider } from '@/context/ThemeContext';

export function Layout() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <FloatingImpactBar />
      <AIAvatarGuide />
      <BackToTop />
    </ThemeProvider>
  );
}
