const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

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

const newQuestions = [
  {
    id: "q151",
    category: "stem",
    text: "What is the smallest unit of life?",
    answers: { a: "Atom", b: "Cell", c: "Molecule", d: "Organ" },
    correct: "b"
  },
  {
    id: "q152",
    category: "stem",
    text: "What programming language is known for web development?",
    answers: { a: "Python", b: "JavaScript", c: "C++", d: "Ruby" },
    correct: "b"
  },
  {
    id: "q153",
    category: "stem",
    text: "How many planets are in our solar system?",
    answers: { a: "7", b: "8", c: "9", d: "10" },
    correct: "b"
  },
  {
    id: "q154",
    category: "stem",
    text: "What does DNA stand for?",
    answers: { a: "Deoxyribonucleic Acid", b: "Dynamic Nuclear Acid", c: "Dual Nitrogen Atom", d: "Dextrose Nucleic Acid" },
    correct: "a"
  },
  {
    id: "q155",
    category: "stem",
    text: "What force keeps us on the ground?",
    answers: { a: "Magnetism", b: "Friction", c: "Gravity", d: "Inertia" },
    correct: "c"
  },
  {
    id: "q156",
    category: "stem",
    text: "What is 25% of 200?",
    answers: { a: "25", b: "50", c: "75", d: "100" },
    correct: "b"
  },
  {
    id: "q157",
    category: "stem",
    text: "What is the freezing point of water in Celsius?",
    answers: { a: "0°C", b: "32°C", c: "100°C", d: "-32°C" },
    correct: "a"
  },
  {
    id: "q158",
    category: "stem",
    text: "Who developed the theory of relativity?",
    answers: { a: "Isaac Newton", b: "Nikola Tesla", c: "Albert Einstein", d: "Stephen Hawking" },
    correct: "c"
  },
  {
    id: "q159",
    category: "stem",
    text: "What is 9 × 9?",
    answers: { a: "72", b: "81", c: "90", d: "99" },
    correct: "b"
  },
  {
    id: "q160",
    category: "stem",
    text: "What is the Pythagorean theorem formula?",
    answers: { a: "a + b = c", b: "a² + b² = c²", c: "a × b = c", d: "a² - b² = c²" },
    correct: "b"
  },
  {
    id: "q161",
    category: "sports",
    text: "What sport is played at Wimbledon?",
    answers: { a: "Soccer", b: "Cricket", c: "Tennis", d: "Golf" },
    correct: "c"
  },
  {
    id: "q162",
    category: "sports",
    text: "How many points is a touchdown in American football?",
    answers: { a: "3", b: "6", c: "7", d: "8" },
    correct: "b"
  },
  {
    id: "q163",
    category: "sports",
    text: "What sport does LeBron James play?",
    answers: { a: "Baseball", b: "Football", c: "Basketball", d: "Soccer" },
    correct: "c"
  },
  {
    id: "q164",
    category: "sports",
    text: "How many holes are on a standard golf course?",
    answers: { a: "9", b: "12", c: "18", d: "21" },
    correct: "c"
  },
  {
    id: "q165",
    category: "sports",
    text: "What color flag signals the end of a NASCAR race?",
    answers: { a: "Black", b: "Checkered", c: "White", d: "Green" },
    correct: "b"
  },
  {
    id: "q166",
    category: "sports",
    text: "What year did the first modern Olympics take place?",
    answers: { a: "1886", b: "1896", c: "1906", d: "1916" },
    correct: "b"
  },
  {
    id: "q167",
    category: "sports",
    text: "What is the maximum score in a single frame of bowling?",
    answers: { a: "10", b: "20", c: "30", d: "50" },
    correct: "c"
  },
  {
    id: "q168",
    category: "sports",
    text: "What sport is known as 'America's pastime'?",
    answers: { a: "Football", b: "Basketball", c: "Baseball", d: "Hockey" },
    correct: "c"
  },
  {
    id: "q169",
    category: "sports",
    text: "Who holds the record for most Olympic gold medals?",
    answers: { a: "Usain Bolt", b: "Michael Phelps", c: "Simone Biles", d: "Carl Lewis" },
    correct: "b"
  },
  {
    id: "q170",
    category: "sports",
    text: "What country won the 2018 FIFA World Cup?",
    answers: { a: "Brazil", b: "Germany", c: "France", d: "Argentina" },
    correct: "c"
  },
  {
    id: "q171",
    category: "music",
    text: "Which company manages NewJeans?",
    answers: { a: "HYBE", b: "SM Entertainment", c: "YG Entertainment", d: "ADOR" },
    correct: "d"
  },
  {
    id: "q172",
    category: "music",
    text: "What year did BLACKPINK debut?",
    answers: { a: "2014", b: "2015", c: "2016", d: "2017" },
    correct: "c"
  },
  {
    id: "q173",
    category: "music",
    text: "How many members are in SEVENTEEN?",
    answers: { a: "13", b: "15", c: "17", d: "19" },
    correct: "a"
  },
  {
    id: "q174",
    category: "music",
    text: "Who is the leader of BTS?",
    answers: { a: "Jungkook", b: "V", c: "RM", d: "Suga" },
    correct: "c"
  },
  {
    id: "q175",
    category: "music",
    text: "Which K-pop group has the song 'Gangnam Style'?",
    answers: { a: "BTS", b: "PSY", c: "Big Bang", d: "Super Junior" },
    correct: "b"
  },
  {
    id: "q176",
    category: "music",
    text: "What does 'IVE' stand for?",
    answers: { a: "I've Evolved", b: "I have", c: "Idols Victorious Entertainment", d: "It doesn't stand for anything" },
    correct: "d"
  },
  {
    id: "q177",
    category: "music",
    text: "Which K-pop idol is known as the 'Nation's Little Sister'?",
    answers: { a: "IU", b: "Suzy", c: "Yoona", d: "Jennie" },
    correct: "a"
  },
  {
    id: "q178",
    category: "music",
    text: "What entertainment company did BTS originally debut under?",
    answers: { a: "SM Entertainment", b: "YG Entertainment", c: "Big Hit Entertainment", d: "JYP Entertainment" },
    correct: "c"
  },
  {
    id: "q179",
    category: "music",
    text: "Who is the main dancer of TWICE?",
    answers: { a: "Nayeon", b: "Momo", c: "Jihyo", d: "Sana" },
    correct: "b"
  },
  {
    id: "q180",
    category: "music",
    text: "Which girl group sang 'How You Like That'?",
    answers: { a: "TWICE", b: "Red Velvet", c: "BLACKPINK", d: "aespa" },
    correct: "c"
  },
  {
    id: "q181",
    category: "tv",
    text: "What streaming service has 'The Crown'?",
    answers: { a: "Hulu", b: "Netflix", c: "Disney+", d: "HBO Max" },
    correct: "b"
  },
  {
    id: "q182",
    category: "tv",
    text: "What is the name of the coffee shop in 'Friends'?",
    answers: { a: "Central Perk", b: "Java Joe's", c: "Brew Crew", d: "Coffee Corner" },
    correct: "a"
  },
  {
    id: "q183",
    category: "tv",
    text: "What city is 'The Office' (US) set in?",
    answers: { a: "New York", b: "Chicago", c: "Scranton", d: "Philadelphia" },
    correct: "c"
  },
  {
    id: "q184",
    category: "tv",
    text: "What year did 'Breaking Bad' first premiere?",
    answers: { a: "2006", b: "2007", c: "2008", d: "2009" },
    correct: "c"
  },
  {
    id: "q185",
    category: "tv",
    text: "Who plays Eleven in 'Stranger Things'?",
    answers: { a: "Sadie Sink", b: "Millie Bobby Brown", c: "Natalia Dyer", d: "Maya Hawke" },
    correct: "b"
  },
  {
    id: "q186",
    category: "tv",
    text: "What show features dragons and the Iron Throne?",
    answers: { a: "The Witcher", b: "Vikings", c: "Game of Thrones", d: "Lord of the Rings" },
    correct: "c"
  },
  {
    id: "q187",
    category: "tv",
    text: "What is Walter White's alias in 'Breaking Bad'?",
    answers: { a: "The Cook", b: "Heisenberg", c: "Blue Sky", d: "Mr. White" },
    correct: "b"
  },
  {
    id: "q188",
    category: "tv",
    text: "What color is the Power Rangers' Green Ranger?",
    answers: { a: "Blue", b: "Red", c: "Green", d: "Yellow" },
    correct: "c"
  },
  {
    id: "q189",
    category: "tv",
    text: "What year did 'The Sopranos' end?",
    answers: { a: "2005", b: "2006", c: "2007", d: "2008" },
    correct: "c"
  },
  {
    id: "q190",
    category: "tv",
    text: "What is the name of the school in 'Euphoria'?",
    answers: { a: "West Highland High", b: "East Highland High", c: "Riverdale High", d: "Central High" },
    correct: "b"
  },
  {
    id: "q191",
    category: "culture",
    text: "What app has a blue bird logo?",
    answers: { a: "Facebook", b: "Instagram", c: "Twitter/X", d: "TikTok" },
    correct: "c"
  },
  {
    id: "q192",
    category: "culture",
    text: "Who painted the Mona Lisa?",
    answers: { a: "Michelangelo", b: "Leonardo da Vinci", c: "Raphael", d: "Donatello" },
    correct: "b"
  },
  {
    id: "q193",
    category: "culture",
    text: "What color is a giraffe's tongue?",
    answers: { a: "Pink", b: "Red", c: "Blue/Purple", d: "Orange" },
    correct: "c"
  },
  {
    id: "q194",
    category: "culture",
    text: "What is the most spoken language in the world?",
    answers: { a: "Spanish", b: "English", c: "Mandarin Chinese", d: "Hindi" },
    correct: "c"
  },
  {
    id: "q195",
    category: "culture",
    text: "What fast food chain has golden arches?",
    answers: { a: "Burger King", b: "McDonald's", c: "Wendy's", d: "KFC" },
    correct: "b"
  },
  {
    id: "q196",
    category: "culture",
    text: "What year was Facebook founded?",
    answers: { a: "2002", b: "2003", c: "2004", d: "2005" },
    correct: "c"
  },
  {
    id: "q197",
    category: "culture",
    text: "Who won the 2024 Oscar for Best Picture?",
    answers: { a: "Barbie", b: "Killers of the Flower Moon", c: "Oppenheimer", d: "Poor Things" },
    correct: "c"
  },
  {
    id: "q198",
    category: "culture",
    text: "What animal is Pikachu?",
    answers: { a: "Mouse", b: "Cat", c: "Rabbit", d: "Hamster" },
    correct: "a"
  },
  {
    id: "q199",
    category: "culture",
    text: "What is the capital of France?",
    answers: { a: "London", b: "Berlin", c: "Paris", d: "Rome" },
    correct: "c"
  },
  {
    id: "q200",
    category: "culture",
    text: "What candy is known as 'the milk chocolate that melts in your mouth'?",
    answers: { a: "Hershey's", b: "M&Ms", c: "Snickers", d: "Kit Kat" },
    correct: "b"
  },
  {
    id: "q201",
    category: "thanksgiving",
    text: "What day of the week is Thanksgiving always on?",
    answers: { a: "Wednesday", b: "Thursday", c: "Friday", d: "Saturday" },
    correct: "b"
  },
  {
    id: "q202",
    category: "thanksgiving",
    text: "What ship brought the Pilgrims to America?",
    answers: { a: "Santa Maria", b: "The Speedwell", c: "The Mayflower", d: "The Discovery" },
    correct: "c"
  },
  {
    id: "q203",
    category: "thanksgiving",
    text: "What is the red sauce served with turkey called?",
    answers: { a: "Jelly", b: "Cranberry sauce", c: "Ketchup", d: "Gravy" },
    correct: "b"
  },
  {
    id: "q204",
    category: "thanksgiving",
    text: "Which US President made Thanksgiving a national holiday?",
    answers: { a: "George Washington", b: "Thomas Jefferson", c: "Abraham Lincoln", d: "Theodore Roosevelt" },
    correct: "c"
  },
  {
    id: "q205",
    category: "thanksgiving",
    text: "What Native American tribe celebrated the first Thanksgiving?",
    answers: { a: "Cherokee", b: "Wampanoag", c: "Sioux", d: "Apache" },
    correct: "b"
  },
  {
    id: "q206",
    category: "thanksgiving",
    text: "What sport is traditionally watched on Thanksgiving?",
    answers: { a: "Baseball", b: "Basketball", c: "Football", d: "Hockey" },
    correct: "c"
  },
  {
    id: "q207",
    category: "thanksgiving",
    text: "What balloon has appeared the most in Macy's Thanksgiving Parade?",
    answers: { a: "Mickey Mouse", b: "Snoopy", c: "SpongeBob", d: "Pikachu" },
    correct: "b"
  },
  {
    id: "q208",
    category: "thanksgiving",
    text: "What month is Thanksgiving in?",
    answers: { a: "October", b: "November", c: "December", d: "September" },
    correct: "b"
  },
  {
    id: "q209",
    category: "thanksgiving",
    text: "How long did the first Thanksgiving celebration last?",
    answers: { a: "1 day", b: "2 days", c: "3 days", d: "1 week" },
    correct: "c"
  },
  {
    id: "q210",
    category: "thanksgiving",
    text: "What is the name of the loose skin under a turkey's neck?",
    answers: { a: "Gobble", b: "Wattle", c: "Snood", d: "Caruncle" },
    correct: "b"
  },
  {
    id: "q211",
    category: "stem",
    text: "What is the largest organ in the human body?",
    answers: { a: "Heart", b: "Brain", c: "Liver", d: "Skin" },
    correct: "d"
  },
  {
    id: "q212",
    category: "stem",
    text: "What does HTTP stand for?",
    answers: { a: "HyperText Transfer Protocol", b: "High Tech Text Program", c: "Home Tool Transfer Protocol", d: "Hyper Transfer Text Program" },
    correct: "a"
  },
  {
    id: "q213",
    category: "stem",
    text: "What is the square root of 64?",
    answers: { a: "6", b: "7", c: "8", d: "9" },
    correct: "c"
  },
  {
    id: "q214",
    category: "stem",
    text: "What is the chemical formula for table salt?",
    answers: { a: "H2O", b: "NaCl", c: "KCl", d: "CO2" },
    correct: "b"
  },
  {
    id: "q215",
    category: "stem",
    text: "How many teeth does an adult human have?",
    answers: { a: "28", b: "30", c: "32", d: "34" },
    correct: "c"
  },
  {
    id: "q216",
    category: "sports",
    text: "What does NBA stand for?",
    answers: { a: "National Basketball Association", b: "North Basketball Arena", c: "National Ball Association", d: "New Basketball Alliance" },
    correct: "a"
  },
  {
    id: "q217",
    category: "sports",
    text: "What country hosted the 2016 Summer Olympics?",
    answers: { a: "China", b: "Brazil", c: "Japan", d: "UK" },
    correct: "b"
  },
  {
    id: "q218",
    category: "sports",
    text: "How many points is a field goal in basketball?",
    answers: { a: "1", b: "2", c: "3", d: "4" },
    correct: "b"
  },
  {
    id: "q219",
    category: "sports",
    text: "What year did Tiger Woods win his first Masters?",
    answers: { a: "1995", b: "1996", c: "1997", d: "1998" },
    correct: "c"
  },
  {
    id: "q220",
    category: "sports",
    text: "What is the diameter of a basketball hoop in inches?",
    answers: { a: "16 inches", b: "18 inches", c: "20 inches", d: "22 inches" },
    correct: "b"
  },
  {
    id: "q221",
    category: "music",
    text: "What does aespa's name stand for?",
    answers: { a: "Aesthetic aspect", b: "Avatar experience in synced parallel world aspect", c: "Always evolving special performance aspect", d: "Advanced electronic space performance aspect" },
    correct: "b"
  },
  {
    id: "q222",
    category: "music",
    text: "Which K-pop group is known as 'The Kings of K-pop'?",
    answers: { a: "BTS", b: "EXO", c: "Big Bang", d: "SEVENTEEN" },
    correct: "c"
  },
  {
    id: "q223",
    category: "music",
    text: "What year did Girls' Generation debut?",
    answers: { a: "2005", b: "2006", c: "2007", d: "2008" },
    correct: "c"
  },
  {
    id: "q224",
    category: "music",
    text: "How many members does NCT have in total (all units)?",
    answers: { a: "18", b: "20", c: "23", d: "It varies/unlimited" },
    correct: "d"
  },
  {
    id: "q225",
    category: "music",
    text: "Which member of BLACKPINK is from New Zealand?",
    answers: { a: "Jennie", b: "Lisa", c: "Jisoo", d: "Rosé" },
    correct: "d"
  },
  {
    id: "q226",
    category: "tv",
    text: "What animated show features Rick and Morty?",
    answers: { a: "Family Guy", b: "Rick and Morty", c: "South Park", d: "The Simpsons" },
    correct: "b"
  },
  {
    id: "q227",
    category: "tv",
    text: "What is the name of the dog in 'Family Guy'?",
    answers: { a: "Brian", b: "Stewie", c: "Peter", d: "Quagmire" },
    correct: "a"
  },
  {
    id: "q228",
    category: "tv",
    text: "How many seasons of 'Game of Thrones' are there?",
    answers: { a: "6", b: "7", c: "8", d: "9" },
    correct: "c"
  },
  {
    id: "q229",
    category: "tv",
    text: "What is the name of the high school in 'Riverdale'?",
    answers: { a: "Riverdale High", b: "Southside High", c: "Both A and B", d: "Central High" },
    correct: "c"
  },
  {
    id: "q230",
    category: "tv",
    text: "What color are the Smurfs?",
    answers: { a: "Green", b: "Blue", c: "Purple", d: "Red" },
    correct: "b"
  },
  {
    id: "q231",
    category: "culture",
    text: "Who sang 'Shake It Off'?",
    answers: { a: "Katy Perry", b: "Ariana Grande", c: "Taylor Swift", d: "Selena Gomez" },
    correct: "c"
  },
  {
    id: "q232",
    category: "culture",
    text: "What is the name of Harry Potter's owl?",
    answers: { a: "Hedwig", b: "Scabbers", c: "Crookshanks", d: "Fawkes" },
    correct: "a"
  },
  {
    id: "q233",
    category: "culture",
    text: "What year was the first iPhone released?",
    answers: { a: "2005", b: "2006", c: "2007", d: "2008" },
    correct: "c"
  },
  {
    id: "q234",
    category: "culture",
    text: "What is the most expensive spice in the world?",
    answers: { a: "Vanilla", b: "Cardamom", c: "Saffron", d: "Cinnamon" },
    correct: "c"
  },
  {
    id: "q235",
    category: "culture",
    text: "What is Superman's weakness?",
    answers: { a: "Kryptonite", b: "Magic", c: "Fire", d: "Water" },
    correct: "a"
  },
  {
    id: "q236",
    category: "stem",
    text: "What is 3 to the power of 3?",
    answers: { a: "9", b: "18", c: "27", d: "36" },
    correct: "c"
  },
  {
    id: "q237",
    category: "stem",
    text: "What planet is known as the Red Planet?",
    answers: { a: "Venus", b: "Mars", c: "Jupiter", d: "Saturn" },
    correct: "b"
  },
  {
    id: "q238",
    category: "stem",
    text: "Who invented the telephone?",
    answers: { a: "Thomas Edison", b: "Nikola Tesla", c: "Alexander Graham Bell", d: "Benjamin Franklin" },
    correct: "c"
  },
  {
    id: "q239",
    category: "stem",
    text: "How many minutes are in a day?",
    answers: { a: "1,200", b: "1,440", c: "1,680", d: "2,000" },
    correct: "b"
  },
  {
    id: "q240",
    category: "stem",
    text: "What is the boiling point of water in Fahrenheit?",
    answers: { a: "100°F", b: "150°F", c: "212°F", d: "250°F" },
    correct: "c"
  },
  {
    id: "q241",
    category: "sports",
    text: "What do you call it when a bowler makes three strikes in a row?",
    answers: { a: "Triple", b: "Turkey", c: "Hat Trick", d: "Perfect" },
    correct: "b"
  },
  {
    id: "q242",
    category: "sports",
    text: "What sport does Serena Williams play?",
    answers: { a: "Golf", b: "Tennis", c: "Volleyball", d: "Basketball" },
    correct: "b"
  },
  {
    id: "q243",
    category: "sports",
    text: "How many Super Bowl rings does Tom Brady have?",
    answers: { a: "5", b: "6", c: "7", d: "8" },
    correct: "c"
  },
  {
    id: "q244",
    category: "sports",
    text: "What is the only sport to be played on the moon?",
    answers: { a: "Baseball", b: "Golf", c: "Football", d: "Frisbee" },
    correct: "b"
  },
  {
    id: "q245",
    category: "sports",
    text: "How many rings are in the Olympic symbol?",
    answers: { a: "4", b: "5", c: "6", d: "7" },
    correct: "b"
  },
  {
    id: "q246",
    category: "culture",
    text: "Who wrote 'Romeo and Juliet'?",
    answers: { a: "Charles Dickens", b: "William Shakespeare", c: "Jane Austen", d: "Mark Twain" },
    correct: "b"
  },
  {
    id: "q247",
    category: "culture",
    text: "What do you call a baby kangaroo?",
    answers: { a: "Cub", b: "Pup", c: "Joey", d: "Kit" },
    correct: "c"
  },
  {
    id: "q248",
    category: "culture",
    text: "What is the smallest country in the world?",
    answers: { a: "Monaco", b: "Vatican City", c: "San Marino", d: "Liechtenstein" },
    correct: "b"
  },
  {
    id: "q249",
    category: "culture",
    text: "How many Harry Potter books are there?",
    answers: { a: "5", b: "6", c: "7", d: "8" },
    correct: "c"
  },
  {
    id: "q250",
    category: "culture",
    text: "What are the primary colors?",
    answers: { a: "Red, Blue, Yellow", b: "Red, Green, Blue", c: "Red, Blue, Green", d: "Yellow, Orange, Red" },
    correct: "a"
  }
];

async function importQuestions() {
  console.log('Starting import of 100 questions...');
  
  for (const question of newQuestions) {
    await set(ref(database, `questions/${question.id}`), question);
    console.log(`✅ Added ${question.id}`);
  }
  
  console.log('\n🎉 Done! Added 100 new questions (q151-q250)');
  console.log('Total questions in database: 250');
  process.exit(0);
}

importQuestions().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});