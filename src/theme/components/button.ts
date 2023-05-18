const themeButtonComponent = {
    variants: {
        'ghost-hover': {
            bgColor: 'transparent',
            opacity: 0.7,
            _hover: {
                bgColor: 'components.button.ghost.hover.bgColor',
                opacity: 1,
            },
            _focus: {
                bgColor: 'components.button.ghost.hover.bgColor',
                opacity: 1,
            },
        },
    },
};

export default themeButtonComponent;