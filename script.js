document.addEventListener('DOMContentLoaded', () => {
    const ratcoinButton = document.getElementById('get-ratcoin');
    const ratcoinAmount = document.getElementById('ratcoin-amount');
    const leaderboardBody = document.getElementById('leaderboard-body');
    const userToken = localStorage.getItem('userToken');
    const userRatcoin = JSON.parse(localStorage.getItem('userRatcoin')) || 0;

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [
        { user: 'User1', coin: 5000 },
        { user: 'User2', coin: 3000 },
        { user: 'User3', coin: 2000 },
    ];

    function updateLeaderboard() {
        leaderboard.sort((a, b) => b.coin - a.coin);
        leaderboardBody.innerHTML = leaderboard.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.user}</td>
                <td>${item.coin}</td>
            </tr>
        `).join('');
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleRatcoinButtonClick() {
        if (userToken) {
            alert('Вы уже получили RatCoin. Выполняйте задания для получения дополнительного RatCoin.');
            return;
        }
        
        const earnedCoins = getRandomInt(2000, 10000);
        ratcoinAmount.textContent = `Вы получили: ${earnedCoins} RatCoin`;
        localStorage.setItem('userRatcoin', JSON.stringify(earnedCoins));

        leaderboard.push({ user: 'NewUser', coin: earnedCoins });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();

        // Генерация токена для предотвращения повторного получения RatCoin
        localStorage.setItem('userToken', 'received');
    }

    ratcoinButton.addEventListener('click', handleRatcoinButtonClick);

    updateLeaderboard();
});
