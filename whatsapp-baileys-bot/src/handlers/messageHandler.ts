export const handleMessage = (message: any) => {
    const { body, from } = message;

    if (!body) return;

    // Example command handling
    if (body.toLowerCase() === 'ping') {
        return {
            to: from,
            body: 'pong'
        };
    }

    // Add more command handling logic here as needed
};