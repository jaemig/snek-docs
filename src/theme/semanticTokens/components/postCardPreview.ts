const smtPostCardPreviewComponent = {
    date: {
        color: {
            default: 'gray.400',
            _dark: 'gray.400',
        },
    },
    rating: {
        // active means the user has rated (favorized) the post
        active: {
            color: {
                default: 'flat.sunflower',
                _dark: 'yellow.600',
            },
        },
        disabled: {
            color: {
                default: 'gray.400',
                _dark: 'gray.400',
            },
        },
        color: {
            default: 'gray.400',
            _dark: 'gray.500',
        },
        _hover: {
            color: {
                default: 'flat.sunflower',
                _dark: 'yellow.500',
            },
        },
    },
};

export default smtPostCardPreviewComponent;