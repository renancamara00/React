import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/home/Home'
import UserCrud from './components/users/UserCrud';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<UserCrud />} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    )
}