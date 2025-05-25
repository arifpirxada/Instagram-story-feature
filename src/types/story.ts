export type Story = {
    id: string;
    type: 'image' | 'video';
    file: string;
    user: string;
    profilePic: string;
};