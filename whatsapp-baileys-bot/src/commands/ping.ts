export const handlePing = async (message) => {
    const response = 'pong';
    await message.reply(response);
};