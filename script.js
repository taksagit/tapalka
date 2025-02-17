// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем приложение

// Загрузка количества аркоинов из localStorage
let score = localStorage.getItem('arc_coins') || 0;
document.getElementById('score').textContent = score;

// Обработчик клика по герою
document.getElementById('hero').addEventListener('click', function () {
    score++;
    document.getElementById('score').textContent = score;
    localStorage.setItem('arc_coins', score);
});