import { ComponentStyleConfig } from '@chakra-ui/react';
import themeAccordionComponent from './components/accordion';
import themeAlertComponent from './components/alert';
import themeAvatarComponent from './components/avatar';
import themeButtonComponent from './components/button';
import themeCheckboxComponent from './components/checkbox';
import themeInputComponent from './components/input';
import themeLinkComponent from './components/link';
import themeMenuComponent from './components/menu';
import themeTooltipComponent from './components/tooltip';

const themeComponents: { [key: string]: ComponentStyleConfig } = {
  Accordion: themeAccordionComponent,
  Link: themeLinkComponent,
  Button: themeButtonComponent,
  Menu: themeMenuComponent,
  Alert: themeAlertComponent,
  Checkbox: themeCheckboxComponent,
  Avatar: themeAvatarComponent,
  Input: themeInputComponent,
  Tooltip: themeTooltipComponent,
};

export default themeComponents;