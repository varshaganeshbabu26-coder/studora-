import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import PublicLayout from '../layouts/PublicLayout'
import AiQuiz from '../pages/AiQuiz'
import AppPlaceholder from '../pages/AppPlaceholder'
import AiTutor from '../pages/AiTutor'
import Dashboard from '../pages/Dashboard'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import SavedContent from '../pages/SavedContent'
import SmartNotes from '../pages/SmartNotes'
import StudyPlanner from '../pages/StudyPlanner'
import SubjectDetail from '../pages/SubjectDetail'
import Subjects from '../pages/Subjects'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/dashboard" element={<Navigate replace to="/app/dashboard" />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tutor" element={<AiTutor />} />
        <Route path="notes" element={<SmartNotes />} />
        <Route path="quiz" element={<AiQuiz />} />
        <Route path="planner" element={<StudyPlanner />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="subjects/:id" element={<SubjectDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/user" element={<Navigate replace to="/app/dashboard" />} />
      <Route path="/admin" element={<Navigate replace to="/app/dashboard" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
