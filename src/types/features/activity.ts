import { ReactNode } from "react";
import { TLinkData, TTopNavLinkData } from "../navigation";

export type TActivityType = 'published' | 'commented' | 'rated';

export type TActivitySection = {
    timestamp: string;
    activities: TActivity[];
}

export type TActivity = {
    id: string;
    title: Omit<TLinkData, 'isActive'>;
    timestamp: string;
    type: TActivityType;
}