document.addEventListener("DOMContentLoaded", () => {
    const CARD_COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'white'];
    const CARD_VALUES = [...Array(10).keys()].map(String).concat(['Skip', 'Reverse', 'Draw Two', '-1']);
    const COLORABLE_CARDS = [true, true, true, true, true, true, true, true, true, true, true, true, true, false]; // Example array

    let autoMode = false; // Boolean to toggle auto mode

    function isInteger(value) {
        const parsed = parseInt(value, 10); // Convert to integer
        return !isNaN(parsed) && parsed.toString() === value.toString();
    }

    function isGreekCharacter(char) {
        // Get the Unicode code point of the character
        const codePoint = char.codePointAt(0);
        
        // Check if the code point is within the Greek ranges
        return (
            (codePoint >= 0x0370 && codePoint <= 0x03FF) || // Greek and Coptic
            (codePoint >= 0x1F00 && codePoint <= 0x1FFF)   // Greek Extended
        );
    }

    class Card {
        constructor(color, value, isColorable) {
            this.color = color;
            this.value = value;
            this.isColorable = isColorable;
        }
    }

    class PlayerHand {
        constructor() {
            this.cards = [];
            this.playedCard = this.getRandomCard(); // Initialize played card as a random card
        }
        
        getRandomCard() {
            const index = Math.floor(Math.random() * CARD_VALUES.length);
            const color = COLORABLE_CARDS[index] ? CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)] : 'black';
            const value = CARD_VALUES[index];
            const isColorable = COLORABLE_CARDS[index];
            return new Card(color, value, isColorable)
        }

        draw(number) {
            for (let i = 0; i < number; i++) {
                this.cards.push(this.getRandomCard());
            }
            this.displayHand();
            if (autoMode) {
                this.autoPlay(); // Auto-play if auto mode is enabled
            }
        }

        displayHand() {
            const handDiv = document.getElementById('player-hand');
            handDiv.innerHTML = ''; // Clear current hand
            this.cards.forEach((card, idx) => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                cardDiv.classList.add(card.isColorable ? card.color : 'black');
                cardDiv.textContent = `${card.value}`;
                cardDiv.dataset.index = idx; // Store card index for reference
                cardDiv.addEventListener('click', () => this.playCard(idx)); // Add click event listener
                let time = -Math.random()*4;
                cardDiv.style.setProperty('--animation-time', time +'s');
                handDiv.appendChild(cardDiv);
            });
        }

        playCard(index) {
            const card = this.cards[index];
            if (this.canPlayCard(card)) {
                this.playedCard = card; // Set the played card
                this.moveToPlayedCard(card); // Move card to played area
                this.cards.splice(index, 1);
                this.displayHand();
                if (autoMode) {
                    this.autoPlay(); // Auto-play if auto mode is enabled
                }
            } else {
                console.log(`Card ${card.value} (${card.color}) cannot be played.`);
            }
        }

        canPlayCard(card) {
            if (!card || !this.playedCard) return false;
            if (card.color === this.playedCard.color || card.value === this.playedCard.value) return true;
            if (card.value == -1 && isInteger(this.playedCard.value)) return true;
            if (isInteger(card.value) && this.playedCard.value == -1) return true;
            if (isGreekCharacter(card.value) && isGreekCharacter(this.playedCard.value))
            return false;
        }

        moveToPlayedCard(card) {
            const playedCardDiv = document.getElementById('played-card');
            playedCardDiv.className = 'card played-card'; // Reset the class to remove any old styling
            playedCardDiv.style.backgroundColor = card.color; // Apply the card's color
            playedCardDiv.textContent = `${card.value}`;
        }
    }

    const playerHand = new PlayerHand();

    document.getElementById('draw-button').addEventListener('click', () => {
        playerHand.draw(1); // Draw one card each time
    });

    document.getElementById('play-button').addEventListener('click', () => {
        if (playerHand.cards.length > 0) {
            playerHand.cards.shift();
            playerHand.displayHand();
        }
    });

    playerHand.moveToPlayedCard(playerHand.playedCard)

    // Initial draw
    playerHand.draw(7); // Draw initial hand of 7 cards
    let auto = false
    setInterval(() => {
        if (auto) {
            let cardPlayed = false; // Flag to track if any card was played
        
            for (let idx = 0; idx < playerHand.cards.length; idx++) {
                const card = playerHand.cards[idx];
                if (playerHand.canPlayCard(card)) {
                    playerHand.playCard(idx);
                    cardPlayed = true; // Set flag to true when a card is played
                    break; // Exit loop once a card is played
                }
            }
        
            if (!cardPlayed) {
                // No card was played, so draw a card
                playerHand.draw(1);
            }
        }        
    }, 1000);
});
