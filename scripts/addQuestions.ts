import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Your Firebase config (copy from lib/firebase.ts)
const firebaseConfig = {
  apiKey: "AIzaSyBgnkvRiKFnseHDI2lIQICqnj6x-82dju4",
  authDomain: "turkey-trivia-4e241.firebaseapp.com",
  databaseURL: "https://turkey-trivia-4e241-default-rtdb.firebaseio.com",
  projectId: "turkey-trivia-4e241",
  storageBucket: "turkey-trivia-4e241.firebasestorage.app",
  messagingSenderId: "1087572621696",
  appId: "1:1087572621696:web:01eace943cdd9dc066e965"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const questions = [
  // STEM - 10 questions
  { id: 'q1', category: 'stem', text: 'What gas do plants absorb?', answers: { a: 'CO2', b: 'Oxygen', c: 'Nitrogen', d: 'Hydrogen' }, correct: 'a' },
  { id: 'q2', category: 'stem', text: 'What is the largest planet in our solar system?', answers: { a: 'Earth', b: 'Mars', c: 'Jupiter', d: 'Saturn' }, correct: 'c' },
  { id: 'q3', category: 'stem', text: 'What is the chemical symbol for gold?', answers: { a: 'Go', b: 'Au', c: 'Gd', d: 'Ag' }, correct: 'b' },
  { id: 'q4', category: 'stem', text: 'How many bones are in the human body?', answers: { a: '186', b: '206', c: '226', d: '246' }, correct: 'b' },
  { id: 'q5', category: 'stem', text: 'What is the powerhouse of the cell?', answers: { a: 'Nucleus', b: 'Ribosome', c: 'Mitochondria', d: 'Chloroplast' }, correct: 'c' },
  { id: 'q6', category: 'stem', text: 'What is 15% of 80?', answers: { a: '10', b: '12', c: '15', d: '18' }, correct: 'b' },
  { id: 'q7', category: 'stem', text: 'What is the square root of 144?', answers: { a: '10', b: '11', c: '12', d: '13' }, correct: 'c' },
  { id: 'q8', category: 'stem', text: 'What year was the iPhone first released?', answers: { a: '2005', b: '2007', c: '2009', d: '2010' }, correct: 'b' },
  { id: 'q9', category: 'stem', text: 'What does DNA stand for?', answers: { a: 'Deoxyribonucleic Acid', b: 'Dinitrogen Acid', c: 'Dynamic Neural Array', d: 'Digital Network Access' }, correct: 'a' },
  { id: 'q10', category: 'stem', text: 'How many planets are in our solar system?', answers: { a: '7', b: '8', c: '9', d: '10' }, correct: 'b' },

  // Sports - 10 questions
  { id: 'q11', category: 'sports', text: 'Who has the most NBA championships?', answers: { a: 'Michael Jordan', b: 'LeBron James', c: 'Bill Russell', d: 'Kobe Bryant' }, correct: 'c' },
  { id: 'q12', category: 'sports', text: 'What sport uses a puck?', answers: { a: 'Basketball', b: 'Hockey', c: 'Soccer', d: 'Tennis' }, correct: 'b' },
  { id: 'q13', category: 'sports', text: 'How many players on a soccer team?', answers: { a: '9', b: '10', c: '11', d: '12' }, correct: 'c' },
  { id: 'q14', category: 'sports', text: 'Who won the 2024 Super Bowl?', answers: { a: '49ers', b: 'Chiefs', c: 'Cowboys', d: 'Eagles' }, correct: 'b' },
  { id: 'q15', category: 'sports', text: 'What is the fastest land animal?', answers: { a: 'Lion', b: 'Horse', c: 'Cheetah', d: 'Greyhound' }, correct: 'c' },
  { id: 'q16', category: 'sports', text: 'How many bases in baseball?', answers: { a: '3', b: '4', c: '5', d: '6' }, correct: 'b' },
  { id: 'q17', category: 'sports', text: 'What is a perfect score in bowling?', answers: { a: '200', b: '250', c: '300', d: '350' }, correct: 'c' },
  { id: 'q18', category: 'sports', text: 'How long is an NBA basketball game?', answers: { a: '40 minutes', b: '48 minutes', c: '60 minutes', d: '90 minutes' }, correct: 'b' },
  { id: 'q19', category: 'sports', text: 'What color is the center of an archery target?', answers: { a: 'Red', b: 'Blue', c: 'Yellow', d: 'Green' }, correct: 'c' },
  { id: 'q20', category: 'sports', text: 'How many points is a touchdown in football?', answers: { a: '5', b: '6', c: '7', d: '8' }, correct: 'b' },

  // Movies - 12 questions
  { id: 'q21', category: 'movies', text: 'Who directed Oppenheimer (2023)?', answers: { a: 'Steven Spielberg', b: 'Christopher Nolan', c: 'Denis Villeneuve', d: 'Quentin Tarantino' }, correct: 'b' },
  { id: 'q22', category: 'movies', text: 'What is the highest-grossing film of all time?', answers: { a: 'Avatar', b: 'Avengers: Endgame', c: 'Titanic', d: 'Star Wars' }, correct: 'a' },
  { id: 'q23', category: 'movies', text: 'Who plays Barbie in the 2023 Barbie movie?', answers: { a: 'Emma Stone', b: 'Margot Robbie', c: 'Scarlett Johansson', d: 'Jennifer Lawrence' }, correct: 'b' },
  { id: 'q24', category: 'movies', text: 'Which movie won Best Picture at 2024 Oscars?', answers: { a: 'Oppenheimer', b: 'Barbie', c: 'Poor Things', d: 'Killers of the Flower Moon' }, correct: 'a' },
  { id: 'q25', category: 'movies', text: 'What is the name of the lion in The Lion King?', answers: { a: 'Mufasa', b: 'Simba', c: 'Scar', d: 'Rafiki' }, correct: 'b' },
  { id: 'q26', category: 'movies', text: 'Who voices Elsa in Frozen?', answers: { a: 'Kristen Bell', b: 'Mandy Moore', c: 'Idina Menzel', d: 'Adele Dazeem' }, correct: 'c' },
  { id: 'q27', category: 'movies', text: 'What year was the first Spider-Man movie released?', answers: { a: '2000', b: '2002', c: '2004', d: '2006' }, correct: 'b' },
  { id: 'q28', category: 'movies', text: 'Who played Iron Man in the MCU?', answers: { a: 'Chris Evans', b: 'Chris Hemsworth', c: 'Robert Downey Jr.', d: 'Mark Ruffalo' }, correct: 'c' },
  { id: 'q29', category: 'movies', text: 'What is the name of the school in Harry Potter?', answers: { a: 'Hogwarts', b: 'Beauxbatons', c: 'Durmstrang', d: 'Ilvermorny' }, correct: 'a' },
  { id: 'q30', category: 'movies', text: 'Who directed Avatar (2009)?', answers: { a: 'Peter Jackson', b: 'James Cameron', c: 'George Lucas', d: 'Ridley Scott' }, correct: 'b' },
  { id: 'q31', category: 'movies', text: 'What is the first rule of Fight Club?', answers: { a: 'Always win', b: 'No shirts', c: 'You do not talk about Fight Club', d: 'Respect others' }, correct: 'c' },
  { id: 'q32', category: 'movies', text: 'Which movie features the song "My Heart Will Go On"?', answers: { a: 'The Notebook', b: 'Titanic', c: 'Avatar', d: 'Pearl Harbor' }, correct: 'b' },

  // TV Shows - 12 questions
  { id: 'q33', category: 'tv', text: 'What year did Stranger Things premiere?', answers: { a: '2015', b: '2016', c: '2017', d: '2018' }, correct: 'b' },
  { id: 'q34', category: 'tv', text: 'Who plays Wednesday Addams in Wednesday?', answers: { a: 'Emma Myers', b: 'Jenna Ortega', c: 'Millie Bobby Brown', d: 'Sadie Sink' }, correct: 'b' },
  { id: 'q35', category: 'tv', text: 'What is the longest-running animated show?', answers: { a: 'South Park', b: 'Family Guy', c: 'The Simpsons', d: 'SpongeBob' }, correct: 'c' },
  { id: 'q36', category: 'tv', text: 'What show has "Winter is Coming"?', answers: { a: 'Vikings', b: 'The Witcher', c: 'Game of Thrones', d: 'House of the Dragon' }, correct: 'c' },
  { id: 'q37', category: 'tv', text: 'Most-watched Netflix series ever?', answers: { a: 'Stranger Things', b: 'Wednesday', c: 'Squid Game', d: 'Bridgerton' }, correct: 'c' },
  { id: 'q38', category: 'tv', text: 'What streaming service has The Mandalorian?', answers: { a: 'Netflix', b: 'Disney+', c: 'Hulu', d: 'HBO Max' }, correct: 'b' },
  { id: 'q39', category: 'tv', text: 'Who is the main character in Breaking Bad?', answers: { a: 'Jesse Pinkman', b: 'Saul Goodman', c: 'Walter White', d: 'Hank Schrader' }, correct: 'c' },
  { id: 'q40', category: 'tv', text: 'What year did The Office (US) premiere?', answers: { a: '2003', b: '2005', c: '2007', d: '2009' }, correct: 'b' },
  { id: 'q41', category: 'tv', text: 'What is the coffee shop called in Friends?', answers: { a: 'Starbucks', b: 'Central Perk', c: 'The Bean', d: 'Java Joe' }, correct: 'b' },
  { id: 'q42', category: 'tv', text: 'Who created The Last of Us TV series?', answers: { a: 'Netflix', b: 'Amazon', c: 'HBO', d: 'Apple TV+' }, correct: 'c' },
  { id: 'q43', category: 'tv', text: 'What is the Upside Down from?', answers: { a: 'Dark', b: 'Stranger Things', c: 'Lost', d: 'The OA' }, correct: 'b' },
  { id: 'q44', category: 'tv', text: 'How many seasons of Game of Thrones are there?', answers: { a: '6', b: '7', c: '8', d: '9' }, correct: 'c' },

  // Music - 10 questions
  { id: 'q45', category: 'music', text: 'Who headlined the 2024 Super Bowl halftime show?', answers: { a: 'Rihanna', b: 'Usher', c: 'Taylor Swift', d: 'Beyoncé' }, correct: 'b' },
  { id: 'q46', category: 'music', text: 'What is Taylor Swift\'s fanbase called?', answers: { a: 'Swifties', b: 'Taylors', c: 'Shakers', d: 'Believers' }, correct: 'a' },
  { id: 'q47', category: 'music', text: 'Who sang "Blinding Lights"?', answers: { a: 'Drake', b: 'The Weeknd', c: 'Post Malone', d: 'Travis Scott' }, correct: 'b' },
  { id: 'q48', category: 'music', text: 'What instrument does Lizzo play?', answers: { a: 'Piano', b: 'Guitar', c: 'Flute', d: 'Drums' }, correct: 'c' },
  { id: 'q49', category: 'music', text: 'Who is known as the "King of Pop"?', answers: { a: 'Elvis Presley', b: 'Michael Jackson', c: 'Prince', d: 'Justin Timberlake' }, correct: 'b' },
  { id: 'q50', category: 'music', text: 'What year did Spotify launch?', answers: { a: '2006', b: '2008', c: '2010', d: '2012' }, correct: 'b' },
  { id: 'q51', category: 'music', text: 'Who sang "drivers license"?', answers: { a: 'Billie Eilish', b: 'Olivia Rodrigo', c: 'Ariana Grande', d: 'Sabrina Carpenter' }, correct: 'b' },
  { id: 'q52', category: 'music', text: 'What genre is Kendrick Lamar known for?', answers: { a: 'Pop', b: 'Rock', c: 'Hip-Hop', d: 'Country' }, correct: 'c' },
  { id: 'q53', category: 'music', text: 'Who won Album of the Year at 2024 Grammys?', answers: { a: 'Taylor Swift', b: 'SZA', c: 'Billie Eilish', d: 'Olivia Rodrigo' }, correct: 'a' },
  { id: 'q54', category: 'music', text: 'What is Bad Bunny\'s music genre?', answers: { a: 'Pop', b: 'Reggaeton', c: 'Rock', d: 'Country' }, correct: 'b' },

  // Pop Culture - 10 questions
  { id: 'q55', category: 'culture', text: 'Who is the most followed person on Instagram?', answers: { a: 'Kylie Jenner', b: 'Cristiano Ronaldo', c: 'Selena Gomez', d: 'Lionel Messi' }, correct: 'b' },
  { id: 'q56', category: 'culture', text: 'What app has a ghost logo?', answers: { a: 'Instagram', b: 'Snapchat', c: 'TikTok', d: 'Discord' }, correct: 'b' },
  { id: 'q57', category: 'culture', text: 'What is the most-viewed YouTube video ever?', answers: { a: 'Despacito', b: 'Gangnam Style', c: 'Baby Shark', d: 'See You Again' }, correct: 'c' },
  { id: 'q58', category: 'culture', text: 'When was TikTok launched globally?', answers: { a: '2016', b: '2017', c: '2018', d: '2019' }, correct: 'c' },
  { id: 'q59', category: 'culture', text: 'What does "rizz" mean?', answers: { a: 'Cool outfit', b: 'Charisma', c: 'Fast car', d: 'Good food' }, correct: 'b' },
  { id: 'q60', category: 'culture', text: 'Who bought Twitter and renamed it X?', answers: { a: 'Jeff Bezos', b: 'Mark Zuckerberg', c: 'Elon Musk', d: 'Bill Gates' }, correct: 'c' },
  { id: 'q61', category: 'culture', text: 'What color dress broke the internet in 2015?', answers: { a: 'White and Gold', b: 'Blue and Black', c: 'Both', d: 'Neither' }, correct: 'c' },
  { id: 'q62', category: 'culture', text: 'What is the Met Gala?', answers: { a: 'Music awards', b: 'Fashion fundraiser', c: 'Film festival', d: 'Sports event' }, correct: 'b' },
  { id: 'q63', category: 'culture', text: 'Who started the Ice Bucket Challenge?', answers: { a: 'ALS Association', b: 'Red Cross', c: 'WHO', d: 'UNICEF' }, correct: 'a' },
  { id: 'q64', category: 'culture', text: 'What year did the first iPhone come out?', answers: { a: '2005', b: '2007', c: '2009', d: '2010' }, correct: 'b' },

  // Food - 8 questions
  { id: 'q65', category: 'food', text: 'What is the main ingredient in guacamole?', answers: { a: 'Tomato', b: 'Avocado', c: 'Pepper', d: 'Onion' }, correct: 'b' },
  { id: 'q66', category: 'food', text: 'What country is sushi from?', answers: { a: 'China', b: 'Korea', c: 'Japan', d: 'Thailand' }, correct: 'c' },
  { id: 'q67', category: 'food', text: 'What is the most popular pizza topping in America?', answers: { a: 'Mushrooms', b: 'Pepperoni', c: 'Sausage', d: 'Vegetables' }, correct: 'b' },
  { id: 'q68', category: 'food', text: 'What does "al dente" mean for pasta?', answers: { a: 'Very soft', b: 'Firm to bite', c: 'Overcooked', d: 'With sauce' }, correct: 'b' },
  { id: 'q69', category: 'food', text: 'Which fast food chain has the most locations worldwide?', answers: { a: 'McDonald\'s', b: 'Subway', c: 'Starbucks', d: 'KFC' }, correct: 'b' },
  { id: 'q70', category: 'food', text: 'What fruit is known as "the king of fruits"?', answers: { a: 'Mango', b: 'Durian', c: 'Pineapple', d: 'Watermelon' }, correct: 'b' },
  { id: 'q71', category: 'food', text: 'What is the main ingredient in hummus?', answers: { a: 'Lentils', b: 'Chickpeas', c: 'Black beans', d: 'Peas' }, correct: 'b' },
  { id: 'q72', category: 'food', text: 'What is the hottest pepper in the world?', answers: { a: 'Ghost Pepper', b: 'Habanero', c: 'Carolina Reaper', d: 'Jalapeño' }, correct: 'c' },

  // History - 8 questions
  { id: 'q73', category: 'history', text: 'What year did World War II end?', answers: { a: '1943', b: '1944', c: '1945', d: '1946' }, correct: 'c' },
  { id: 'q74', category: 'history', text: 'Who was the first president of the United States?', answers: { a: 'Thomas Jefferson', b: 'George Washington', c: 'John Adams', d: 'Benjamin Franklin' }, correct: 'b' },
  { id: 'q75', category: 'history', text: 'What year did humans first land on the moon?', answers: { a: '1965', b: '1967', c: '1969', d: '1971' }, correct: 'c' },
  { id: 'q76', category: 'history', text: 'Who painted the Mona Lisa?', answers: { a: 'Michelangelo', b: 'Leonardo da Vinci', c: 'Raphael', d: 'Donatello' }, correct: 'b' },
  { id: 'q77', category: 'history', text: 'What year did the Berlin Wall fall?', answers: { a: '1987', b: '1988', c: '1989', d: '1990' }, correct: 'c' },
  { id: 'q78', category: 'history', text: 'Who wrote the Declaration of Independence?', answers: { a: 'George Washington', b: 'Benjamin Franklin', c: 'Thomas Jefferson', d: 'John Adams' }, correct: 'c' },
  { id: 'q79', category: 'history', text: 'What ancient wonder still stands today?', answers: { a: 'Colossus of Rhodes', b: 'Hanging Gardens', c: 'Great Pyramid of Giza', d: 'Lighthouse of Alexandria' }, correct: 'c' },
  { id: 'q80', category: 'history', text: 'What year did the Titanic sink?', answers: { a: '1910', b: '1911', c: '1912', d: '1913' }, correct: 'c' },

  // Thanksgiving - 5 questions (keeping original)
  { id: 'q81', category: 'thanksgiving', text: 'How fast can wild turkeys fly?', answers: { a: '35 mph', b: '45 mph', c: '55 mph', d: '65 mph' }, correct: 'c' },
  { id: 'q82', category: 'thanksgiving', text: 'What year was the first Thanksgiving?', answers: { a: '1591', b: '1611', c: '1621', d: '1641' }, correct: 'c' },
  { id: 'q83', category: 'thanksgiving', text: 'Most popular Thanksgiving pie?', answers: { a: 'Apple', b: 'Pecan', c: 'Pumpkin', d: 'Cherry' }, correct: 'c' },
  { id: 'q84', category: 'thanksgiving', text: 'How many turkeys eaten on US Thanksgiving?', answers: { a: '26 million', b: '36 million', c: '46 million', d: '56 million' }, correct: 'c' },
  { id: 'q85', category: 'thanksgiving', text: 'What state produces the most turkeys?', answers: { a: 'Texas', b: 'California', c: 'Minnesota', d: 'North Carolina' }, correct: 'c' },

  // Gaming/Tech - 5 questions
  { id: 'q86', category: 'gaming', text: 'What is the best-selling video game of all time?', answers: { a: 'GTA V', b: 'Minecraft', c: 'Tetris', d: 'Fortnite' }, correct: 'b' },
  { id: 'q87', category: 'gaming', text: 'What company makes the PlayStation?', answers: { a: 'Microsoft', b: 'Nintendo', c: 'Sony', d: 'Sega' }, correct: 'c' },
  { id: 'q88', category: 'gaming', text: 'What does "NPC" stand for in gaming?', answers: { a: 'New Player Character', b: 'Non-Playable Character', c: 'Next Player Coming', d: 'Network Player Code' }, correct: 'b' },
  { id: 'q89', category: 'gaming', text: 'What year was Fortnite released?', answers: { a: '2015', b: '2016', c: '2017', d: '2018' }, correct: 'c' },
  { id: 'q90', category: 'gaming', text: 'Who is the main character in The Legend of Zelda?', answers: { a: 'Zelda', b: 'Link', c: 'Ganon', d: 'Mario' }, correct: 'b' },
];

async function addQuestions() {
  console.log('Adding 80 questions to Firebase...');
  
  for (const question of questions) {
    await set(ref(database, `questions/${question.id}`), question);
    console.log(`Added: ${question.text}`);
  }
  
  console.log('✅ All 80 questions added successfully!');
  process.exit(0);
}

addQuestions();