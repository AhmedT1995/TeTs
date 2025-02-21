import { Client } from 'whatsapp-web.js';
import fs from 'fs';

const client = new Client();

let currentQuestionIndex = 0;
let scores = {};
const questions = [
    { image: 'https://i.postimg.cc/YqGjJ49Z/Whats-App-Image-2025-02-19-at-18-09-51-04b49def.jpg', answer: 'توجيه' }, // Toge
    { image: 'https://i.postimg.cc/t4FJ4LFz/Whats-App-Image-2025-02-19-at-18-09-51-06f9d754.jpg', answer: 'تشوسو' }, // Choso
    { image: 'https://i.postimg.cc/Zqcqrp7B/Whats-App-Image-2025-02-19-at-18-09-51-684a0ad4.jpg', answer: 'غابيمارو' }, // Gabimaru
    { image: 'https://i.postimg.cc/7LD6GmVr/Whats-App-Image-2025-02-19-at-18-09-51-f7c6f1e8.jpg', answer: 'توغا' }, // Toga
    { image: 'https://i.postimg.cc/C1rL2YVw/Whats-App-Image-2025-02-19-at-18-09-52-304455ba.jpg', answer: 'غوجو' }, // Gojo
    { image: 'https://i.postimg.cc/Tw33Q1Fk/Whats-App-Image-2025-02-19-at-18-09-52-47e40183.jpg', answer: 'كانيكي' }, // Kaneki
    { image: 'https://i.postimg.cc/X7RX3VBJ/Whats-App-Image-2025-02-19-at-18-09-52-4b3473dc.jpg', answer: 'ميتسوري' }, // Mitsuri
    { image: 'https://i.postimg.cc/Fzfs5q93/Whats-App-Image-2025-02-19-at-18-09-52-ffbe4f30.jpg', answer: 'باتشيرا' }, // Bachira
    { image: 'https://i.postimg.cc/prgV2ZT7/Whats-App-Image-2025-02-19-at-18-09-53-0de49ad9.jpg', answer: 'كيلوا' }, // Killua
    { image: 'https://i.postimg.cc/qBYvXkLL/Whats-App-Image-2025-02-19-at-18-09-53-4038b543.jpg', answer: 'شوتو' }, // Shoto
    { image: 'https://i.postimg.cc/15q5vL7Z/Whats-App-Image-2025-02-19-at-18-09-53-f63f248e.jpg', answer: 'ماكي' }, // Maki
    { image: 'https://i.postimg.cc/NjvGSpZ2/Whats-App-Image-2025-02-19-at-18-09-54-62cc8dee.jpg', answer: 'ميكاسا' }, // Mikasa
    { image: 'https://i.postimg.cc/kgNMmWd1/Whats-App-Image-2025-02-19-at-18-09-54-71ff97ca.jpg', answer: 'دابي' }, // Dabi
    { image: 'https://i.postimg.cc/63qBnS4g/Whats-App-Image-2025-02-19-at-18-09-54-a64c5f40.jpg', answer: 'يوجي' }, // Yuji
    { image: 'https://i.postimg.cc/k5fnV9GW/Whats-App-Image-2025-02-19-at-18-09-54-eb773713.jpg', answer: 'شينوبو' }, // Shinobu
    { image: 'https://i.postimg.cc/nrQZwDk1/Whats-App-Image-2025-02-19-at-18-09-55-082abd0e.jpg', answer: 'توكيتو' }, // Tokito
    { image: 'https://i.postimg.cc/V6hmRRj6/Whats-App-Image-2025-02-19-at-18-09-55-31b99eb7.jpg', answer: 'ما اعرفه' }, // Ma Aarfah (I don't know him) -  *Needs replacement*
    { image: 'https://i.postimg.cc/K4SFX8ph/Whats-App-Image-2025-02-19-at-18-09-55-b8924fe6.jpg', answer: 'شويو' }, // Shoyo
    { image: 'https://i.postimg.cc/DfWXKppx/Whats-App-Image-2025-02-19-at-18-09-56-5f25abbb.jpg', answer: 'انيا' }, // Anya
    { image: 'https://i.postimg.cc/bNkSZDhb/Whats-App-Image-2025-02-19-at-18-09-56-ac19fba6.jpg', answer: 'فريرين' }, // Frieren
    { image: 'https://i.postimg.cc/mZ0FZ30B/Whats-App-Image-2025-02-19-at-18-09-56-af654c6e.jpg', answer: 'توغي' }, // Toge
    { image: 'https://i.postimg.cc/RZm6KSSY/Whats-App-Image-2025-02-19-at-18-09-56-f45f1115.jpg', answer: 'تشينغ' }, // Cheng
    { image: 'https://i.postimg.cc/65rT9krf/Whats-App-Image-2025-02-19-at-18-09-57-2537286e.jpg', answer: 'شيغاراكي' }, // Shigaraki
    { image: 'https://i.postimg.cc/52mHmhj2/Whats-App-Image-2025-02-19-at-18-09-57-3d83b90e.jpg', answer: 'باكوغو' }, // Bakugo
    { image: 'https://i.postimg.cc/RF2qF9pX/Whats-App-Image-2025-02-19-at-18-09-57-86352d91.jpg', answer: 'اليا' }, // Alia - *Needs verification*
    { image: 'https://i.postimg.cc/XYnqXsxS/Whats-App-Image-2025-02-19-at-18-09-57-bbb34417.jpg', answer: 'اوبتو/توبي' }, // Obito/Tobi
    { image: 'https://i.postimg.cc/P5KxD1FL/Whats-App-Image-2025-02-19-at-18-09-58-76ef56a9.jpg', answer: 'ساكورا' }, // Sakura
    { image: 'https://i.postimg.cc/Jhnh5t9p/Whats-App-Image-2025-02-19-at-18-09-58-af7101b1.jpg', answer: 'سوكونا' }, // Sukuna
    { image: 'https://i.postimg.cc/qR6MWSBn/Whats-App-Image-2025-02-19-at-18-09-58-b9880533.jpg', answer: 'شوكو' }, // Shoko
    { image: 'https://i.postimg.cc/5ycNJgjr/Whats-App-Image-2025-02-19-at-18-09-58-f07f2c08.jpg', answer: 'غورين' }, // Guren
    { image: 'https://i.postimg.cc/j2zqSf7S/Whats-App-Image-2025-02-19-at-18-09-59-206dfc53.jpg', answer: 'ليبي' }, // Liebe
    { image: 'https://i.postimg.cc/mr5gXB4B/Whats-App-Image-2025-02-19-at-18-09-59-6f1374d2.jpg', answer: 'بان' }, // Ban
    { image: 'https://i.postimg.cc/mZMgwv5W/Whats-App-Image-2025-02-19-at-18-09-59-a6cec910.jpg', answer: 'سييل' }, // Ciel
    { image: 'https://i.postimg.cc/Kv2vs06k/Whats-App-Image-2025-02-19-at-18-10-00-ba64fb11.jpg', answer: 'تانجيرو' }, // Tanjiro
    { image: 'https://i.postimg.cc/X7k7MwW2/Whats-App-Image-2025-02-19-at-18-10-00-c4becce4.jpg', answer: 'هيناتا' }, // Hinata
    { image: 'https://i.postimg.cc/L844mn6m/Whats-App-Image-2025-02-19-at-18-10-00-c9a60d37.jpg', answer: 'غون' }, // Gon
    { image: 'https://i.postimg.cc/y8f1xskc/Whats-App-Image-2025-02-19-at-18-10-01-0a5529b5.jpg', answer: 'رانبو/رامبو' }, // Ranpo/Rampo
    { image: 'https://i.postimg.cc/N05grSHV/Whats-App-Image-2025-02-19-at-18-10-01-25318d5d.jpg', answer: 'شانكس' }, // Shanks
    { image: 'https://i.postimg.cc/HnCHRLhD/Whats-App-Image-2025-02-19-at-18-10-01-5422a63a.jpg', answer: 'نانامي' }, // Nanami
    { image: 'https://i.postimg.cc/hjmc2mM1/Whats-App-Image-2025-02-19-at-18-10-01-6b87e434.jpg', answer: 'ايس' }, // Ace
    { image: 'https://i.postimg.cc/SK3mLdLK/Whats-App-Image-2025-02-19-at-18-10-02-23e6a40e.jpg', answer: 'هوتارو' }, // Hotaru
    { image: 'https://i.postimg.cc/J0cmLWfy/Whats-App-Image-2025-02-19-at-18-10-02-69417b41.jpg', answer: 'دينجي' }, // Denji
    { image: 'https://i.postimg.cc/NG1QT1Kg/Whats-App-Image-2025-02-19-at-18-10-02-f19c255c.jpg', answer: 'ايرين' }, // Eren
    { image: 'https://i.postimg.cc/sDssJvW5/Whats-App-Image-2025-02-19-at-18-10-03-0ee0b1db.jpg', answer: 'غيو' }, // Giyu
    { image: 'https://i.postimg.cc/65cwbtVg/Whats-App-Image-2025-02-19-at-18-10-03-229a76b2.jpg', answer: 'ديكو' }, // Deku
    { image: 'https://i.postimg.cc/zGfN960B/Whats-App-Image-2025-02-19-at-18-10-03-229a76b2.jpg', answer: 'زورو' }, // Zoro
];

// Helper function to start the game
async function startGame(chat) {
    currentQuestionIndex = 0;
    scores = {}; // Reset scores
    await chat.sendMessage('Game started! Guess the character name for the following image:');
    await sendQuestion(chat);
}

// Helper function to end the game and show scores
async function endGame(chat) {
    await chat.sendMessage(`Game ended! Here are the scores:\n${getScores()}`);
}

// Helper function to send a question
async function sendQuestion(chat) {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        await chat.sendMessage(question.image);
    } else {
        await chat.sendMessage('No more questions! Type .سص to see your scores.');
    }
}

// Helper function to get the scores
function getScores() {
    return Object.entries(scores)
        .map(([user, score]) => `${user}: ${score} points`)
        .join('\n');
}


client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const senderId = msg.from;
    const messageBody = msg.body.trim(); //Important: Remove leading/trailing whitespace!

    // Command Handling
    switch (messageBody) {
        case '.مس': // Start Game (Existing command)
            await startGame(chat);
            break;
        case '.سص': // End Game and Show Scores (Existing command)
            await endGame(chat);
            break;
        case '.start': // Add a "start" command (New command)
            await startGame(chat); // You could have different behavior here if you wanted.
            break;
        case '.help':  //Example of a new command
             await chat.sendMessage("Available commands:\n.start - Starts the game\n.مس - Starts the game\n.سص - Ends the game and shows scores");
             break;
        default: //Game Logic or Unknown Command
            if (currentQuestionIndex < questions.length) {
                const currentQuestion = questions[currentQuestionIndex];
                if (msg.body.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                    if (!scores[senderId]) {
                        scores[senderId] = 0;
                    }
                    scores[senderId] += 1; // Increment score
                    await chat.sendMessage(`Correct! Next question:\n`);
                    currentQuestionIndex++;
                    await sendQuestion(chat);
                } //Implicit else: Incorrect answer, do nothing.  You could add a "try again" message here
            } // Implicit else: No game in progress, do nothing. You could add a "start a game" message here
            break; //Important to break after the default case.
    }
});

client.initialize();