/* --- UTILITY FUNCTIONS --- */
function showMenu() {
    document.getElementById('main-menu').classList.remove('hidden');
    for(let i=1; i<=4; i++) {
        document.getElementById(`game-${i}`).classList.add('hidden');
        document.getElementById(`game-${i}`).classList.remove('flex');
    }
}

function startGame(id) {
    document.getElementById('main-menu').classList.add('hidden');
    const gameContainer = document.getElementById(`game-${id}`);
    gameContainer.classList.remove('hidden');
    gameContainer.classList.add('flex');
    
    if(id === 1) initMemoryGame();
    if(id === 2) initScrambleGame();
    if(id === 3) initHangmanGame();
    if(id === 4) initDnDGame();
}

function showMessage(title, text, colorClass = 'text-teal-400', borderClass = 'border-teal-500') {
    const modal = document.getElementById('custom-modal');
    const titleEl = document.getElementById('modal-title');
    const modalInner = modal.querySelector('div');
    
    titleEl.textContent = title;
    titleEl.className = `text-2xl font-bold mb-2 arcade-font ${colorClass}`;
    document.getElementById('modal-text').textContent = text;
    
    modalInner.className = `bg-slate-800 border-2 rounded-2xl p-6 max-w-sm w-full text-center pop-in ${borderClass}`;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

/* --- GAME 1: MEMORY MATCH --- */
const memoryData = [
    { id: 1, term: "Ethics", def: "Study of right or wrong; a moral choice by an individual." },
    { id: 2, term: "Ethical Dilemma", def: "A choice between two valid but conflicting options." },
    { id: 3, term: "Corporate Social Responsibility", def: "A self-regulating business model that helps a company be socially accountable." },
    { id: 4, term: "Classical Model (CSR)", def: "Using resources efficiently to produce goods at prices consumers will pay." },
    { id: 5, term: "Socio-economic Model", def: "Business has a responsibility not just to profit, but to employees, customers, and society." },
    { id: 6, term: "Environmental Responsibility", def: "Reducing pollution, emissions, and recycling materials." },
    { id: 7, term: "Philanthropic Responsibility", def: "Donating profits to charities or sponsoring fundraisers." },
    { id: 8, term: "Code of Ethics", def: "An institutionalized company policy to foster ethical decision-making." }
];

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    lockBoard = false;
    document.getElementById('game1-message').classList.add('hidden');
    document.getElementById('game1-restart').classList.add('hidden');

    memoryCards = [];
    memoryData.forEach(item => {
        memoryCards.push({ matchId: item.id, text: item.term, type: 'term' });
        memoryCards.push({ matchId: item.id, text: item.def, type: 'definition' });
    });

    memoryCards.sort(() => Math.random() - 0.5);

    memoryCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'memory-card relative w-full h-full min-h-[100px] md:min-h-[140px]';
        cardEl.dataset.index = index;
        cardEl.dataset.matchId = card.matchId;
        
        const typeClass = card.type === 'term' ? 'term' : 'definition';

        cardEl.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">
                    <i class="fas fa-brain text-3xl text-slate-600"></i>
                </div>
                <div class="memory-card-back ${typeClass}">
                    <span>${card.text}</span>
                </div>
            </div>
        `;
        cardEl.addEventListener('click', () => flipCard(cardEl));
        grid.appendChild(cardEl);
    });
}

function flipCard(card) {
    if (lockBoard) return;
    if (card === flippedCards[0]) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = flippedCards[0].dataset.matchId === flippedCards[1].dataset.matchId;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    flippedCards[0].classList.add('matched');
    flippedCards[1].classList.add('matched');
    
    flippedCards[0].classList.add('pop-in');
    flippedCards[1].classList.add('pop-in');

    flippedCards = [];
    matchedPairs++;
    lockBoard = false;

    if (matchedPairs === memoryData.length) {
        setTimeout(() => {
            document.getElementById('game1-message').classList.remove('hidden');
            document.getElementById('game1-restart').classList.remove('hidden');
        }, 500);
    }
}

function unflipCards() {
    setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
    }, 1200);
}

/* --- GAME 2: WORD SCRAMBLE (40 ITEMS) --- */
const scrambleData = [
    { scrambled: "OXPIERTNG", answer: "EXPORTING", hint: "Selling goods or services produced at home to foreign markets." },
    { scrambled: "LIERACSNIG", answer: "LICENSING", hint: "Granting rights to a foreign company to produce or sell your products." },
    { scrambled: "OINTJ RUTNEV", answer: "JOINT VENTURE", hint: "Two or more companies from different countries form a partnership to share resources and risks." },
    { scrambled: "TSBCIDRIAU", answer: "SUBSIDIARY", hint: "Setting up local production and distribution facilities in the host country." },
    { scrambled: "RELLIBAGZIONL", answer: "GLOBALIZATION", hint: "The increasing interconnectedness and integration of economies, cultures, and societies." },
    { scrambled: "MGIPTRION", answer: "IMPORTING", hint: "Buying goods or services from foreign markets into your home country." },
    { scrambled: "GSIFHNARCIN", answer: "FRANCHISING", hint: "Allowing a foreign business to use your brand name and operating methods for a fee." },
    { scrambled: "GSIUOTNCOUR", answer: "OUTSOURCING", hint: "Contracting a third party to perform specific business functions." },
    { scrambled: "GFHRNOOIFS", answer: "OFFSHORING", hint: "Relocating a business process or department from one country to another." },
    { scrambled: "FRAFIT", answer: "TARIFF", hint: "A tax imposed by a government on imported goods and services." },
    { scrambled: "OAQTU", answer: "QUOTA", hint: "A government-imposed trade restriction that limits the number of goods that can be imported." },
    { scrambled: "GBMOAER", answer: "EMBARGO", hint: "An official ban on trade or other commercial activity with a particular country." },
    { scrambled: "AETRTPIAXE", answer: "EXPATRIATE", hint: "An employee who is sent to live and work in a foreign country by their company." },
    { scrambled: "LMNOAINIUTALT", answer: "MULTINATIONAL", hint: "A corporation that has facilities and assets in at least one country other than its home." },
    { scrambled: "RLTUCUE", answer: "CULTURE", hint: "The shared beliefs, customs, and arts of a particular society or group." },
    { scrambled: "DPLERSIHEA", answer: "LEADERSHIP", hint: "The action of guiding or directing a group of people or an organization." },
    { scrambled: "TIOAOMITVN", answer: "MOTIVATION", hint: "The internal and external factors that stimulate desire and energy in people to perform." },
    { scrambled: "LGEEODINAT", answer: "DELEGATION", hint: "The assignment of authority to another person to carry out specific activities." },
    { scrambled: "TARGTYSE", answer: "STRATEGY", hint: "A plan of action or policy designed to achieve a major or overall aim." },
    { scrambled: "VNNOIIAOTN", answer: "INNOVATION", hint: "The process of translating an idea or invention into a good or service that creates value." },
    { scrambled: "GSYEYRN", answer: "SYNERGY", hint: "The combined power of a group of things working together which is greater than the total power achieved by each working separately." },
    { scrambled: "DLSETAREOHK", answer: "STAKEHOLDER", hint: "A party that has an interest in a company and can either affect or be affected by the business." },
    { scrambled: "TCDVIITYPRUO", answer: "PRODUCTIVITY", hint: "A measure of efficiency in converting inputs into useful outputs." },
    { scrambled: "FYEFCCIENI", answer: "EFFICIENCY", hint: "The ability to avoid wasting materials, energy, efforts, money, and time." },
    { scrambled: "SFVEEEFNCTISE", answer: "EFFECTIVENESS", hint: "The degree to which something is successful in producing a desired result." },
    { scrambled: "VSIRDEITY", answer: "DIVERSITY", hint: "The practice of including or involving people from a range of different social and ethnic backgrounds." },
    { scrambled: "INOOITAETGN", answer: "NEGOTIATION", hint: "A strategic discussion aimed at reaching an agreement." },
    { scrambled: "CMIPOCENLA", answer: "COMPLIANCE", hint: "The action or fact of adhering to a rule, such as a policy, standard, or law." },
    { scrambled: "OIGCSTSLI", answer: "LOGISTICS", hint: "The detailed coordination of a complex operation involving many people, facilities, or supplies." },
    { scrambled: "RNMGEACBINKH", answer: "BENCHMARKING", hint: "Comparing one's business processes and performance metrics to industry best practices." },
    { scrambled: "MWEMNOEPRTE", answer: "EMPOWERMENT", hint: "Giving employees a certain degree of autonomy and responsibility for decision-making." },
    { scrambled: "RTMNENGIO", answer: "MENTORING", hint: "A system where one person shares their knowledge and experience to assist others." },
    { scrambled: "CAURYRACBEU", answer: "BUREAUCRACY", hint: "A system of administration distinguished by clear hierarchy, rigid division of labor, and strict rules." },
    { scrambled: "ZAENRLTCIEDAIONT", answer: "DECENTRALIZATION", hint: "The transfer of control to several local offices or authorities rather than a single central one." },
    { scrambled: "NOTGIIRTENA", answer: "INTEGRATION", hint: "The act of bringing together smaller components into a single system that functions as one." },
    { scrambled: "PLYUPS HACIN", answer: "SUPPLY CHAIN", hint: "The sequence of processes involved in the production and distribution of a commodity." },
    { scrambled: "TSFAIRGCNEO", answer: "FORECASTING", hint: "The process of making predictions of the future based on past and present data." },
    { scrambled: "RNOETVINY", answer: "INVENTORY", hint: "A complete list of items such as property, goods in stock, or the contents of a building." },
    { scrambled: "EPMNRCTOURE", answer: "PROCUREMENT", hint: "The action of obtaining or purchasing goods and services for a business." },
    { scrambled: "BYSITTNAIAUISL", answer: "SUSTAINABILITY", hint: "Focusing on meeting the needs of the present without compromising the ability of future generations." }
];

let currentScramble = 0;

function initScrambleGame() {
    currentScramble = 0;
    document.getElementById('game2-complete').classList.add('hidden');
    document.getElementById('scramble-input').style.display = 'block';
    document.getElementById('scramble-btn').style.display = 'block';
    loadScramble();
}

function loadScramble() {
    const data = scrambleData[currentScramble];
    document.getElementById('scrambled-word').textContent = data.scrambled;
    document.getElementById('scramble-hint').textContent = data.hint;
    document.getElementById('scramble-progress').textContent = `${currentScramble + 1}/${scrambleData.length}`;
    
    const input = document.getElementById('scramble-input');
    input.value = '';
    input.disabled = false;
    input.focus();
    
    const btn = document.getElementById('scramble-btn');
    btn.textContent = "Check Answer";
    btn.onclick = checkScramble;
    btn.className = "btn-yellow px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-md flex-shrink-0";
    
    const msg = document.getElementById('scramble-msg');
    msg.classList.add('hidden');
    msg.className = "mt-4 font-bold text-lg hidden min-h-[28px]";
}

function checkScramble() {
    const input = document.getElementById('scramble-input').value.trim().toUpperCase();
    const correct = scrambleData[currentScramble].answer;
    const msg = document.getElementById('scramble-msg');

    if (input === correct) {
        msg.textContent = "Correct! Well done.";
        msg.className = "mt-4 font-bold text-lg text-green-400 pop-in min-h-[28px] block";
        document.getElementById('scramble-input').disabled = true;
        
        const btn = document.getElementById('scramble-btn');
        btn.textContent = "Next Puzzle";
        btn.className = "btn-green px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-md flex-shrink-0 pop-in";
        btn.onclick = nextScramble;
    } else {
        msg.textContent = "Incorrect, try again!";
        msg.className = "mt-4 font-bold text-lg text-red-400 shake min-h-[28px] block";
        document.getElementById('scramble-input').classList.add('border-red-500');
        setTimeout(() => {
            document.getElementById('scramble-input').classList.remove('border-red-500');
        }, 400);
    }
}

function nextScramble() {
    currentScramble++;
    if (currentScramble < scrambleData.length) {
        loadScramble();
    } else {
        document.getElementById('scramble-btn').style.display = 'none';
        document.getElementById('scramble-input').style.display = 'none';
        document.getElementById('scramble-msg').style.display = 'none';
        document.getElementById('game2-complete').classList.remove('hidden');
    }
}

document.getElementById('scramble-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('scramble-btn').click();
    }
});

/* --- GAME 3: HANGMAN --- */
const hangmanData = [
    { word: "PLANNING", hint: "Estimating future conditions and making decisions about courses of action. - Lesson 1" },
    { word: "CONTROLLING", hint: "Regulating the work of those for whom a manager is responsible. - Lesson 1" },
    { word: "CONCEPTUAL", hint: "Skills involving reasoning, judgment, and analytical thinking. - Lesson 1" },
    { word: "STRATEGIC", hint: "Top-level managers are also called this type of manager. - Lesson 1" },
    { word: "BRAINSTORMING", hint: "An open, creative decision-making process where members freely suggest ideas without immediate criticism. - Lesson 4" }
];

let currentHangman = 0;
let hangmanLives = 6;
let guessedLetters = [];

function initHangmanGame() {
    currentHangman = 0;
    document.getElementById('game3-complete').classList.add('hidden');
    document.getElementById('hangman-word').style.display = 'flex';
    document.getElementById('hangman-keyboard').style.display = 'flex';
    loadHangman();
}

function loadHangman() {
    hangmanLives = 6;
    guessedLetters = [];
    document.getElementById('hangman-lives').textContent = hangmanLives;
    
    const data = hangmanData[currentHangman];
    document.getElementById('hangman-hint').textContent = data.hint;
    
    document.getElementById('hangman-msg').classList.add('hidden');
    document.getElementById('hangman-next-btn').classList.add('hidden');

    renderHangmanWord();
    renderKeyboard();
    drawHangman();
}

function renderHangmanWord() {
    const container = document.getElementById('hangman-word');
    container.innerHTML = '';
    const word = hangmanData[currentHangman].word;
    
    for (let char of word) {
        const span = document.createElement('span');
        span.className = 'w-8 h-10 md:w-10 md:h-12 border-b-4 border-slate-400 flex items-center justify-center text-green-400 mx-1 transition-all';
        if (guessedLetters.includes(char)) {
            span.textContent = char;
            span.classList.add('border-green-400');
        } else {
            span.textContent = '';
        }
        container.appendChild(span);
    }
}

function renderKeyboard() {
    const container = document.getElementById('hangman-keyboard');
    container.innerHTML = '';
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    
    alphabet.forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.className = 'w-8 h-10 md:w-10 md:h-12 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold transition-colors arcade-font disabled:opacity-30 disabled:cursor-not-allowed';
        btn.onclick = () => guessLetter(letter, btn);
        container.appendChild(btn);
    });
}

function guessLetter(letter, btn) {
    if (guessedLetters.includes(letter) || hangmanLives === 0) return;
    
    guessedLetters.push(letter);
    btn.disabled = true;
    
    const word = hangmanData[currentHangman].word;
    
    if (word.includes(letter)) {
        btn.classList.add('bg-green-600');
        renderHangmanWord();
        checkHangmanWin();
    } else {
        btn.classList.add('bg-red-600');
        hangmanLives--;
        document.getElementById('hangman-lives').textContent = hangmanLives;
        drawHangman();
        if (hangmanLives === 0) {
            endHangman(false);
        }
    }
}

function drawHangman() {
    const canvas = document.getElementById('hangman-canvas');
    const ctx = canvas.getContext('2d');
    
    if (hangmanLives === 6) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(20, 180);
        ctx.lineTo(180, 180);
        ctx.moveTo(50, 180);
        ctx.lineTo(50, 20);
        ctx.lineTo(120, 20);
        ctx.lineTo(120, 40);
        ctx.stroke();
    } else {
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        if (hangmanLives === 5) {
            ctx.arc(120, 60, 20, 0, Math.PI * 2);
        } else if (hangmanLives === 4) {
            ctx.moveTo(120, 80);
            ctx.lineTo(120, 130);
        } else if (hangmanLives === 3) {
            ctx.moveTo(120, 90);
            ctx.lineTo(90, 110);
        } else if (hangmanLives === 2) {
            ctx.moveTo(120, 90);
            ctx.lineTo(150, 110);
        } else if (hangmanLives === 1) {
            ctx.moveTo(120, 130);
            ctx.lineTo(90, 160);
        } else if (hangmanLives === 0) {
            ctx.moveTo(120, 130);
            ctx.lineTo(150, 160);
            ctx.stroke();
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(110, 55); ctx.lineTo(115, 60);
            ctx.moveTo(115, 55); ctx.lineTo(110, 60);
            ctx.moveTo(125, 55); ctx.lineTo(130, 60);
            ctx.moveTo(130, 55); ctx.lineTo(125, 60);
        }
        ctx.stroke();
    }
}

function checkHangmanWin() {
    const word = hangmanData[currentHangman].word;
    const hasWon = word.split('').every(char => guessedLetters.includes(char));
    
    if (hasWon) {
        endHangman(true);
    }
}

function endHangman(win) {
    const msg = document.getElementById('hangman-msg');
    msg.classList.remove('hidden');
    
    const btns = document.getElementById('hangman-keyboard').querySelectorAll('button');
    btns.forEach(b => b.disabled = true);
    
    if (win) {
        msg.textContent = "Correct!";
        msg.className = "mt-2 font-bold text-xl pop-in arcade-font text-center h-8 text-green-400 block";
    } else {
        msg.textContent = `Game Over! Word was: ${hangmanData[currentHangman].word}`;
        msg.className = "mt-2 font-bold text-xl pop-in arcade-font text-center h-8 text-red-500 block";
    }
    
    document.getElementById('hangman-next-btn').classList.remove('hidden');
} /* --- GAME 4: THE DECISION MAKER --- */
const dndData = [
    { id: "d1", text: "Identify decision", bucket: "A" },
    { id: "d2", text: "Gather info", bucket: "A" },
    { id: "d3", text: "Identify alternatives", bucket: "A" },
    { id: "d4", text: "Weigh evidence", bucket: "A" },
    { id: "d5", text: "Choose among alternatives", bucket: "A" },
    { id: "d6", text: "Take action", bucket: "A" },
    { id: "d7", text: "Review decision", bucket: "A" },
    { id: "d8", text: "Fast (Individual)", bucket: "B" },
    { id: "d9", text: "Conflicting (Group)", bucket: "B" },
    { id: "d10", text: "Shared Responsibility (Group)", bucket: "B" },
    { id: "d11", text: "Clear Accountability (Individual)", bucket: "B" },
    { id: "d12", text: "Groupthink (Group)", bucket: "B" }
];

let selectedDnDItem = null;

function initDnDGame() {
    const bank = document.getElementById('dnd-bank');
    const bucketA = document.querySelector('#bucket-A .dnd-target-list');
    const bucketB = document.querySelector('#bucket-B .dnd-target-list');
    
    bank.innerHTML = '';
    bucketA.innerHTML = '';
    bucketB.innerHTML = '';
    
    document.getElementById('game4-message').classList.add('hidden');
    document.getElementById('game4-restart').classList.add('hidden');
    selectedDnDItem = null;

    let shuffled = [...dndData].sort(() => Math.random() - 0.5);

    shuffled.forEach(item => {
        const el = document.createElement('div');
        el.id = item.id;
        el.className = 'draggable-item bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded p-3 text-sm md:text-base font-semibold shadow';
        el.textContent = item.text;
        el.draggable = true;
        el.dataset.bucket = item.bucket;
        
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            clearDnDSelection();
        });
        
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            handleItemClick(el);
        });

        bank.appendChild(el);
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, targetBucketId) {
    ev.preventDefault();
    const itemId = ev.dataTransfer.getData('text/plain');
    const item = document.getElementById(itemId);
    
    if (item) {
        processMove(item, targetBucketId);
    }
}

function handleItemClick(el) {
    if (selectedDnDItem === el) {
        clearDnDSelection();
    } else {
        clearDnDSelection();
        selectedDnDItem = el;
        el.classList.add('drag-selected');
    }
}

function handleBucketClick(bucketId) {
    if (selectedDnDItem) {
        processMove(selectedDnDItem, bucketId);
        clearDnDSelection();
    }
}

function clearDnDSelection() {
    if (selectedDnDItem) {
        selectedDnDItem.classList.remove('drag-selected');
        selectedDnDItem = null;
    }
}

function processMove(item, targetBucketId) {
    const correctBucket = item.dataset.bucket;
    
    if (targetBucketId === correctBucket) {
        const targetContainer = document.querySelector(`#bucket-${targetBucketId} .dnd-target-list`);
        item.className = 'bg-slate-800 border border-green-500 text-green-300 rounded p-2 text-sm shadow mb-2 pop-in';
        item.draggable = false;
        item.onclick = null;
        targetContainer.appendChild(item);
        checkDnDWin();
    } else if (targetBucketId === 'bank') {
        // Do nothing
    } else {
        item.classList.add('shake', 'border-red-500');
        showMessage("Incorrect Placement", `That item doesn't belong in this category. Think about whether it relates to the 7 Steps (A) or Individual/Group dynamics (B).`, "text-red-400", "border-red-500");
        setTimeout(() => {
            item.classList.remove('shake', 'border-red-500');
        }, 400);
    }
}

function checkDnDWin() {
    const bank = document.getElementById('dnd-bank');
    if (bank.children.length === 0) {
        document.getElementById('game4-message').classList.remove('hidden');
        document.getElementById('game4-restart').classList.remove('hidden');
        document.getElementById('game4-restart').classList.add('pop-in');
    }
}

window.onload = function() {
    showMenu();
};
