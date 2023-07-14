const smtUserActivityComponent = {
    item: {
        title: {
            a: 'b', // Just a filler because chakra doesnt recognize semantic token objects with properties that start with an underscore and are the only property in the object
            _hover: {
                color: {
                    default: 'theme.500',
                    _dark: 'theme.300'
                },
            }
        },
    },
}

export default smtUserActivityComponent;