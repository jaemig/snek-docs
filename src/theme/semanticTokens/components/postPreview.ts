const smtPostPreview = {
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
                default: 'yellow.400',
                _dark: 'yellow.600',
            },
        },
        color: {
            default: 'gray.400',
            _dark: 'gray.500',
        },
        _hover: {
            active: {
                color: {
                    default: 'yellow.500',
                    _dark: 'yellow.500',
                },
            },
        },
    },
};

export default smtPostPreview