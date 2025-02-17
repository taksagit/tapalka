// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем приложение

// Загрузка количества аркоинов из localStorage
let score = parseFloat(localStorage.getItem('arc_coins')) || 0;
document.getElementById('score').textContent = score.toFixed(2);

// Обработчик клика по герою
document.getElementById('hero').addEventListener('click', function () {
    score += 0.01;
    document.getElementById('score').textContent = score.toFixed(2);
    localStorage.setItem('arc_coins', score.toFixed(2));
});
