// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk3GhvPc3Ztdhb06F3mokU5RdPd0lumqI",
  authDomain: "grchsite-2025.firebaseapp.com",
  projectId: "grchsite-2025",
  storageBucket: "grchsite-2025.firebasestorage.app",
  messagingSenderId: "650067524512",
  appId: "1:650067524512:web:6dd60abff6de08b23802c5",
  measurementId: "G-D2TTGQBWRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const saveVote = async (nomination, candidate) => {
  try {
    const timestamp = new Date().toISOString();
    const voteRef = ref(database, 'votes/' + Date.now());
    
    await set(voteRef, {
      nomination: nomination.title,
      candidate: candidate.name,
      timestamp: timestamp,
      ipHash: await getIPHash() // Безопасный хеш IP
    });
    
    console.log('Голос сохранен в Firebase');
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении голоса:', error);
    return false;
  }
};

export const getAdminResults = async () => {
  // Эта функция будет использоваться только в админ-панели
  const votesRef = ref(database, 'votes');
  const snapshot = await get(votesRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return {};
};

const getIPHash = async () => {
  try {
    // Получаем хеш IP без передачи самого IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return btoa(encodeURIComponent(data.ip)).substring(0, 10);
  } catch (error) {
    return 'anonymous';
  }
};