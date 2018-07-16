
// Les Cartes du jeu
let suits = ['Coeur', 'Treffle', 'Carreau', 'Pique'],
    values = ['As', 'Roi', 'Dame', 'Valet', '10', '9',
  '8', '7', '6', '5', '4', '3', '2'];
////////////////////


// Les liens HTML
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');
/////////////////



// Paramètre de base
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
/////////////////////




// Hit & Stay au départ inexistant
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();
//////////////





// Paramètre du "Start Event"
newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard()];
  playerCards = [ getNextCard(), getNextCard()];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});
////////////////////////////




// Création des boutons de jeu
hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
})
/////////////////////////////////






// Création du deck Univers
function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}
////////////////////////////




// Mélengez le Deck
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck [i] = tmp;
  }
} 
////////////////////



// Définition d'une carte
function getCardString(card) {
  return card.value + ' de ' + card.suit;}
/////////////////////////



// Piocher la carte du dessus
function getNextCard() {
  return deck.shift();}
/////////////////////////////




// Affichage Texte si rien n'a débuté
function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack !';
  return;}
//////////////////////////////////////



// Affichez toute les cartes
for (var i=0; i<deck.length; i++) {
  textArea.innerText += '\n' + getCardString(deck[i]);
  }
}
///////////////////////////


//// Part 2


// Valeur numériques des cartes
function getCardNumericValue(card) {
  switch(card.value) {
    case 'As':
      return 1;
    case '2':
      return 2;
     case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 10;
  }
}
////////////////////////////////



// Calculer le score
function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}
/////////////////////



// Mettre à jour les scores
function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);}
///////////////////////////


function checkForEndOfGame() {
  
  updateScores();
  
  if (gameOver) {
    // Le dealer prend ses cartes s'il le veut
    while(dealerScore < playerScore
      && playerScore <= 21
      && dealerScore <= 21) {
    dealerCards.push(getNextCard());
    updateScores();
     }
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
  
  if (playerScore > dealerScore) {
    playerWon = true;
  }
  else {
    playerWon = false;
    }
  }
}






// Check de fin de jeu
function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack !';
    return;
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  
  
  
  
  // Update le Score
  updateScores();
  /////////////////
  
  
  
  
  textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score: '+ dealerScore + ')\n\n' +
    
    'Player has:\n' +
    playerCardString +
    '(score: '+ playerScore + ')\n\n';
    
  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "YOU WIN !";
    }
    else {
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }
}
///////////////////////




