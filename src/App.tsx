import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardLayout } from './pages/Dashboard/DashboardLayout';
import { Overview } from './pages/Dashboard/Overview';
import { Simulation } from './pages/Dashboard/Simulation';
import { MapAnalytics } from './pages/Dashboard/MapAnalytics';
import { Rankings } from './pages/Rankings';
import { ChatLayout } from './pages/Chat/ChatLayout';
import { ChatPage } from './pages/Chat/ChatPage';
import { History } from './pages/Chat/History';
import { AboutLayout } from './pages/About/AboutLayout';
import { Project } from './pages/About/Project';
import { Team } from './pages/About/Team';
import { Contact } from './pages/About/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard/overview" replace />} />

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="map-analytics" element={<MapAnalytics />} />
          </Route>

          <Route path="rankings" element={<Rankings />} />

          <Route path="chat" element={<ChatLayout />}>
            <Route index element={<ChatPage />} />
            <Route path="history" element={<History />} />
          </Route>

          <Route path="about" element={<AboutLayout />}>
            <Route index element={<Project />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
