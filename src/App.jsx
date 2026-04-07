import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Connessione from './tools/connessione/Connessione.jsx'
import Permission from './tools/permission/Permission.jsx'
import Combinatoria from './tools/combinatoria/Combinatoria.jsx'
import Decoder from './tools/decoder/Decoder.jsx'
import Examination from './tools/examination/Examination.jsx'
import Apprenticeship from './tools/apprenticeship/Apprenticeship.jsx'
import Commonplace from './tools/commonplace/Commonplace.jsx'

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
        <Route path="/apprenticeship" element={<Apprenticeship />} />
        <Route path="/commonplace" element={<Commonplace />} />
      </Routes>
    </BrowserRouter>
  )
}
