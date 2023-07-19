const smtInputComponent = {
    a: 'b', // Remove after adding another property (otherwise _focus won't work)
    _focus: {
        borderColor: {
            default: 'theme.500',
            _dark: 'theme.600'
        }
    }
}

export default smtInputComponent;