import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys);

//TODO: This is not working yet - need to figure out how to get the border to show up
const leftNavAccordion = definePartsStyle({
    panel:  {
        border :'5px solid',
        borderColor: 'red.200',
    }
})

export const accordionTheme = defineMultiStyleConfig({
    variants: { leftNavAccordion }
});
