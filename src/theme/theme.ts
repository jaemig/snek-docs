import { extendTheme, StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const theme: ThemeConfig = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false, //TODO: Implement system color mode
    semanticTokens: {
        colors: {
            text: {
                default: 'gray.800',
                _dark: 'gray.400',
            },
            topNav: {
                bgColor: {
                    default: 'rgba(255, 255, 255, 0.8)',
                    _dark: 'gray.800',
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
            },
            breadcrumb: {
                active: {
                    color: {
                        default: 'gray.600',
                        _dark: 'gray.400',
                    }
                },
                inactive: {
                    hover: {
                        color: {
                            default: 'gray.900',
                            _dark: 'gray.500',
                        }
                    }
                },
            },
            main: {

            },
            rightNav: {
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
                            _dark: 'gray.100',
                        },
                    },
                },
            },
        },
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            text: {
                color: mode('gray.800', 'red.100')(props),
            },
            body: {
                color: mode('gray.800', 'red.100')(props),
                bg: mode('gray.100', 'gray.900')(props),
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
                    }
                }
            }
        }
    }
})

export default theme;