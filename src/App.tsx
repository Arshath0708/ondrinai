import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage';
import { ActivityDetailPage } from '@/pages/ActivityDetailPage';
import { GetInvolvedPage } from '@/pages/GetInvolvedPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { DonatePage } from '@/pages/DonatePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:slug" element={<ActivityDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
