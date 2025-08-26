// Base de datos de preguntas por categoría y nivel
const questionsDatabase = {
    1: { // Nivel Principiante (6-8 años)
        matematicas: [
            {
                question: "¿Cuánto es 2 + 3?",
                answers: ["4", "5", "6", "7"],
                correct: 1
            },
            {
                question: "¿Cuánto es 10 - 4?",
                answers: ["5", "6", "7", "8"],
                correct: 1
            },
            {
                question: "¿Cuántas patas tiene un gato?",
                answers: ["2", "3", "4", "5"],
                correct: 2
            },
            {
                question: "¿Cuánto es 3 × 2?",
                answers: ["5", "6", "7", "8"],
                correct: 1
            },
            {
                question: "¿Cuál número es mayor: 8 o 5?",
                answers: ["5", "8", "Son iguales", "No sé"],
                correct: 1
            },
            {
                question: "¿Cuántos dedos tienes en una mano?",
                answers: ["4", "5", "6", "10"],
                correct: 1
            },
            {
                question: "¿Cuánto es 7 + 1?",
                answers: ["6", "7", "8", "9"],
                correct: 2
            },
            {
                question: "¿Cuántas ruedas tiene una bicicleta?",
                answers: ["1", "2", "3", "4"],
                correct: 1
            }
        ],
        historia: [
            {
                question: "¿En qué continente vivimos?",
                answers: ["Asia", "Europa", "América", "África"],
                correct: 2
            },
            {
                question: "¿Cómo se llama nuestro planeta?",
                answers: ["Luna", "Sol", "Tierra", "Marte"],
                correct: 2
            },
            {
                question: "¿Quién descubrió América?",
                answers: ["Napoleón", "Cristóbal Colón", "Einstein", "Picasso"],
                correct: 1
            },
            {
                question: "¿Cuál es la capital de Argentina?",
                answers: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"],
                correct: 2
            },
            {
                question: "¿En qué estación del año hace más calor?",
                answers: ["Primavera", "Verano", "Otoño", "Invierno"],
                correct: 1
            },
            {
                question: "¿Cuántos días tiene una semana?",
                answers: ["5", "6", "7", "8"],
                correct: 2
            }
        ],
        ingles: [
            {
                question: "¿Cómo se dice 'gato' en inglés?",
                answers: ["Dog", "Cat", "Bird", "Fish"],
                correct: 1
            },
            {
                question: "¿Cómo se dice 'rojo' en inglés?",
                answers: ["Blue", "Green", "Red", "Yellow"],
                correct: 2
            },
            {
                question: "¿Cómo se dice 'hola' en inglés?",
                answers: ["Goodbye", "Hello", "Please", "Thank you"],
                correct: 1
            },
            {
                question: "¿Cómo se dice 'casa' en inglés?",
                answers: ["Car", "House", "Tree", "Book"],
                correct: 1
            },
            {
                question: "¿Cuántos son 'three' en español?",
                answers: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "¿Cómo se dice 'agua' en inglés?",
                answers: ["Fire", "Water", "Earth", "Air"],
                correct: 1
            }
        ]
    },
    2: { // Nivel Intermedio (9-12 años)
        matematicas: [
            {
                question: "¿Cuánto es 15 × 4?",
                answers: ["50", "55", "60", "65"],
                correct: 2
            },
            {
                question: "¿Cuál es el resultado de 144 ÷ 12?",
                answers: ["11", "12", "13", "14"],
                correct: 1
            },
            {
                question: "¿Cuánto es 25% de 100?",
                answers: ["20", "25", "30", "35"],
                correct: 1
            },
            {
                question: "¿Cuál es el perímetro de un cuadrado de 5cm de lado?",
                answers: ["15cm", "20cm", "25cm", "30cm"],
                correct: 1
            },
            {
                question: "¿Cuánto es 8²?",
                answers: ["16", "32", "64", "128"],
                correct: 2
            },
            {
                question: "¿Cuál es la raíz cuadrada de 49?",
                answers: ["6", "7", "8", "9"],
                correct: 1
            },
            {
                question: "¿Cuánto es 3/4 + 1/4?",
                answers: ["1/2", "3/4", "1", "5/4"],
                correct: 2
            }
        ],
        historia: [
            {
                question: "¿En qué año llegó Colón a América?",
                answers: ["1490", "1491", "1492", "1493"],
                correct: 2
            },
            {
                question: "¿Quién fue el primer presidente de Argentina?",
                answers: ["San Martín", "Belgrano", "Rivadavia", "Sarmiento"],
                correct: 2
            },
            {
                question: "¿En qué continente está Egipto?",
                answers: ["Asia", "Europa", "África", "América"],
                correct: 2
            },
            {
                question: "¿Cuál fue la civilización que construyó Machu Picchu?",
                answers: ["Azteca", "Maya", "Inca", "Olmeca"],
                correct: 2
            },
            {
                question: "¿En qué año terminó la Segunda Guerra Mundial?",
                answers: ["1944", "1945", "1946", "1947"],
                correct: 1
            },
            {
                question: "¿Cuál es el río más largo del mundo?",
                answers: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
                correct: 1
            }
        ],
        ingles: [
            {
                question: "What is the past tense of 'go'?",
                answers: ["Goed", "Went", "Gone", "Going"],
                correct: 1
            },
            {
                question: "Which is correct: 'I have' or 'I has'?",
                answers: ["I have", "I has", "Both", "Neither"],
                correct: 0
            },
            {
                question: "What does 'library' mean in Spanish?",
                answers: ["Librería", "Biblioteca", "Libro", "Libreta"],
                correct: 1
            },
            {
                question: "How do you say 'hermano' in English?",
                answers: ["Sister", "Brother", "Father", "Mother"],
                correct: 1
            },
            {
                question: "What is the plural of 'child'?",
                answers: ["Childs", "Children", "Childes", "Child"],
                correct: 1
            },
            {
                question: "Which is a verb: 'quickly' or 'run'?",
                answers: ["Quickly", "Run", "Both", "Neither"],
                correct: 1
            }
        ]
    },
    3: { // Nivel Avanzado (13+ años)
        matematicas: [
            {
                question: "¿Cuál es la derivada de x²?",
                answers: ["x", "2x", "x²", "2x²"],
                correct: 1
            },
            {
                question: "¿Cuánto vale π (pi) aproximadamente?",
                answers: ["3.14", "3.41", "4.13", "1.34"],
                correct: 0
            },
            {
                question: "¿Cuál es la fórmula del área de un círculo?",
                answers: ["2πr", "πr²", "πd", "2πr²"],
                correct: 1
            },
            {
                question: "¿Cuánto es log₁₀(100)?",
                answers: ["1", "2", "10", "100"],
                correct: 1
            },
            {
                question: "¿Cuál es el teorema de Pitágoras?",
                answers: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c"],
                correct: 0
            },
            {
                question: "¿Cuánto es sen(90°)?",
                answers: ["0", "1", "√2/2", "-1"],
                correct: 1
            }
        ],
        historia: [
            {
                question: "¿En qué año cayó el Muro de Berlín?",
                answers: ["1987", "1988", "1989", "1990"],
                correct: 2
            },
            {
                question: "¿Quién escribió 'El Origen de las Especies'?",
                answers: ["Newton", "Einstein", "Darwin", "Galileo"],
                correct: 2
            },
            {
                question: "¿Cuál fue la primera civilización en usar la escritura?",
                answers: ["Egipcia", "Griega", "Sumeria", "China"],
                correct: 2
            },
            {
                question: "¿En qué año comenzó la Revolución Francesa?",
                answers: ["1789", "1790", "1791", "1792"],
                correct: 0
            },
            {
                question: "¿Quién fue el emperador romano durante la crucifixión de Jesús?",
                answers: ["Julio César", "Augusto", "Tiberio", "Nerón"],
                correct: 2
            },
            {
                question: "¿Cuál fue la capital del Imperio Bizantino?",
                answers: ["Roma", "Atenas", "Constantinopla", "Alejandría"],
                correct: 2
            }
        ],
        ingles: [
            {
                question: "Which sentence uses the subjunctive mood correctly?",
                answers: [
                    "If I was rich, I would travel",
                    "If I were rich, I would travel",
                    "If I am rich, I would travel",
                    "If I will be rich, I would travel"
                ],
                correct: 1
            },
            {
                question: "What is a synonym for 'ubiquitous'?",
                answers: ["Rare", "Omnipresent", "Beautiful", "Difficult"],
                correct: 1
            },
            {
                question: "Which is the correct passive voice of 'They built the house'?",
                answers: [
                    "The house built by them",
                    "The house was built by them",
                    "The house is built by them",
                    "The house building by them"
                ],
                correct: 1
            },
            {
                question: "What does 'serendipity' mean?",
                answers: [
                    "Bad luck",
                    "Hard work",
                    "Pleasant surprise",
                    "Deep sadness"
                ],
                correct: 2
            },
            {
                question: "Which sentence has correct parallel structure?",
                answers: [
                    "I like reading, writing, and to swim",
                    "I like reading, writing, and swimming",
                    "I like to read, writing, and swimming",
                    "I like reading, to write, and swimming"
                ],
                correct: 1
            }
        ]
    }
};

// Función para obtener preguntas aleatorias por nivel
function getRandomQuestions(level, count = 10) {
    const levelQuestions = questionsDatabase[level];
    const allQuestions = [];
    
    // Combinar todas las categorías
    Object.keys(levelQuestions).forEach(category => {
        levelQuestions[category].forEach(question => {
            allQuestions.push({
                ...question,
                category: category
            });
        });
    });
    
    // Mezclar y seleccionar preguntas aleatorias
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Función para obtener el nombre de la categoría en español
function getCategoryName(category) {
    const categoryNames = {
        matematicas: "Matemáticas",
        historia: "Historia",
        ingles: "Inglés"
    };
    return categoryNames[category] || category;
}

// Función para guardar estadísticas en localStorage
function saveStats(stats) {
    const existingStats = JSON.parse(localStorage.getItem('snakeEducativoStats') || '[]');
    existingStats.push({
        ...stats,
        date: new Date().toISOString()
    });
    
    // Mantener solo las últimas 50 partidas
    if (existingStats.length > 50) {
        existingStats.splice(0, existingStats.length - 50);
    }
    
    localStorage.setItem('snakeEducativoStats', JSON.stringify(existingStats));
}

// Función para obtener estadísticas históricas
function getHistoricalStats() {
    return JSON.parse(localStorage.getItem('snakeEducativoStats') || '[]');
}