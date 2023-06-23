const createApiService = (baseUrl) => {
  const fetchGames = async (email, timeoutDuration) => {
    try {
      //pra resolver o lance de 5 segundos
      const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject( new Error('O servidor demorou para responder, tente mais tarde'));
        }, timeoutDuration); //reject pra lançar um erro
      });

      const responsePromise = fetch(`${baseUrl}/data`, {
        headers: {
          'dev-email-address': email,
        },
      });

      const response = await Promise.race([responsePromise, timeout]); // lance de 5 segundos

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erro de requisição: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao obter os jogos:', error);
      throw error;
    }
  };

  return {
    fetchGames, // factory, torna público aqui
  };
};

export default createApiService;
