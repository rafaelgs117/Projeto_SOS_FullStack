import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SosButton from './components/SosButton';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Maria Silva', phone: '(48) 99999-1111', relation: 'Mãe' },
    { id: 2, name: 'João Silva', phone: '(48) 98888-2222', relation: 'Irmão' }
  ]);
  const [user, setUser] = useState({ name: 'Usuário SOS', birth: '15/05/2000' });
  const [sosCount, setSosCount] = useState(0);

  const addContact = (contact) => {
    if (contacts.length >= 5) return false;
    setContacts(prev => [...prev, { ...contact, id: Date.now() }]);
    return true;
  };

  const removeContact = (id) => setContacts(prev => prev.filter(c => c.id !== id));

  const sendSos = () => setSosCount(c => c + 1);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Header user={user} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home contacts={contacts} onSendSos={sendSos} sosCount={sosCount} />} />
          <Route path="/contatos" element={<Contacts contacts={contacts} onAdd={addContact} onRemove={removeContact} />} />
          <Route path="/perfil" element={<Profile user={user} onSave={setUser} />} />
          <Route path="/configuracoes" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </main>
      <BottomNav />
      <SosButton onSend={sendSos} />
    </div>
  );
}
