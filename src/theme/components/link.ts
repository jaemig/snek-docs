const themeLinkComponent = {
  baseStyle: {
    _hover: {
      textDecoration: 'none'
    }
  },
  variants: {
    'hover-opacity': {
      opacity: 0.7,
      _hover: {
        opacity: 1
        // textDecoration: 'none',
      },
      transition: 'opacity 0.1s ease-in-out'
    },
    'right-bottom-nav': {
      display: 'block',
      width: '100%',
      opacity: 0.7,
      _hover: {
        opacity: 1
        // textDecoration: 'none',
      },
      transition: 'opacity 0.1s ease-in-out'
    }
  }
};

export default themeLinkComponent;
