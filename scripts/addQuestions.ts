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
  // ORIGINAL 90 QUESTIONS (q1-q90)
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

  // Thanksgiving - 5 questions
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

  // NEW 70 QUESTIONS (q91-q160)
  
  // Geography - 10 questions
  { id: 'q91', category: 'geography', text: 'What is the capital of France?', answers: { a: 'London', b: 'Berlin', c: 'Paris', d: 'Rome' }, correct: 'c' },
  { id: 'q92', category: 'geography', text: 'Which country has the most population?', answers: { a: 'United States', b: 'China', c: 'India', d: 'Russia' }, correct: 'c' },
  { id: 'q93', category: 'geography', text: 'What is the largest ocean on Earth?', answers: { a: 'Atlantic', b: 'Indian', c: 'Arctic', d: 'Pacific' }, correct: 'd' },
  { id: 'q94', category: 'geography', text: 'What country is known as the "Land of the Rising Sun"?', answers: { a: 'China', b: 'Japan', c: 'Thailand', d: 'Vietnam' }, correct: 'b' },
  { id: 'q95', category: 'geography', text: 'What is the longest river in the world?', answers: { a: 'Amazon', b: 'Nile', c: 'Mississippi', d: 'Yangtze' }, correct: 'b' },
  { id: 'q96', category: 'geography', text: 'Which continent is the Sahara Desert on?', answers: { a: 'Asia', b: 'Australia', c: 'Africa', d: 'South America' }, correct: 'c' },
  { id: 'q97', category: 'geography', text: 'What is the smallest country in the world?', answers: { a: 'Monaco', b: 'Vatican City', c: 'Liechtenstein', d: 'San Marino' }, correct: 'b' },
  { id: 'q98', category: 'geography', text: 'How many states are in the United States?', answers: { a: '48', b: '50', c: '52', d: '51' }, correct: 'b' },
  { id: 'q99', category: 'geography', text: 'What is the tallest mountain in the world?', answers: { a: 'K2', b: 'Kilimanjaro', c: 'Mount Everest', d: 'Denali' }, correct: 'c' },
  { id: 'q100', category: 'geography', text: 'What country is the Great Wall located in?', answers: { a: 'India', b: 'China', c: 'Japan', d: 'Mongolia' }, correct: 'b' },

  // Animals & Nature - 10 questions
  { id: 'q101', category: 'animals', text: 'What is the largest mammal on Earth?', answers: { a: 'Elephant', b: 'Blue Whale', c: 'Giraffe', d: 'Polar Bear' }, correct: 'b' },
  { id: 'q102', category: 'animals', text: 'How many legs does a spider have?', answers: { a: '6', b: '8', c: '10', d: '12' }, correct: 'b' },
  { id: 'q103', category: 'animals', text: 'What is the only mammal that can fly?', answers: { a: 'Flying squirrel', b: 'Bat', c: 'Sugar glider', d: 'Lemur' }, correct: 'b' },
  { id: 'q104', category: 'animals', text: 'What do pandas mainly eat?', answers: { a: 'Fish', b: 'Meat', c: 'Bamboo', d: 'Berries' }, correct: 'c' },
  { id: 'q105', category: 'animals', text: 'What is a baby kangaroo called?', answers: { a: 'Cub', b: 'Joey', c: 'Pup', d: 'Kit' }, correct: 'b' },
  { id: 'q106', category: 'animals', text: 'How many hearts does an octopus have?', answers: { a: '1', b: '2', c: '3', d: '4' }, correct: 'c' },
  { id: 'q107', category: 'animals', text: 'What bird is known for being unable to fly?', answers: { a: 'Penguin', b: 'Eagle', c: 'Parrot', d: 'Falcon' }, correct: 'a' },
  { id: 'q108', category: 'animals', text: 'What animal is known for changing colors?', answers: { a: 'Frog', b: 'Snake', c: 'Chameleon', d: 'Lizard' }, correct: 'c' },
  { id: 'q109', category: 'animals', text: 'What is the fastest bird in the world?', answers: { a: 'Eagle', b: 'Hawk', c: 'Peregrine Falcon', d: 'Hummingbird' }, correct: 'c' },
  { id: 'q110', category: 'animals', text: 'What animal never sleeps?', answers: { a: 'Shark', b: 'Dolphin', c: 'Whale', d: 'Bullfrog' }, correct: 'd' },

  // Brands & Logos - 8 questions
  { id: 'q111', category: 'brands', text: 'What company has a swoosh logo?', answers: { a: 'Adidas', b: 'Nike', c: 'Puma', d: 'Reebok' }, correct: 'b' },
  { id: 'q112', category: 'brands', text: 'What is the most valuable company in the world (2024)?', answers: { a: 'Microsoft', b: 'Apple', c: 'Amazon', d: 'Google' }, correct: 'b' },
  { id: 'q113', category: 'brands', text: 'What fast food chain has golden arches?', answers: { a: 'Burger King', b: 'Wendy\'s', c: 'McDonald\'s', d: 'KFC' }, correct: 'c' },
  { id: 'q114', category: 'brands', text: 'What brand makes the iPhone?', answers: { a: 'Samsung', b: 'Google', c: 'Apple', d: 'Microsoft' }, correct: 'c' },
  { id: 'q115', category: 'brands', text: 'What company owns Instagram?', answers: { a: 'Twitter', b: 'Google', c: 'Meta (Facebook)', d: 'Snapchat' }, correct: 'c' },
  { id: 'q116', category: 'brands', text: 'What logo has a mermaid?', answers: { a: 'Dunkin', b: 'Starbucks', c: 'Costa', d: 'Tim Hortons' }, correct: 'b' },
  { id: 'q117', category: 'brands', text: 'What car brand has four rings?', answers: { a: 'BMW', b: 'Mercedes', c: 'Audi', d: 'Volkswagen' }, correct: 'c' },
  { id: 'q118', category: 'brands', text: 'What soda is red and white?', answers: { a: 'Pepsi', b: 'Sprite', c: 'Coca-Cola', d: 'Dr Pepper' }, correct: 'c' },

  // Slang & Internet Culture - 8 questions
  { id: 'q119', category: 'slang', text: 'What does "slay" mean?', answers: { a: 'To sleep', b: 'To do something amazing', c: 'To fail', d: 'To eat' }, correct: 'b' },
  { id: 'q120', category: 'slang', text: 'What does "FR" stand for?', answers: { a: 'French', b: 'Friday', c: 'For Real', d: 'From' }, correct: 'c' },
  { id: 'q121', category: 'slang', text: 'What does "NPC" mean in slang?', answers: { a: 'Nice Person Club', b: 'Someone with no personality', c: 'New Phone Call', d: 'Not Perfect Character' }, correct: 'b' },
  { id: 'q122', category: 'slang', text: 'What does "mid" mean?', answers: { a: 'Amazing', b: 'Middle/Average', c: 'Terrible', d: 'Expensive' }, correct: 'b' },
  { id: 'q123', category: 'slang', text: 'What does "bussin" mean?', answers: { a: 'Broken', b: 'Really good', c: 'Tired', d: 'Loud' }, correct: 'b' },
  { id: 'q124', category: 'slang', text: 'What does "cap" mean?', answers: { a: 'Hat', b: 'Truth', c: 'Lie', d: 'Money' }, correct: 'c' },
  { id: 'q125', category: 'slang', text: 'What does "simp" mean?', answers: { a: 'Simple', b: 'Someone who tries too hard to impress', c: 'Simulation', d: 'Sympathy' }, correct: 'b' },
  { id: 'q126', category: 'slang', text: 'What is a "sigma"?', answers: { a: 'A math symbol', b: 'A lone wolf personality type', c: 'A dance move', d: 'A type of food' }, correct: 'b' },

  // More Movies - 8 questions
  { id: 'q127', category: 'movies', text: 'What movie features "I\'ll be back"?', answers: { a: 'Terminator', b: 'Die Hard', c: 'Predator', d: 'Rocky' }, correct: 'a' },
  { id: 'q128', category: 'movies', text: 'Who plays Katniss in The Hunger Games?', answers: { a: 'Emma Stone', b: 'Jennifer Lawrence', c: 'Emma Watson', d: 'Kristen Stewart' }, correct: 'b' },
  { id: 'q129', category: 'movies', text: 'What year was Toy Story released?', answers: { a: '1993', b: '1995', c: '1997', d: '1999' }, correct: 'b' },
  { id: 'q130', category: 'movies', text: 'Who directed Jurassic Park?', answers: { a: 'George Lucas', b: 'James Cameron', c: 'Steven Spielberg', d: 'Peter Jackson' }, correct: 'c' },
  { id: 'q131', category: 'movies', text: 'What is the name of Thor\'s hammer?', answers: { a: 'Stormbreaker', b: 'Mjolnir', c: 'Excalibur', d: 'Gungnir' }, correct: 'b' },
  { id: 'q132', category: 'movies', text: 'What movie has "May the Force be with you"?', answers: { a: 'Star Trek', b: 'Star Wars', c: 'Guardians of the Galaxy', d: 'Avatar' }, correct: 'b' },
  { id: 'q133', category: 'movies', text: 'Who plays Jack in Titanic?', answers: { a: 'Brad Pitt', b: 'Tom Cruise', c: 'Leonardo DiCaprio', d: 'Matt Damon' }, correct: 'c' },
  { id: 'q134', category: 'movies', text: 'What animated movie features Elsa and Anna?', answers: { a: 'Tangled', b: 'Moana', c: 'Frozen', d: 'Brave' }, correct: 'c' },

  // More TV Shows - 6 questions
  { id: 'q135', category: 'tv', text: 'What show has "That\'s what she said"?', answers: { a: 'Parks and Rec', b: 'The Office', c: 'Brooklyn Nine-Nine', d: '30 Rock' }, correct: 'b' },
  { id: 'q136', category: 'tv', text: 'What show features the character Walter White?', answers: { a: 'The Sopranos', b: 'Breaking Bad', c: 'Better Call Saul', d: 'Ozark' }, correct: 'b' },
  { id: 'q137', category: 'tv', text: 'What reality show features "the tribe has spoken"?', answers: { a: 'The Bachelor', b: 'Big Brother', c: 'Survivor', d: 'The Amazing Race' }, correct: 'c' },
  { id: 'q138', category: 'tv', text: 'What anime is about ninjas in Hidden Leaf Village?', answers: { a: 'One Piece', b: 'Naruto', c: 'Dragon Ball Z', d: 'Bleach' }, correct: 'b' },
  { id: 'q139', category: 'tv', text: 'What show has "Winter is coming"?', answers: { a: 'Vikings', b: 'The Witcher', c: 'Game of Thrones', d: 'The Last Kingdom' }, correct: 'c' },
  { id: 'q140', category: 'tv', text: 'What show features the character Eleven?', answers: { a: 'The Umbrella Academy', b: 'Stranger Things', c: 'Wednesday', d: 'Riverdale' }, correct: 'b' },

  // More Music - 6 questions
  { id: 'q141', category: 'music', text: 'Who sang "Shape of You"?', answers: { a: 'Justin Bieber', b: 'Ed Sheeran', c: 'Shawn Mendes', d: 'Charlie Puth' }, correct: 'b' },
  { id: 'q142', category: 'music', text: 'What band sang "Bohemian Rhapsody"?', answers: { a: 'The Beatles', b: 'Led Zeppelin', c: 'Queen', d: 'The Rolling Stones' }, correct: 'c' },
  { id: 'q143', category: 'music', text: 'Who is known as "Queen Bey"?', answers: { a: 'Rihanna', b: 'Beyoncé', c: 'Ariana Grande', d: 'Lady Gaga' }, correct: 'b' },
  { id: 'q144', category: 'music', text: 'What rapper\'s real name is Marshall Mathers?', answers: { a: 'Drake', b: '50 Cent', c: 'Eminem', d: 'Snoop Dogg' }, correct: 'c' },
  { id: 'q145', category: 'music', text: 'Who sang "Rolling in the Deep"?', answers: { a: 'Adele', b: 'Amy Winehouse', c: 'Alicia Keys', d: 'Kelly Clarkson' }, correct: 'a' },
  { id: 'q146', category: 'music', text: 'What K-pop group has "Dynamite"?', answers: { a: 'Blackpink', b: 'BTS', c: 'EXO', d: 'Twice' }, correct: 'b' },

  // More Pop Culture - 6 questions
  { id: 'q147', category: 'culture', text: 'What app features a white bird logo?', answers: { a: 'Facebook', b: 'X (Twitter)', c: 'Instagram', d: 'TikTok' }, correct: 'b' },
  { id: 'q148', category: 'culture', text: 'What is Mr. Beast known for?', answers: { a: 'Gaming', b: 'Music', c: 'Expensive challenges/giveaways', d: 'Cooking' }, correct: 'c' },
  { id: 'q149', category: 'culture', text: 'What show made "The Renegade" dance famous?', answers: { a: 'YouTube', b: 'TikTok', c: 'Instagram', d: 'Snapchat' }, correct: 'b' },
  { id: 'q150', category: 'culture', text: 'Who said "I\'m gonna make him an offer he can\'t refuse"?', answers: { a: 'Scarface', b: 'The Godfather', c: 'Goodfellas', d: 'Casino' }, correct: 'b' },
  { id: 'q151', category: 'culture', text: 'What platform is known for short videos under 1 minute?', answers: { a: 'YouTube', b: 'Vine (RIP)', c: 'TikTok', d: 'Both B and C' }, correct: 'd' },
  { id: 'q152', category: 'culture', text: 'Who hosted the Oscars in 2022?', answers: { a: 'Kevin Hart', b: 'Chris Rock', c: 'No host', d: 'Amy Schumer, Wanda Sykes, Regina Hall' }, correct: 'd' },

  // More Sports - 4 questions
  { id: 'q153', category: 'sports', text: 'What sport is Lionel Messi famous for?', answers: { a: 'Basketball', b: 'Soccer', c: 'Tennis', d: 'Golf' }, correct: 'b' },
  { id: 'q154', category: 'sports', text: 'How many rings are on the Olympic flag?', answers: { a: '3', b: '4', c: '5', d: '6' }, correct: 'c' },
  { id: 'q155', category: 'sports', text: 'What country hosted the 2024 Summer Olympics?', answers: { a: 'Japan', b: 'France', c: 'USA', d: 'Brazil' }, correct: 'b' },
  { id: 'q156', category: 'sports', text: 'What is the maximum score in a single frame of bowling?', answers: { a: '10', b: '20', c: '30', d: '50' }, correct: 'c' },

  // More STEM - 4 questions
  { id: 'q157', category: 'stem', text: 'What does Wi-Fi stand for?', answers: { a: 'Wireless Fidelity', b: 'Wide Fiber', c: 'Wired Frequency', d: 'It doesn\'t stand for anything' }, correct: 'd' },
  { id: 'q158', category: 'stem', text: 'How many sides does a hexagon have?', answers: { a: '5', b: '6', c: '7', d: '8' }, correct: 'b' },
  { id: 'q159', category: 'stem', text: 'What is the boiling point of water in Celsius?', answers: { a: '50°C', b: '75°C', c: '100°C', d: '212°C' }, correct: 'c' },
  { id: 'q160', category: 'stem', text: 'What planet is known as the Red Planet?', answers: { a: 'Venus', b: 'Mars', c: 'Jupiter', d: 'Saturn' }, correct: 'b' },
];

async function addQuestions() {
  console.log('Adding 150 questions to Firebase...');
  
  for (const question of questions) {
    await set(ref(database, `questions/${question.id}`), question);
    console.log(`Added: ${question.text}`);
  }
  
  console.log('✅ All 150 questions added successfully!');
  process.exit(0);
}

addQuestions();