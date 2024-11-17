import './App.css'
import { createContext, useEffect, useState } from 'react';
import { Header } from './components/header';
import { User } from './types';
import { Footer } from './components/footer';
import { QuestionSection } from './components/question';
import { Toaster } from 'react-hot-toast';

export const UserContext = createContext<User>(null)

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  async function getLocalUser() {
    const { userData } = await chrome.storage.local.get("userData");
    if (userData) {
      setUser(userData);
    } else {
      window.open('http://localhost:8080', '_blank').focus();
    }
  }

  async function getCurrentUrl() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    setCurrentUrl(tab.url);
  }

  useEffect(() => {
    getLocalUser();
    getCurrentUrl();
  }, [])

  return (
    <UserContext.Provider value={user}>
      {user && currentUrl && <>
        <Header user={user} />
        <QuestionSection currentUrl={currentUrl} />
      </>}
      <Toaster />
      <Footer />
    </UserContext.Provider>
  )
}
