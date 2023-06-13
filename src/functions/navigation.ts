import { IJaenPage } from '@snek-at/jaen';
import {
  NavMenuSection,
  NavMenuItem,
  MainBreadcrumbPart,
  TAdjacentPages
} from '../types/navigation';
import { TMenuStructure } from '../types/menu';

/**
 * Converts a page tree to a usable menu data structure.
 * @param pageTree  The page tree to convert
 * @returns  The converted menu data structure and an array of indices of expanded items
 */
export function convertPageTreeToMenu(pageTree: IJaenPage[]) {
  let expandedItemIdx = 0; // The next index of an possibly expanded item
  const result: TMenuStructure = {
    menu: [],
    activeIdx: []
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
      .filter(child => !child.deleted)
      .map(({ id }) => buildMenuItem(id, href))
      .filter((item): item is NavMenuItem => !!item);

    // Check if any item in the current page or its children is active
    // If so, add the index of the current item to the expanded item index array
    // This is used to expand the correct items in the accordion when the page is loaded
    const hasActiveChild =
      children.length > 0 &&
      children.some(child => child.isActive || child.hasActiveChild);

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
        .filter(child => !child.deleted)
        .map(({ id }) => buildMenuItem(id, docs_page.buildPath ?? '/'))
        .filter((item): item is NavMenuItem => !!item)
    }
  ];

  expandedItemIdx--; // Decrement the expanded item index to get correct the index
  return {
    menu: menuData,
    // Since the menu is built from the inside out, the first item is the last expanded item
    // expandedIdx: result.expandedIdx.map(idx => expandedItemIdx - idx).reverse()
    activeIdx: buildActiveMenuItemIndexArray(menuData)
  };
}

/**
 *  Builds an flat array of indices of the active menu item and its parents (outer to inner, left to right)
 * @param sections  The menu data structure
 * @returns The array of indices representing the way to the active menu item
 */
export function buildActiveMenuItemIndexArray(
  sections: NavMenuSection[]
): number[] {
  let result: number[] = [];

  // Recursively build a flat array of indices of the active menu item and its parents (outer to inner, left to right)
  const findActiveMenuItem = (menu: NavMenuItem): boolean => {
    if (menu.isActive || menu.hasActiveChild) {
      const activeChildIdx = menu.children?.findIndex(
        item => item.isActive || item.hasActiveChild
      );
      if (
        activeChildIdx === undefined ||
        activeChildIdx === -1 ||
        !menu.children
      )
        return !!menu.isActive;
      result.push(activeChildIdx);
      return findActiveMenuItem(menu.children[activeChildIdx]);
    }
    return false;
  };

  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i].items.length; j++) {
      if (findActiveMenuItem(sections[i].items[j])) {
        // Add the index of the current section and its outermost active item to the result array
        // This is necessary because the outermost menu item is not added to the result array by the function above
        result.unshift(i, j);
        return result;
      }
    }
    result = []; // Reset the result array if no active item was found in the current section
  }
  return result;
}

/**
 * Creates the breadcrumb parts for the current page
 * @param data  The menu data structure
 * @param activeIdxArray  The array of indices of the active menu item and its parents
 * @returns  The breadcrumb parts for the current page
 */
export function createBreadCrumbParts(
  data: TMenuStructure
): MainBreadcrumbPart[] {
  const parts: MainBreadcrumbPart[] = [];

  // Recursively build the breadcrumb parts by traversing the menu data structure
  const buildBreadcrumbPart = (menuItem: NavMenuItem, idx: number): boolean => {
    const child = menuItem.children?.[data.activeIdx[idx]];
    if (!child) return false;
    parts.push({
      name: child.name,
      href: child.href
    });

    if (!child.hasActiveChild && !child.isActive) return !!child.isActive;
    return buildBreadcrumbPart(child, idx + 1);
  };

  if (data.activeIdx.length < data.activeIdx[0]) return parts;
  const activeSection = data.menu[data.activeIdx[0]];
  if (activeSection.items.length < data.activeIdx[1]) return parts;
  const activeItem = activeSection.items[data.activeIdx[1]];
  // Add the first breadcrumb part
  // This is necessary because the first breadcrumb part is not added to the result array by the function above
  parts.push({
    name: activeItem.name,
    href: activeItem.href
  });

  buildBreadcrumbPart(activeItem, 2);
  return parts;
}

/**
 * Gets the names of the pages adjacent to the current page
 * @param idxArray  The array of indices of the active menu item and its parents
 * @returns  The data of the pages adjacent to the current page
 */
export function getAdjacentPages(idxArray: number[], menu: NavMenuSection[]): TAdjacentPages {
  const result: TAdjacentPages = {};

  const getAdjacentPage = (menuItem: NavMenuItem, idx: number, parentMenuItem: NavMenuItem) => {
    //* posIdx is undefined for the last recursive call
    const posIdx = idxArray[idx];
    const activeChild = menuItem.children?.[posIdx];
    if (activeChild) getAdjacentPage(activeChild, idx + 1, menuItem);

    if (!result.prev) {
      let prev;
      if (posIdx > 0) {
        prev = menuItem.children?.[posIdx - 1];
      } else {
        // If the current item is already the most outer item, get the previous item via the section
        if (posIdx === undefined && parentMenuItem.children && idxArray[idxArray.length - 1] > 0) {
          // If there's a previous sibling of the item, get the most inner child of that sibling
          const prevSibling = parentMenuItem.children[idxArray[idxArray.length - 1] - 1];
          let lastChild = prevSibling.children?.[prevSibling.children.length - 1];
          while (lastChild && lastChild.children && lastChild.children.length > 0) {
            lastChild = lastChild.children?.[lastChild.children.length - 1];
          }
          prev = lastChild;
        } else if (idx > 2) {
          // If the current item is the first child of the parent item, just get the parent item
          // (We check for idx > 2 because the the first idx's parent is always a section)
          prev = parentMenuItem;
        }
      }
      if (prev) {
        result.prev = {
          name: prev.name,
          href: prev.href
        };
      }
    }
    if (!result.next) {
      if (posIdx === undefined && menuItem.children && menuItem.children.length > 0) {
        // If the current item has children, get the first child (most inner item only)
        const firstChild = menuItem.children[0];
        result.next = {
          name: firstChild.name,
          href: firstChild.href
        };
      } else if (parentMenuItem.children) {
        // If the parent item has a next sibling, get that sibling
        const parentPosIdx = Math.max(0, idxArray[idx - 1]);
        if (parentPosIdx < parentMenuItem.children.length - 1) {
          const next = parentMenuItem.children[parentPosIdx + 1];
          if (next) {
            result.next = {
              name: next.name,
              href: next.href
            };
          }
        }
      }
    }
  }

  // We box the section in an MenuItem object so we can feed the recursive function with it
  const boxedSection = {
    href: '',
    name: menu[idxArray[0]].name ?? '',
    children: menu[idxArray[0]].items
  }

  getAdjacentPage(menu[idxArray[0]].items[idxArray[1]], 2, boxedSection);

  return result;
}