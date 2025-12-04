import { database } from '../firebaseConfig';
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

// Простой и надежный способ получения ID устройства
const getDeviceId = () => {
  // Пытаемся получить существующий ID из localStorage
  let deviceId = localStorage.getItem('device_id');
  
  if (deviceId) {
    return deviceId;
  }
  
  // Если нет ID в localStorage, создаем новый
  deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
  
  // Сохраняем ID
  localStorage.setItem('device_id', deviceId);
  return deviceId;
};

// Проверяем, голосовал ли пользователь в этой номинации
export const hasUserVoted = async (nominationId) => {
  try {
    // Быстрая проверка в localStorage
    const votedNominations = JSON.parse(localStorage.getItem('voted_nominations') || '{}');
    if (votedNominations[nominationId]) {
      return true;
    }
    
    // Надежная проверка в Firebase
    const deviceId = getDeviceId();
    const votesRef = ref(database, 'votes');
    
    const votesQuery = query(
      votesRef,
      orderByChild('deviceIdNomination'),
      equalTo(`${deviceId}_${nominationId}`)
    );
    
    const snapshot = await get(votesQuery);
    
    if (snapshot.exists()) {
      // Помечаем, что пользователь голосовал в этой номинации
      votedNominations[nominationId] = true;
      localStorage.setItem('voted_nominations', JSON.stringify(votedNominations));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Ошибка при проверке голосования:', error);
    // В случае ошибки разрешаем голосование
    return false;
  }
};

// Сохраняем голос
export const saveVote = async (nomination, candidate) => {
  try {
    const voteId = uuidv4();
    const deviceId = getDeviceId();
    const timestamp = new Date().toISOString();
    
    const voteData = {
      nomination: nomination.title,
      nominationId: nomination.id,
      candidate: candidate.name,
      candidateId: candidate.id,
      timestamp,
      deviceId,
      isMultiVote: nomination.id === 'rollback' || nomination.id === 'edit'
    };

    await set(ref(database, `votes/${voteId}`), voteData);
    
    // Обновляем localStorage для быстрой проверки
    const votedNominations = JSON.parse(localStorage.getItem('voted_nominations') || '{}');
    votedNominations[nomination.id] = true;
    localStorage.setItem('voted_nominations', JSON.stringify(votedNominations));
    
    return { success: true, voteId };
  } catch (error) {
    console.error('Ошибка при голосовании:', error);
    return { success: false, error: error.message };
  }
};