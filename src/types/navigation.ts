export type NavMenuItem = {
  name: string;
  href: string;
  isExternal?: boolean;
  isActive?: boolean;
  hasActiveChild?: boolean;
  children?: NavMenuItem[];
  isSection?: boolean;
};

export type NavMenuSection = {
  name?: string;
  items: NavMenuItem[];
};

// TODO: This can be removed once the real navigation is in place
export type LinkData = {
  name: string;
  href: string;
  isActive?: boolean;
};

export type TableOfContentItem = {
  id: string;
  level: number;
  text: string;
};
