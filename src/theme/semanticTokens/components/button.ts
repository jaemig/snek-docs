const smtButtonComponent = {
  ghost: {
    hover: {
      outline: {
        color: {
          default: 'theme.500',
          _dark: 'theme.500'
        },
      },
      bgColor: {
        default: 'gray.100',
        _dark: 'whiteAlpha.700'
      }
    }
  },
  outline: {
    color: {
      default: 'theme.500',
      _dark: 'theme.500'
    },
    borderColor: {
      default: 'theme.500',
      _dark: 'theme.800'
    },
    hover: {
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.800'
      },
      color: {
        default: 'white',
        _dark: 'gray.200'
      },
      bgColor: {
        default: 'theme.500',
        _dark: 'theme.800'
      },
    },
  },
  ghostHoverOutline: {
    color: {
      default: 'gray.600',
      _dark: 'gray.600'
    },
    hover: {
      borderColor: {
        default: 'theme.500',
        _dark: 'theme.800'
      },
      color: {
        default: 'theme.500',
        _dark: 'theme.500'
      },
    },
  },
};

export default smtButtonComponent;
