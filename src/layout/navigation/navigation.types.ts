export type NavMenuItem = {
    name: string;
    href: string;
    isExternal?: boolean;
    isActive?: boolean;
    children?: NavMenuItem[];
    isSection?: boolean;
}

export type NavMenuSection = {
    name?: string;
    items: NavMenuItem[];
}

export type LinkData = {
    name: string;
    href: string;
    isActive?: boolean;
}