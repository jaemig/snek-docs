export type TActivityType = 'published' | 'commented' | 'rated';

export type TActivitySection = {
    title: string;
    activities: TActivity[];
}

export type TActivity = {
    id: string;
    title: string;
    timestamp: string;
    type: TActivityType;
}