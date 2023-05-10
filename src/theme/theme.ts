import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { accordionTheme } from "./components/accordion";


const theme: ThemeConfig = extendTheme({
    initialColorMode: 'light',
    useSystemColorMode: false, //TODO: Implement system color mode
    semanticTokens: {
        colors: {
            text: {
                default: 'gray.800',
                _dark: 'gray.100',
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
                        }
                    }
                }
            },
            leftNav: {
                accordion: {
                    activeItem: {
                        bgColor: {
                            default: 'blue.100',
                            _dark: 'blue.900',
                        },
                        hoverBgColor: {
                            default: 'blue.100',
                            _dark: 'blue.700',
                        },
                        button: {
                            icon: {
                                hoverContainerBgColor: {
                                    default: 'gray.100',
                                    _dark: 'blue.800',
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
                                    default: 'gray.100',
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
                        _dark: 'gray.500',
                    }
                },
                inactive: {
                    hover: {
                        color: {
                            default: 'gray.900',
                            _dark: 'gray.100',
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
                            default: 'blue.500',
                            _dark: 'blue.300',
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