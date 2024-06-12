"use client"
import React, { useEffect, useState } from 'react';
import { socket } from '../utils/socket';

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <header className="flex flex-col items-center w-full max-w-md mx-auto pt-4">
                <h1 className="text-2xl mb-4">Socket.io with Next</h1>
            </header>
            <div className="flex flex-col justify-end flex-1 w-full max-w-md mx-auto bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4">
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index} className="mb-2 p-2 bg-gray-700 rounded">
                                {msg}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex p-4 bg-gray-700">
                    <input
                        type="text"
                        className="flex-1 p-2 text-black rounded mr-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                        onClick={sendMessage} 
                        className="p-2 bg-blue-500 hover:bg-blue-400 rounded text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
