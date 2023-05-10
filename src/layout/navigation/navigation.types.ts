export type NavMenuItem = {
    name: string;
    href: string;
    isExternal?: boolean;
    children?: NavMenuItem[];
    isActive?: boolean;
}

export type NavMenuSection = {
    name?: string;
    items: NavMenuItem[];
}