const startGame = async () => {
    if (!questions.length) return;

    // Better randomization using Fisher-Yates shuffle
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedQuestions = shuffled.slice(0, 20).map(q => q.id);

    await update(ref(database, `rooms/${roomCode}`), {
      status: 'active',
      currentQuestion: 0,
      selectedQuestions,
      questionStartTime: Date.now()
    });
  };