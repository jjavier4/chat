import React from 'react'

export default function AvatarPanelSelector({ onClose, onSelectAvatar, currentAvatarId }) {
    const listAvatares = () => {
        const avatars = [];
        for (let index = 0; index < 10; index++) {
            const avatarId = `ref${index + 1}`;
            avatars.push({
                id: avatarId,
                name: `Avatar ${index + 1}`,
                image: `/avatars/images/${avatarId}.webp`
            });
        }
        return avatars;
    };
    return (
        <div className="fixed bottom-20 right-4 bg-white p-4 rounded-lg shadow-lg z-[1001] border border-gray-300">
            <button
                onClick={onClose}
                className="bg-red-500 text-white w-[30px] h-[30px] absolute top-[-10px] right-[-5px] border-0 rounded-full cursor-pointer"
                aria-label="Cerrar selector de avatares"
            >
                X
            </button>
            <h3 className="text-lg font-semibold mb-3">Selecciona tu avatar</h3>
            {listAvatares().map((avatar) => (
                <button
                    key={avatar.id}
                    onClick={() => onSelectAvatar(avatar)}
                    className={`p-1 rounded-full ${currentAvatarId === avatar.id ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'}`}
                    aria-label={`Seleccionar avatar ${avatar.name}`}
                >
                    <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </button>
            ))}
        </div>
    );
}
