export interface Message {
    id: string;
    from: string;
    to: string;
    content: string;
    timestamp: Date;
}

export interface Command {
    name: string;
    description: string;
    execute: (args: string[]) => Promise<string>;
}