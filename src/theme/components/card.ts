const themeCardComponent = {
  variants: {
    grayOutline: {
      container: {
        bgColor: 'gray.100',
        border: '1px solid',
        //TODO: This doesnt work without the !important (why?) - when defining the prop directly in the component it works (in the devtools its not striked through)
        borderColor: 'gray.200 !important',
        _hover: {
          borderColor: 'gray.300 !important',
          boxShadow: 'md'
        },
        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
      }
    }
  }
};

export default themeCardComponent;
