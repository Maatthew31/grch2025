// src/AdminPanel.js
import { useState, useEffect } from 'react';
import { getResults } from './services/votingService';

export default function AdminPanel() {
  const [adminKey, setAdminKey] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getResults(adminKey.trim());
      setResults(data);
    } catch (error) {
      setError(error.message || 'Ошибка при загрузке результатов');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!results) return;
    
    const rows = [];
    rows.push(['Номинация', 'Кандидат', 'Голосов']);
    
    results.nominations.forEach(nomination => {
      nomination.candidates.forEach(candidate => {
        rows.push([nomination.title, candidate.name, candidate.votes]);
      });
    });
    
    const csvContent = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `grch2025_results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">GRCH 2025 - Админ панель</h1>
        
        {!results ? (
          <div className="bg-zinc-800/50 rounded-xl p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Админский ключ
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Введите админский ключ"
                />
              </div>
              
              {error && (
                <div className="text-red-400 text-sm p-2 bg-red-400/10 rounded-lg">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Загрузка...' : 'Показать результаты'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Экспортировать в CSV
              </button>
            </div>
            
            {results.nominations.map((nomination, index) => {
              // Считаем общее количество голосов в номинации
              const totalVotes = nomination.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
              
              // Находим победителя
              const winner = nomination.candidates.reduce((prev, current) => 
                prev.votes > current.votes ? prev : current
              );
              
              return (
                <div key={index} className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{nomination.title}</h2>
                    <span className="text-purple-400 font-medium">
                      Всего голосов: {totalVotes}
                    </span>
                  </div>
                  
                  {totalVotes > 0 ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-4 border border-purple-500/30">
                        <div className="text-lg font-bold text-purple-300">Победитель:</div>
                        <div className="text-2xl font-bold text-white mt-1">{winner.name}</div>
                        <div className="text-purple-400 font-medium mt-1">
                          {winner.votes} голосов ({Math.round((winner.votes / totalVotes) * 100)}%)
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {nomination.candidates.map((candidate, cIndex) => {
                          const percentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
                          
                          return (
                            <div key={cIndex} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
                                <span className="text-gray-300">{candidate.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-purple-400 font-medium">
                                  {candidate.votes} голосов ({percentage}%)
                                </span>
                                <div className="w-40 bg-zinc-700 rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-600"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">Пока нет голосов</p>
                  )}
                </div>
              );
            })}
            
            <div className="text-center">
              <button
                onClick={() => {
                  setResults(null);
                  setAdminKey('');
                }}
                className="px-6 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Вернуться к входу
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}