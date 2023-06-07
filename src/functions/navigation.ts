import { IJaenPage } from '@snek-at/jaen';
import {
  NavMenuSection,
  NavMenuItem,
  MainBreadcrumbPart
} from '../types/navigation';

/**
 * Converts a page tree to a usable menu data structure.
 * @param pageTree  The page tree to convert
 * @returns  The converted menu data structure and an array of indices of expanded items
 */
export function convertPageTreeToMenu(pageTree: IJaenPage[]) {
  let expandedItemIdx = 0; // The next index of an possibly expanded item
  const result: { menu: NavMenuSection[]; expandedIdx: number[] } = {
    menu: [],
    expandedIdx: []
  };
  const pageMap: { [key: string]: IJaenPage } = {};
  pageTree.forEach(page => (pageMap[page.id] = page));

  const docs_page = pageTree.find(page => page.slug === 'docs');
  if (!docs_page) return result;
  const currentPath = window.location.pathname;

  // Recursively build a menu item from a page
  const buildMenuItem = (
    page_id: string,
    buildPath: string
  ): NavMenuItem | undefined => {
    const page = pageMap[page_id];
    if (!page) return undefined;

    const href = page.buildPath ?? buildPath + page.slug + '/';
    const children = page.children
      .map(({ id }) => buildMenuItem(id, href))
      .filter((item): item is NavMenuItem => !!item);

    // Check if any item in the current page or its children is active
    // If so, add the index of the current item to the expanded item index array
    // This is used to expand the correct items in the accordion when the page is loaded
    const hasActiveChild = children.some(
      child => child.isActive || child.hasActiveChild
    );
    if (children.length > 0) {
      if (hasActiveChild || currentPath === href)
        result.expandedIdx.push(expandedItemIdx);
      expandedItemIdx++;
    }

    return {
      href: currentPath === href ? '' : href,
      name: page.jaenPageMetadata.title ?? page.slug,
      children: children,
      isActive: currentPath === href,
      hasActiveChild: hasActiveChild
    };
  };

  const menuData: NavMenuSection[] = [
    {
      items: docs_page.children
        .map(({ id }) => buildMenuItem(id, docs_page.buildPath ?? '/'))
        .filter((item): item is NavMenuItem => !!item)
    }
  ];

  expandedItemIdx--; // Decrement the expanded item index to get correct the index

  return {
    menu: menuData,
    // Since the menu is built from the inside out, the first item is the last expanded item
    expandedIdx: result.expandedIdx.map(idx => expandedItemIdx - idx)
  };
}

export function buildActiveMenuItemIndexArray(sections: NavMenuSection[]) {
  let result: number[] = [];

  // Recursively build the breadcrumb parts by finding the active menu item and its parents
  const findActiveMenuItem = (menu: NavMenuItem): boolean => {
    if (menu.isActive || menu.hasActiveChild) {
      const activeChildIdx = menu.children?.findIndex(
        item => item.isActive || item.hasActiveChild
      );
      if (!activeChildIdx || activeChildIdx === -1 || !menu.children) return !!menu.isActive;
      result.push(activeChildIdx);
      return findActiveMenuItem(menu.children[activeChildIdx]);
    }
    return false;
  };

  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i].items.length; j++) {
      if (findActiveMenuItem(sections[i].items[j])) {
        result.push(j);
        return result;
      }
    }
    result = []; // Reset the result array if no active item was found in the current section
  }
  return result;
}

/**
 * Creates the breadcrumb parts for the current page
 * @param menu  The menu data structure
 * @returns  The breadcrumb parts for the current page
 */
export function createBreadCrumbParts(
  menu: NavMenuSection[]
): MainBreadcrumbPart[] {
  const parts: MainBreadcrumbPart[] = [];

  // Recursively build the breadcrumb parts by finding the active menu item and its parents
  const findActiveMenuItem = (menu: NavMenuItem): boolean => {
    if (menu.isActive || menu.hasActiveChild) {
      const activeChild = menu.children?.find(
        item => item.isActive || item.hasActiveChild
      );
      if (!activeChild) return !!menu.isActive;
      parts.push({
        name: activeChild.name,
        href: activeChild.href
      });
      return findActiveMenuItem(activeChild);
    }
    return false;
  };

  for (const section of menu) {
    for (const item of section.items) {
      // This adds the outest parent to the breadcrumb parts.
      // This is necessary because findActiveMenuItem only adds the active child item of each parent
      if (item.hasActiveChild || item.isActive)
        parts.push({
          name: item.name,
          href: item.href
        });
      if (findActiveMenuItem(item)) {
        parts[parts.length - 1].isActive = true;
        return parts;
      }
    }
  }
  // This should never happen because there must always be an active item,
  // but if it does, just return an empty array
  return parts;
}
