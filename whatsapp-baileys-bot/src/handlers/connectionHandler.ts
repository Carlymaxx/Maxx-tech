export function handleConnection(connectionState: string) {
    switch (connectionState) {
        case 'open':
            console.log('Connection established.');
            break;
        case 'close':
            console.log('Connection lost. Attempting to reconnect...');
            break;
        case 'pending':
            console.log('Connection is pending...');
            break;
        default:
            console.log('Unknown connection state:', connectionState);
    }
}