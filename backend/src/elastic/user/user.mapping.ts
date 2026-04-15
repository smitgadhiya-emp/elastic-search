export const userIndex = 'users';

export const userMapping = {
    properties: {
        name: { type: 'text' },
        email: { type: 'text' },
        phone: { type: 'text' },
        state: { type: 'keyword' },
        city: { type: 'keyword' },
        bio: { type: 'text' },
        avatar: { type: 'keyword' },
        createdAt: { type: 'date' },
        updatedAt: { type: 'date' },
    }
}