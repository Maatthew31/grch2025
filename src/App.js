import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import LightRays from './components/LightRays';
import LiquidEther from './components/LiquidEther';
import AnimatedContent from './components/AnimatedContent';
import { saveVote, hasUserVoted } from './services/votingService';

const nominations = [
  { 
  id: 'king',
  title: 'GRCH кинг', 
  description: 'Самый влиятельный участник GRCH-2025',
  image: '/images/king.jpg',
  candidates: [
    { 
      id: 'king1', 
      name: 'Петрол',
      image: '/images/candidates/petrov.jpg' 
    },
    { 
      id: 'king2', 
      name: 'Вован',
      image: '/images/candidates/vovan.jpg' 
    },
    { 
      id: 'king3', 
      name: 'Алексей',
      image: '/images/candidates/lexa.jpg' 
    },
    { 
      id: 'king4', 
      name: 'Антон',
      image: '/images/candidates/anton.jpg' 
    },
    { 
      id: 'king5', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
    { 
      id: 'king6', 
      name: 'Игорек Буньков',
      image: '/images/candidates/igorb.jpg' 
    },
    { 
      id: 'king7', 
      name: 'Максон',
      image: '/images/candidates/makson.jpg' 
    },
    { 
      id: 'king8', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
  ]
},
   { id: 'lomka',
    title: 'Ломка года', 
    description: 'Самый эпичный момент облома',
    image: '/images/lomka.jpg',
    candidates: [
      { 
      id: 'lomka1', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
       { 
      id: 'lomka2', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
    ]
  },
  { 
    id: 'player',
    title: 'Игрок года', 
    description: 'Лучший участник GRCH-2025',
    image: '/images/player.jpg',
    candidates: [
       { 
      id: 'player1', 
      name: 'Алексей',
      image: '/images/candidates/lexa.jpg' 
    },
       { 
      id: 'player2', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
      { 
      id: 'player3', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
      { 
      id: 'player4', 
      name: 'Вован',
      image: '/images/candidates/vovan.jpg' 
    },
 { 
      id: 'player5', 
      name: 'Петров',
      image: '/images/candidates/petrov.jpg' 
    },
    ]
  },
  { 
  id: 'exit',
  title: 'Выход года', 
  description: 'Самый запоминающийся выход с трассы',
  image: '/images/exit.jpg', // Замените эту строку
  candidates: [
    { id: 'exit1', name: 'Фильм аниме КРД' },
    { id: 'exit2', name: 'Походы в Лампу' },
    { id: 'exit3', name: 'Горячие источники' },
    { id: 'exit4', name: 'Сходка одноклассников' },
{ id: 'exit5', name: 'Блуд' },
{ id: 'exit6', name: 'Квартира Александры Переваловой' }
  ]
},
  { 
    id: 'gift',
    title: 'Дача года', 
    description: 'Самая запоминающаяся раздача',
    image: '/images/gift.jpg',
    candidates: [
       { 
      id: 'gift1', 
      name: 'Дача Лехи',
      image: '/images/candidates/dachalexa.jpg' 
    },
       { 
      id: 'gift2', 
      name: 'Дача Казанцева',
      image: '/images/candidates/dachaigork.jpg' 
    },
      { 
      id: 'gift3', 
      name: 'Дача Вована',
      image: '/images/candidates/dachavovan.jpg' 
    },
      { 
      id: 'gift4', 
      name: 'Сходка',
      image: '/images/candidates/dachaall.jpg' 
    },
 { 
      id: 'gift5', 
      name: 'Дача Антона',
      image: '/images/candidates/dachaanton.jpg' 
    },

    ]
  },
  { 
    id: 'break',
    title: 'Сломать года',
    description: 'Самый запоминающийся слом в гонке',
    image: '/images/break.jpg',
    candidates: [
      { id: 'break1', name: 'Гранта' },
      { id: 'break2', name: 'Форд фокус легенда' },
      { id: 'break3', name: 'Королла' },
      { id: 'break4', name: 'Авента' },
 { id: 'break5', name: 'Четырка' },
 { id: 'break6', name: 'Торнео' },
 { id: 'break7', name: 'Убивашка Игорь Казанцев' },
 { id: 'break8', name: 'Убивашка Алексей' },
 { id: 'break9', name: 'Кресло Игоря Казанцева' },
 { id: 'break10', name: 'Отбойник' },
 { id: 'break11', name: 'Виталя' },
 { id: 'break12', name: 'Диван Алексея' },
    ]
  },
  { 
    id: 'movie',
    title: 'Фильм года', 
    description: 'Лучший фильм про гонки',
    image: '/images/film.jpg',
    candidates: [
      { id: 'movie1', name: 'ЗВЛ' },
      { id: 'movie2', name: 'КРД' },
      { id: 'movie3', name: 'Балерина' },
      { id: 'movie4', name: 'Синистер' }
    ]
  },
  { 
    id: 'meme-person',
    title: 'Человек мем года', 
    description: 'Самый мемный участник GRCH-2025',
    image: '/images/chelmem.jpg',
    candidates: [
      { 
      id: 'meme1', 
      name: 'Петров',
      image: '/images/candidates/petrov.jpg' 
    },
    { 
      id: 'meme2', 
      name: 'Вован',
      image: '/images/candidates/vovan.jpg' 
    },
    { 
      id: 'meme3', 
      name: 'Алексей',
      image: '/images/candidates/lexa.jpg' 
    },
    { 
      id: 'meme4', 
      name: 'Антон',
      image: '/images/candidates/anton.jpg' 
    },
    { 
      id: 'meme5', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
    { 
      id: 'meme6', 
      name: 'Игорек Буньков',
      image: '/images/candidates/igorb.jpg' 
    },
    { 
      id: 'meme7', 
      name: 'Максон',
      image: '/images/candidates/makson.jpg' 
    },
    { 
      id: 'meme8', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
    ]
  },
  { 
    id: 'fail-person',
    title: 'Человек фейл года', 
    description: 'Самый эпичный провал года',
    image: '/images/fail.jpg',
    candidates: [
      { 
      id: 'fail1', 
      name: 'Петров',
      image: '/images/candidates/petrov.jpg' 
    },
    { 
      id: 'fail2', 
      name: 'Вован',
      image: '/images/candidates/vovan.jpg' 
    },
    { 
      id: 'fail3', 
      name: 'Алексей',
      image: '/images/candidates/lexa.jpg' 
    },
    { 
      id: 'fail4', 
      name: 'Антон',
      image: '/images/candidates/anton.jpg' 
    },
    { 
      id: 'fail5', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
    { 
      id: 'fail6', 
      name: 'Игорек Буньков',
      image: '/images/candidates/igorb.jpg' 
    },
    { 
      id: 'fail7', 
      name: 'Максон',
      image: '/images/candidates/makson.jpg' 
    },
    { 
      id: 'fail8', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
    ]
  },
  { 
    id: 'cyber-meat',
    title: 'Киберкотлет года', 
    description: 'Самая запоминающаяся авария',
    image: '/images/cyber.jpg',
    candidates: [
       { 
      id: 'cyber1', 
      name: 'Петров',
      image: '/images/candidates/petrov.jpg' 
    },
    { 
      id: 'cyber2', 
      name: 'Вован',
      image: '/images/candidates/vovan.jpg' 
    },
    { 
      id: 'cyber3', 
      name: 'Алексей',
      image: '/images/candidates/lexa.jpg' 
    },
    { 
      id: 'cyber4', 
      name: 'Антон',
      image: '/images/candidates/anton.jpg' 
    },
    { 
      id: 'cyber5', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
    { 
      id: 'cyber6', 
      name: 'Игорек Буньков',
      image: '/images/candidates/igorb.jpg' 
    },
    { 
      id: 'cyber7', 
      name: 'Максон',
      image: '/images/candidates/makson.jpg' 
    },
    { 
      id: 'cyber8', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
    ]
  },
  { 
    id: 'firework',
    title: 'фейерверк года', 
    description: 'Самый красивый фейерверк',
    image: '/images/bluewatron.jpg',
    candidates: [
      { 
      id: 'firework1', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
      { 
      id: 'firework2', 
      name: 'Игорек',
      image: '/images/candidates/igork.jpg' 
    }
    ]
  },
  { 
    id: 'pair',
    title: 'Пара года', 
    description: 'Самая лучшая пара участников',
    image: '/images/para.jpg',
    candidates: [
      {
      id: 'pair1', 
      name: 'Вован + Александра',
      image: '/images/candidates/vovanalexandra.jpg' 
    },
    { 
      id: 'pair2', 
      name: 'Игорек К. + Чулпан',
      image: '/images/candidates/igorkchulp.jpg' 
    },
    { 
      id: 'pair3', 
      name: 'Курман + Даша',
      image: '/images/candidates/kurmandawa.jpg' 
    },
    { 
      id: 'pair4', 
      name: 'Алексей + Екатерина',
      image: '/images/candidates/lexakatya.jpg' 
    },
    { 
      id: 'pair5', 
      name: 'Игорек Б. + Оля',
      image: '/images/candidates/igorbolya.jpg' 
    },
    { 
      id: 'pair6', 
      name: 'Петров + Ева',
      image: '/images/candidates/petroveva.jpg' 
    },
    ]
  },
  { 
    id: 'edit',
    title: 'Эдит года',
    description: 'Самый креативный монтаж',
    image: '/images/edit.jpg',
    candidates: [
      { id: 'edit1', name: 'Музыкальный клип' },
      { id: 'edit2', name: 'Моменты победы' },
      { id: 'edit3', name: 'Лучшая подборка' },
      { id: 'edit4', name: 'Эмоции на трассе' }
    ]
  },
  { 
    id: 'rollback',
    title: 'Откат года',
    description: 'Самый неожиданный откат в гонке',
    image: '/images/otkat.jpg',
    candidates: [
      { id: 'rollback1', name: 'С лидера на последнее место' },
      { id: 'rollback2', name: 'Провал после победы' },
      { id: 'rollback3', name: 'Драматический откат' },
      { id: 'rollback4', name: 'Возврат на трассу' }
    ]
  },
  { 
    id: 'present',
    title: 'Подарок года',
    description: 'Самый лучший подарок для зрителей',
    image: '/images/podarok.jpg',
    candidates: [
      { id: 'present1', name: 'Футболка Бинанс' },
      { id: 'present2', name: 'ОЧЕНЬ много "настоящих" денег' },
      { id: 'present3', name: 'Пистолет' },
      { id: 'present4', name: 'Кляп' },
{ id: 'present5', name: 'Спортивная бутылка' },
{ id: 'present6', name: 'Тряпки для машины' },
{ id: 'present7', name: 'Держалка для телефона' },
{ id: 'present8', name: 'Дрифт машинка' },
{ id: 'present9', name: 'Кубик рубика' },
{ id: 'present10', name: 'Зеркало с подсветкой' },
{ id: 'present11', name: 'Набор Порш невероятный' },
{ id: 'present12', name: 'Аромка' },
{ id: 'present13', name: 'Паштет душнила' },
{ id: 'present14', name: 'Футблока Бензо' },
{ id: 'present15', name: 'Премиальная жидкость для испарительных устройств' },
{ id: 'present16', name: 'Тралело Тралала' },
{ id: 'present17', name: 'Уно карточки' },
{ id: 'present18', name: 'Эспандер' },
{ id: 'present19', name: 'Cool glasses Майнкрафт' },
{ id: 'present20', name: 'Подвеска парная' },
{ id: 'present21', name: 'Рамка с деньгами' },
{ id: 'present22', name: 'Карточки Покемон' },
{ id: 'present23', name: '20 метров гибкого неона' }
    ]
  },
  { 
    id: 'afk',
    title: 'Афк года',
    description: 'Самый долгий афк участника',
    image: '/images/afk.jpg',
    candidates: [
      {
      id: 'afk1', 
      name: 'Петров',
      image: '/images/candidates/petrov.jpg' 
    },
    { 
      id: 'afk2', 
      name: 'Вован',
      image: '/images/candidates/vovan.jpg' 
    },
    { 
      id: 'afk3', 
      name: 'Алексей',
      image: '/images/candidates/lexa.jpg' 
    },
    { 
      id: 'afk4', 
      name: 'Антон',
      image: '/images/candidates/anton.jpg' 
    },
    { 
      id: 'afk5', 
      name: 'Игорек Казанцев',
      image: '/images/candidates/igork.jpg' 
    },
    { 
      id: 'afk6', 
      name: 'Игорек Буньков',
      image: '/images/candidates/igorb.jpg' 
    },
    { 
      id: 'afk7', 
      name: 'Максон',
      image: '/images/candidates/makson.jpg' 
    },
    { 
      id: 'afk8', 
      name: 'Курман',
      image: '/images/candidates/kurman.jpg' 
    },
    ]
  },
  { 
    id: 'game',
    title: 'Игры года',
    description: 'Самая интересная игра в перерывах',
    image: '/images/game.jpg',
    candidates: [
      { id: 'game1', name: 'Barony' },
      { id: 'game2', name: 'Battlefield' },
      { id: 'game3', name: 'Call of duty' },
      { id: 'game4', name: 'Counter strike' },
{ id: 'game5', name: 'Crime simulator' },
{ id: 'game6', name: 'Dota' },
{ id: 'game7', name: 'Fortnite' },
{ id: 'game8', name: 'LoL' },
{ id: 'game9', name: 'Murky divers' },
{ id: 'game10', name: 'Peak' },
{ id: 'game11', name: 'Fastfood Simulator' },
{ id: 'game12', name: 'Push it Together' },
{ id: 'game13', name: 'Ready or Not' },
{ id: 'game14', name: 'R.E.P.O' },
{ id: 'game15', name: 'RV There Yet' },
{ id: 'game16', name: 'Supermarket Together' },
{ id: 'game17', name: 'The Forest' },
{ id: 'game18', name: 'Tinkerlands' },
{ id: 'game19', name: 'Valorant' },
{ id: 'game20', name: 'Minecraft' },
{ id: 'game21', name: 'Guilty as Sock!' },
{ id: 'game22', name: 'Buckshot Roulette' },
{ id: 'game23', name: 'Apex' },
{ id: 'game24', name: 'Deep Rock Galactic' },
{ id: 'game25', name: 'Grapples Galore' },
{ id: 'game26', name: 'Uno' },
{ id: 'game27', name: 'Alias' },
{ id: 'game28', name: 'Liar Bar' },
    ]
  },
  { 
    id: 'meme-year',
    title: 'Мем года',
    description: 'Самый популярный мем GRCH-2025',
    image: '/images/mem.jpg',
    candidates: [
      { id: 'meme_year1', name: 'Да вы издеваетесь' },
      { id: 'meme_year2', name: 'Я устал' },
      { id: 'meme_year3', name: 'Снова ломка' },
      { id: 'meme_year4', name: 'GRCH не увидит' }
    ]
  }
];

export default function App() {
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [votedNominations, setVotedNominations] = useState(() => {
    const saved = localStorage.getItem('voted_nominations');
    return saved ? JSON.parse(saved) : {};
  });
  const [votes, setVotes] = useState({});
  
  // Новые состояния для множественного выбора
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    localStorage.setItem('voted_nominations', JSON.stringify(votedNominations));
  }, [votedNominations]);

  // Новая функция для выбора кандидата в номинациях с множественным выбором
  const handleCandidateSelect = (candidate) => {
    setSelectedCandidates(prev => {
      // Если кандидат уже выбран, убираем его из выбора
      if (prev.some(c => c.id === candidate.id)) {
        return prev.filter(c => c.id !== candidate.id);
      }
      // Если выбрано меньше 3 кандидатов, добавляем нового
      else if (prev.length < 3) {
        return [...prev, candidate];
      }
      // Иначе ничего не меняем
      return prev;
    });
  };

  // Обновленная функция голосования
const handleVote = async (candidates) => {
  if (!selectedNomination || loading) return;
  
  // Для номинаций с множественным выбором
  if (selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') {
    if (candidates.length !== 3) {
      alert('Пожалуйста, выберите ровно 3 номинанта!');
      return;
    }
    
    // Проверяем, голосовал ли пользователь уже в этой номинации
    if (votedNominations[selectedNomination.id]) {
      alert('Вы уже голосовали в этой номинации!');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Для каждого кандидата отправляем голос
      const results = await Promise.all(candidates.map(candidate => 
        saveVote(selectedNomination, candidate)
      ));
      
      // Проверяем результаты
      const hasError = results.some(result => !result.success);
      if (hasError) {
        throw new Error('Не удалось сохранить один или несколько голосов');
      }
      
      // Обновляем состояния
      setVotedNominations(prev => ({...prev, [selectedNomination.id]: true}));
      setSelectedCandidates([]);
      setShowConfirmation(true);
      
      // Обновляем локальное состояние для отображения
      setVotes(prev => {
        const nominationId = selectedNomination.id;
        const newVotes = {...prev[nominationId] || {}};
        
        candidates.forEach(candidate => {
          const candidateId = candidate.id;
          newVotes[candidateId] = (newVotes[candidateId] || 0) + 1;
        });
        
        return {
          ...prev,
          [nominationId]: newVotes
        };
      });
      
      // Закрываем модальное окно через 2 секунды
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedCandidate(null);
        setSelectedCandidates([]);
        setSelectedNomination(null);
      }, 2000);
      
    } catch (error) {
      console.error('Ошибка при сохранении голоса:', error);
      setError('Ошибка при сохранении голоса. Попробуйте еще раз.');
      alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  } else {
    // Стандартная логика для номинаций с одиночным выбором
    if (votedNominations[selectedNomination.id]) {
      alert('Вы уже голосовали в этой номинации!');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await saveVote(selectedNomination, candidates);
      
      if (result.success) {
        setVotedNominations(prev => ({...prev, [selectedNomination.id]: true}));
        setSelectedCandidate(candidates);
        setShowConfirmation(true);
        
        // Обновляем локальное состояние
        setVotes(prev => {
          const nominationId = selectedNomination.id;
          const candidateId = candidates.id;
          
          return {
            ...prev,
            [nominationId]: {
              ...prev[nominationId],
              [candidateId]: (prev[nominationId]?.[candidateId] || 0) + 1
            }
          };
        });
        
        setTimeout(() => {
          setShowConfirmation(false);
          setSelectedCandidate(null);
          setSelectedNomination(null);
        }, 2000);
      } else {
        setError(result.message || 'Ошибка при сохранении голоса. Попробуйте еще раз.');
        alert(result.message || 'Произошла ошибка при голосовании. Пожалуйста, попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка при сохранении голоса:', error);
      setError('Ошибка при сохранении голоса. Попробуйте еще раз.');
      alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }
};

  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          .gradient-bg {
            background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%);
          }
          .modal-backdrop {
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
          }
          .gradient-button {
            background: linear-gradient(to right, white, #64748b, black);
          }
          .gradient-button:hover {
            background: linear-gradient(to right, #f1f5f9, #475569, #000000);
          }
        `}
      </style>
      
      <div className="font-sans text-gray-200">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Статичный фоновый слой */}
          <div className="absolute inset-0">
            <img 
              src="https://placehold.co/1920x1080/2d0a4d/FFFFFF?text=GRCH+2025" 
              alt="GRCH 2025 Background" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 gradient-bg" />
          </div>
          
          {/* Интерактивный WebGL фон */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.8}
              lightSpread={0.6}
              rayLength={3}
              pulsating={true}
              fadeDistance={0.8}
              saturation={0.8}
              followMouse={true}
              mouseInfluence={0.15}
              noiseAmount={0.1}
              distortion={0.1}
              className="w-full h-full"
            />
          </div>
          
          {/* Контент поверх фона */}
          <div className="relative h-full flex flex-col items-center justify-center z-10">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2 }}
              className="text-5xl md:text-7xl font-bold text-white text-center px-4 tracking-wide drop-shadow-lg"
            >
              GRCH 2025
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-8 text-xl text-gray-300 text-center max-w-2xl px-4"
            >
              Голосуй за лучших в разных номинациях и стань частью грандиозного события года
            </motion.div>
          </div>
        </section>

        {/* Nominations Section */}
<section id="nominations-section" className="py-24 relative overflow-hidden">
  {/* Черный фон */}
  <div className="absolute inset-0 bg-black z-0" />
  
  {/* Фон с эффектом LiquidEther */}
  <div className="absolute inset-0 z-10">
    <LiquidEther
      colors={['#ffffff', '#ffffff', '#ffffff']}
      mouseForce={20}
      cursorSize={100}
      isViscous={false}
      viscous={30}
      iterationsViscous={32}
      iterationsPoisson={32}
      resolution={0.5}
      isBounce={false}
      autoDemo={true}
      autoSpeed={0.5}
      autoIntensity={2.2}
      takeoverDuration={0.25}
      autoResumeDelay={3000}
      autoRampDuration={0.6}
      className="w-full h-full"
    />
    {/* Градиентный оверлей для лучшей читаемости */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
  </div>
  
  {/* Контент поверх фона */}
  <div className="container mx-auto px-4 relative z-20">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-bold text-white text-center mb-16 drop-shadow-lg"
    >
      Номинации
    </motion.h2>
    
    {/* Сетка с 3 колонками на больших экранах */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {nominations.map((nom, index) => (
        <div 
          key={index}
          className="cursor-pointer"
          onClick={() => setSelectedNomination(nom)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedNomination(nom);
            }
          }}
        >
          <AnimatedContent
            distance={50}
            direction="vertical"
            duration={0.6}
            delay={index * 0.1}
            initialOpacity={0}
            animateOpacity={true}
            scale={1}
            threshold={0.2}
            className="h-full"
          >
            <div
              className="bg-zinc-900/85 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-zinc-800/50 flex flex-col h-full"
            >
              <div className="flex-shrink-0">
                <img 
                  src={nom.image} 
                  alt={nom.title} 
                  className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Ошибка загрузки изображения для номинации: ${nom.title}`);
                    e.target.src = `https://placehold.co/800x600/333/FFF?text=${encodeURIComponent(nom.title)}`;
                  }}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{nom.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{nom.description}</p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Модальное окно с выбором номинантов */}
<AnimatePresence>
  {selectedNomination && (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={() => {
        setSelectedNomination(null);
        setSelectedCandidate(null);
        setSelectedCandidates([]);
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={e => e.stopPropagation()}
        className="bg-zinc-900/85 rounded-2xl overflow-hidden shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">{selectedNomination.title}</h2>
            <button
              onClick={() => {
                setSelectedNomination(null);
                setSelectedCandidate(null);
                setSelectedCandidates([]);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300 mb-8 text-center">{selectedNomination.description}</p>
          
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game')
              ? 'Выбери 3 победителя' 
              : 'Выбери своего победителя'}
          </h3>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Индикатор множественного выбора */}
          {(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') && (
            <div className="mb-6 text-center text-lg font-bold text-white">
              Выбрано: <span className="text-red-400">{selectedCandidates.length}</span> из 3
            </div>
          )}
          
          {/* Определяем тип номинации и количество колонок */}
          {selectedNomination.candidates.some(c => c.image) ? (
            // Тип 1: Номинация с людьми (с фотографиями)
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {selectedNomination.candidates.map((candidate, idx) => (
                <AnimatedContent
                  key={candidate.id}
                  distance={50}
                  direction="vertical"
                  duration={0.6}
                  delay={idx * 0.05}
                  initialOpacity={0}
                  animateOpacity={true}
                  scale={1}
                  threshold={0.1}
                  className="w-full"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-zinc-800/70 rounded-xl p-4 border ${
                      selectedCandidate?.id === candidate.id || 
                      selectedCandidates.some(c => c.id === candidate.id)
                        ? 'border-red-400'
                        : 'border-zinc-700/50'
                    } transition-all duration-300 cursor-pointer h-full flex flex-col`}
                    onClick={() => {
                      if (selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') {
                        handleCandidateSelect(candidate);
                      } else {
                        setSelectedCandidate(candidate);
                      }
                    }}
                  >
                    {candidate.image ? (
                      <div className="flex-shrink-0 w-full h-40 rounded-lg overflow-hidden border-2 border-zinc-600/50 mb-4">
                        <img 
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/160x160/333/FFF?text=${encodeURIComponent(candidate.name)}`;
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-full h-40 flex items-center justify-center rounded-lg overflow-hidden border-2 border-zinc-600/50 mb-4 bg-zinc-900">
                        <div className="text-center p-2">
                          <div className="text-4xl mb-2">👤</div>
                          <h4 className="text-lg font-bold text-white">{candidate.name}</h4>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center p-2">
                      <h4 className="text-lg font-bold text-white mb-2">{candidate.name}</h4>
                      {/* Индикация множественного выбора */}
                      {(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') && selectedCandidates.some(c => c.id === candidate.id) && (
                        <div className="text-xs text-red-400 mt-1">
                          {selectedCandidates.findIndex(c => c.id === candidate.id) + 1}-й выбранный
                        </div>
                      )}
                      {/* Индикация одиночного выбора */}
                      {!(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') && selectedCandidate?.id === candidate.id && (
                        <div className="text-xs text-red-400 mt-1">Выбран</div>
                      )}
                    </div>
                  </motion.div>
                </AnimatedContent>
              ))}
            </div>
          ) : (
            // Тип 2: Номинация с событиями (без фотографий)
            <div className={`grid grid-cols-7 md:grid-cols-${selectedNomination.id === 'game' ? '7' : (selectedNomination.id === 'present' ? '6' : '4')} gap-6 mb-8`}>
              {selectedNomination.candidates.map((candidate, idx) => (
                <AnimatedContent
                  key={candidate.id}
                  distance={50}
                  direction="vertical"
                  duration={0.6}
                  delay={idx * 0.05}
                  initialOpacity={0}
                  animateOpacity={true}
                  scale={1}
                  threshold={0.1}
                  className="w-full"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`bg-zinc-900 rounded-xl p-4 border ${
                      selectedCandidate?.id === candidate.id || 
                      selectedCandidates.some(c => c.id === candidate.id)
                        ? 'border-red-400'
                        : 'border-zinc-700/50'
                    } transition-all duration-300 cursor-pointer h-full flex flex-col`}
                    onClick={() => {
                      if (selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') {
                        handleCandidateSelect(candidate);
                      } else {
                        setSelectedCandidate(candidate);
                      }
                    }}
                  >
                    {/* Карточка без фото для событий */}
                    <div className="flex-shrink-0 w-full h-40 flex items-center justify-center rounded-lg border-2 border-zinc-600/50 mb-4 bg-zinc-800">
                      <h4 className="text-lg font-bold text-white text-center px-2 break-words leading-tight">
                        {candidate.name}
                      </h4>
                    </div>
                    
                    <div className="text-center">
                      {/* Индикация множественного выбора */}
                      {(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') && selectedCandidates.some(c => c.id === candidate.id) && (
                        <div className="text-xs text-red-400 mt-1 mb-2">
                          {selectedCandidates.findIndex(c => c.id === candidate.id) + 1}-й выбранный
                        </div>
                      )}
                      {/* Индикация одиночного выбора */}
                      {!(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') && selectedCandidate?.id === candidate.id && (
                        <div className="text-xs text-red-400 mt-1 mb-2">Выбран</div>
                      )}
                    </div>
                  </motion.div>
                </AnimatedContent>
              ))}
            </div>
          )}
          
          {/* Кнопка подтверждения голосования */}
          {(selectedCandidate || (selectedNomination && (selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') && selectedCandidates.length > 0)) && (
            <div className="mt-6">
              {(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit' || selectedNomination.id === 'present' || selectedNomination.id === 'game') ? (
                // Множественный выбор
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVote(selectedCandidates)}
                  disabled={loading || selectedCandidates.length !== 3}
                  className={`w-full px-8 py-4 gradient-button text-black font-bold rounded-xl text-xl hover:from-gray-100 hover:to-gray-700 hover:to-black transition-all duration-300 ${selectedCandidates.length !== 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Сохранение...' : `Голосовать за ${selectedCandidates.length} из 3`}
                </motion.button>
              ) : (
                // Одиночный выбор
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVote(selectedCandidate)}
                  disabled={loading}
                  className="w-full px-8 py-4 gradient-button text-black font-bold rounded-xl text-xl hover:from-gray-100 hover:to-gray-700 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Сохранение...' : `Голосовать за ${selectedCandidate.name}`}
                </motion.button>
              )}
              
              <div className="mt-4 text-center text-sm text-gray-400">
                <button
                  onClick={() => {
                    setSelectedCandidate(null);
                    setSelectedCandidates([]);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Изменить выбор
                </button>
              </div>
            </div>
          )}
          
          {/* Кнопка "Посмотреть видео" только для Откат года и Эдит года */}
          {(selectedNomination.id === 'rollback' || selectedNomination.id === 'edit') && (
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  let videoUrl;
                  if (selectedNomination.id === 'rollback') {
                    videoUrl = 'https://www.youtube.com/watch?v=03JZ-RXVJJM';
                  } else if (selectedNomination.id === 'edit') {
                    videoUrl = 'https://www.youtube.com/shorts/FN3h27VK6z8';
                  }
                  window.open(videoUrl, '_blank');
                }}
                className="w-full px-8 py-3 bg-gradient-to-r from-zinc-700 to-black text-white font-bold rounded-xl text-lg hover:from-zinc-600 hover:to-black transition-all duration-300"
              >
                Посмотреть видео
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
        {/* Модальное окно подтверждения голоса */}
        <AnimatePresence>
          {showConfirmation && selectedCandidate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-zinc-900 rounded-2xl p-8 text-center max-w-md mx-4 border border-green-500/50 shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-6xl mb-4 text-green-400"
                >
                  ✓
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  Ваш голос учтен!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-lg"
                >
                  Спасибо за участие в голосовании GRCH 2025!
                </motion.p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}