import { useState, useEffect } from 'react';
import './App.css';
import createApiService from './apiService';
import Card from './Card';

function App() {
  const BASE_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api';
  const apiService = createApiService(BASE_URL);
  const [games, setGames] = useState([]);
  const [err, setErr] = useState('');

  // chama a api e trata erros
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.fetchGames('rdsgabriel.dev@gmail.com', 5000);
        setGames(data);
        const genres = getAvailableGenres(data);
        setAvailableGenres(genres);
      } catch (error) {
        if (error.message === 'O servidor demorou para responder, tente mais tarde') {
          setErr('O servidor demorou para responder, tente mais tarde');
        } else if (error.response && error.response.status >= 500 && error.response.status <= 509) {
          setErr('O servidor falhou em responder, tente recarregar a página');
        } else {
          setErr('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
        }
      }
    };

    fetchData();
  }, []);


  // campo de busca
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [availableGenres, setAvailableGenres] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const getAvailableGenres = (games) => {
    const genres = games.map((game) => game.genre);
    return [...new Set(genres)]; // remove os generos duplicados
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) && //case insensitive, requisito
    (selectedGenre === '' || game.genre === selectedGenre)
  );

  // renderização condicional padrao 
  return (
    <div className="App">
    {err ? (
      <p className='error'>{err}</p>
    ) : (
      <>
        {games.length > 0 ? (
          <>
           
            <div className='header'>
            <h1 className='title'>find your game </h1>
            <div className='boxSearch'>
            <div className='selectOut'>
              <select className='select' value={selectedGenre} onChange={handleGenreChange}>
                <option className='option' value="">All</option>
                {availableGenres.map((genre) => (
                  <option className='option' key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div className='searchOut'>
              <input className='search' type="text" placeholder="Search by title" onChange={handleSearch} />
              <button className='go'>
                <div className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
                </div>
              </button>
            </div>
            </div>
           
            
            </div>
            {filteredGames.length > 0 &&
              filteredGames.map((game) => (
                <Card key={game.id} game={game}/>
              )
            )}
          </>
        ) : (
          <p className='loading'>Loading...</p>
        )}
      </>
    )}
  </div>
  

  );
}

export default App;