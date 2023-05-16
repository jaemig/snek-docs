import { extendTheme, StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const theme: ThemeConfig = extendTheme({
    initialColorMode: 'system',
    useSystemColorMode: true, //? This doesnt sync with the system color mode
    semanticTokens: {
        colors: {
            components: {
                button: {
                    ghost: {
                        hover: {
                            bgColor: {
                                default: 'gray.100',
                                _dark: 'whiteAlpha.200',
                            },
                        },
                    },
                },
            },
            body: {
                default: 'white',
                _dark: 'gray.800',
            },
            drawer: {
                bgColor: {
                    default: 'white',
                    _dark: 'gray.700',
                },
            },
            text: {
                default: 'gray.800',
                _dark: 'gray.400',
            },
            separator: {
                borderColor: {
                    default: 'gray.100',
                    _dark: 'gray.700',
                },  
            },
            topNav: {
                bgColor: {
                    default: 'rgba(255, 255, 255, 0.8)',
                    _dark: 'rgba(26, 32, 44, 0.8)',
                },
                borderColor: {
                    default: 'rgb(229, 231, 235)',
                    _dark: 'gray.700',
                },
                GitHubFill: {
                    default: 'black',
                    _dark: 'white',
                },
                input: {
                    focus: {
                        bgColor: {
                            default: 'white',
                            _dark: 'gray.900',
                        },
                        //? This doesnt work with focusBorderColor for some reason
                        borderColor: {
                            default: 'red.500',
                            _dark: 'red.500',
                        }
                    }
                },
                mobile: {
                    hamburger: {
                        bgColor: {
                            default: 'gray.800',
                            _dark: 'gray.200',
                        },
                    },
                    menu: {
                        sectionIconColor: {
                            default: 'gray.400',
                            _dark: 'gray.600',
                        },
                    },
                }
            },
            leftNav: {
                accordion: {
                    activeItem: {
                        bgColor: {
                            default: 'theme.100',
                            _dark: 'theme.900',
                        },
                        hoverBgColor: {
                            default: 'theme.100',
                            _dark: 'theme.700',
                        },
                        button: {
                            icon: {
                                hoverContainerBgColor: {
                                    default: 'theme.200',
                                    _dark: 'theme.800',
                                }
                            },
                            text: {
                                color: {
                                    default: 'theme.800',
                                    _dark: 'theme.200',
                                }
                            }
                        }
                    },
                    inactiveItem: {
                        hoverBgColor: {
                            default: 'gray.100',
                            _dark: 'gray.700',
                        },
                        button: {
                            icon: {
                                hoverContainerBgColor: {
                                    default: 'gray.200',
                                    _dark: 'gray.600',
                                }
                            }
                        }
                    },
                    panel: {
                        borderLeftColor: {
                            default: 'gray.200',
                            _dark: 'gray.700',
                        }
                    }
                },
                bottomNav: {
                    menu: {
                        item: {
                            active: {
                                bgColor: {
                                    default: 'theme.100',
                                    _dark: 'theme.900',
                                },
                                textColor: {
                                    default: 'theme.800',
                                    _dark: 'theme.200',
                                }
                            }
                        }
                    }
                }
            },
            main: {
                breadcrumb: {
                    active: {
                        color: {
                            default: 'gray.800',
                            _dark: 'gray.400',
                        }
                    },
                    inactive: {
                        color: {
                            default: 'gray.400',
                            _dark: 'gray.600',
                        },
                        hover: {
                            color: {
                                default: 'gray.900',
                                _dark: 'gray.400',
                            }
                        }
                    },
                },
                bottomNav: {
                    linkHoverColor: {
                        default: 'theme.800',
                        _dark: 'theme.300',
                    }
                }
            },
            rightNav: {
                titleTop: {
                    color: {
                        default: 'gray.800',
                        _dark: 'gray.200',
                    }
                },
                link: {
                    active: {
                        color: {
                            default: 'theme.800',
                            _dark: 'theme.300',
                        },
                    },
                    inactive: {
                        color: {
                            default: 'gray.800',
                            _dark: 'gray.400',
                        },
                    },
                },
            },
            footer: {
                bgColor: {
                    default: 'gray.100',
                    _dark: '#1B222E',
                },
                textColor: {
                    default: 'gray.800',
                    _dark: 'gray.400',
                }
            }
        },
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            text: {
                color: mode('gray.800', 'gray.100')(props),
            },
            body: {
                color: mode('gray.800', 'gray.500')(props),
                // bg: mode('gray.100', 'gray.900')(props),
            },
        }),
    },
    colors: {
        theme: {
            brand: '#00A9CE',
            100: '#e5faff',
            200: '#b3f1ff',
            300: '#80e8ff',
            400: '#4ddfff',
            500: '#1ad6ff',
            600: '#00bce6',
            700: '#0092b3',
            800: '#006980',
            900: '#003f4d',
        },
    },
    components: {
        // TODO: Figure out how to get this to work
        // Accordion: accordionTheme,
        Accordion: {
            variants: {
                leftNav: {
                    root: {
                        fontSize: 'sm',
                    },
                    container: {
                        borderWidth: 0,
                    },
                    button: {
                        textAlign: 'left',
                        fontSize: 'sm',
                        // textDecoration: 'none',
                    },
                    panel: {
                        paddingTop: 0,
                        paddingRight: 0,
                        fontSize: 'sm',
                    }
                }
            }
        },
        Link: {
            baseStyle: {
                _hover: {
                    textDecoration: 'none',
                },
            },
            variants: {
                'hover-opacity': {
                    opacity: 0.7,
                    _hover: {
                        opacity: 1,
                        // textDecoration: 'none',
                    },
                    transition: 'opacity 0.1s ease-in-out',
                },
                'right-bottom-nav': {
                    display: 'block',
                    width: '100%',
                    opacity: 0.7,
                    _hover: {
                        opacity: 1,
                        // textDecoration: 'none',
                    },
                    transition: 'opacity 0.1s ease-in-out',
                }
            }
        },
        Button: {
            variants: {
                'ghost-hover': {
                    bgColor: 'transparent',
                    opacity: 0.7,
                    _hover: {
                        bgColor: 'components.button.ghost.hover.bgColor',
                        opacity: 1,
                    },
                    _focus:  {
                        bgColor: 'components.button.ghost.hover.bgColor',
                        opacity: 1,
                    },
                },
            },
        },
        Menu: {
            variants: {
                'brand-hover': {
                    item: {
                        _hover: {
                            bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
                            color: 'leftNav.bottomNav.menu.item.active.textColor',
                        },
                        _focus:  {
                            bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
                            color: 'leftNav.bottomNav.menu.item.active.textColor',
                        },
                        transition: 'background-color 0.1s ease-in-out, color 0.1s ease-in-out',
                    },
                },
            },
        },
    },
})

export default theme;