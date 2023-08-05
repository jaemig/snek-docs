const smtToastComponent = {
    status: {
        success: {
            color: {
                default: 'flat.se.green.500',
                _dark: 'flat.se.green.500',
            },
            bgColor: {
                default: 'linear-gradient(90deg, rgba(9,195,108,1) 0%, rgba(255,255,255,0) 25%)',
                _dark: 'linear-gradient(90deg, rgba(9,195,108,0.8) 0%, rgba(255,255,255,0) 40%)',
            },
        },
        error: {
            color: {
                default: 'red.500',
                _dark: 'red.500',
            },
            bgColor: {
                default: 'red.600',
                _dark: 'red.600',
            },
        },
        warning: {

        },
        info: {

        },
    },
};

export default smtToastComponent;