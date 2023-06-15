import { createContext, useContext } from 'react';
import { TMenuStructure } from '../types/menu';

export type TMenuContext = {
  menuStructure: TMenuStructure;
  setMenuStructure: (menuStructure: TMenuStructure) => void;
};

/**
 * The menu context representing the menu structure.
 */
export const MenuContext = createContext<TMenuContext>({
  menuStructure: { menu: [], activeIdx: [] },
  setMenuStructure: () => {}
});

// export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [menuStructure, setMenuStructure] = useState<TMenuStructure>({
//     menu: [],
//     expandedIdx: []
//   });

//   return (
//     <MenuContext.Provider value={{ menuStructure, setMenuStructure }}>
//       {children}
//     </MenuContext.Provider>
//   );
// };

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (context === undefined)
    throw new Error('useMenuContext must be used within a MenuProvider');

  return context;
};
