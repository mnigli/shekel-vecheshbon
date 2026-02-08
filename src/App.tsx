import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import CategoryPage from './pages/CategoryPage.tsx'
import ArticlePage from './pages/ArticlePage.tsx'
import SearchResultsPage from './pages/SearchResultsPage.tsx'
import EncyclopediaPage from './pages/EncyclopediaPage.tsx'
import EncyclopediaEntryPage from './pages/EncyclopediaEntryPage.tsx'
import GuidesPage from './pages/GuidesPage.tsx'
import GuideDetailPage from './pages/GuideDetailPage.tsx'
import ToolsPage from './pages/ToolsPage.tsx'
import QAPage from './pages/QAPage.tsx'

export default function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/encyclopedia" element={<EncyclopediaPage />} />
        <Route path="/encyclopedia/entry/:slug" element={<EncyclopediaEntryPage />} />
        <Route path="/encyclopedia/:sectionId" element={<EncyclopediaPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:trackId" element={<GuidesPage />} />
        <Route path="/guide/:slug" element={<GuideDetailPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/qa" element={<QAPage />} />
      </Routes>
    </PageLayout>
  )
}
