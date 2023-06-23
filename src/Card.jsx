import './Card.css'

function Card({ game }) {
  return (
    <div className='box' key={game.id}>
      <h2>{game.title}</h2>
      <img className='img' src={game.thumbnail} alt={game.title} />
      <p>{game.short_description}</p>
      <p>Genre: {game.genre}</p>
      <p>Platform: {game.platform}</p>
      <a href={game.game_url}>Play Game</a>
    </div>
  );
}

export default Card;
