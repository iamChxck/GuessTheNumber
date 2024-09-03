import React, { useState } from 'react';

interface NameInputPageProps {
    onNameSubmit: (name: string) => void;
}

const NameInputPage: React.FC<NameInputPageProps> = ({ onNameSubmit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <label htmlFor="name" className="block text-white text-xl mb-2">
                    Enter your name:
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
                <button
                    type="submit"
                    className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg"
                >
                    Start Game
                </button>
            </form>
        </div>
    );
};

export default NameInputPage;
