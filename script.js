window.onload = function() {
    displayMessage("Welcome! How can I assist you today?", 'bot');
};

document.getElementById('send-btn').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        displayMessage(userInput, 'user');
        getBotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
}

function displayMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add(type === 'user' ? 'user-message' : 'bot-message');
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userInput) {
    displayMessage('Typing...', 'bot');
    
    const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer UErJk0iE5zwqEVbhueULF5Qdfaeu9VQB` 
        },
        body: JSON.stringify({
            model: "meta-llama/Meta-Llama-3.1-70B-Instruct", 
            messages: [{ role: "user", content: userInput }]
        })
    });

    if (!response.ok) {
        displayMessage('Error: Unable to get a response from the bot.', 'bot');
        return;
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    
    const typingMessage = document.querySelector('.bot-message:last-child');
    if (typingMessage) {
        typingMessage.remove();
    }

    displayMessage(botMessage, 'bot');
}
