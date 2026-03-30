import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Connessione from './tools/connessione/Connessione.jsx'
import Permission from './tools/permission/Permission.jsx'
import Combinatoria from './tools/combinatoria/Combinatoria.jsx'
import Decoder from './tools/decoder/Decoder.jsx'
import Examination from './tools/examination/Examination.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connessione" element={<Connessione />} />
        <Route path="/permission" element={<Permission />} />
        <Route path="/combinatoria" element={<Combinatoria />} />
        <Route path="/decoder" element={<Decoder />} />
        <Route path="/examination" element={<Examination />} />
      </Routes>
    </BrowserRouter>
  )
}
