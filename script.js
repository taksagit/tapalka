require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB подключен"))
    .catch(err => console.log(err));

// Модель пользователя
const UserSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    score: Number
});

const User = mongoose.model("User", UserSchema);

// Получение счета пользователя
app.get('/api/user/:userId', async (req, res) => {
    let user = await User.findOne({ userId: req.params.userId });
    if (!user) {
        user = await User.create({ userId: req.params.userId, name: "Аноним", score: 0 });
    }
    res.json(user);
});

// Обновление счета при клике
app.post('/api/click', async (req, res) => {
    let { userId, userName } = req.body;
    let user = await User.findOne({ userId });

    if (!user) {
        user = await User.create({ userId, name: userName, score: 0 });
    }

    user.score += 0.01;
    await user.save();

    res.json(user);
});

// Получение таблицы лидеров
app.get('/api/leaderboard', async (req, res) => {
    let topUsers = await User.find().sort({ score: -1 }).limit(10);
    res.json(topUsers);
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
