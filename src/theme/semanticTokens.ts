const themeSemanticTokens = {
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
            drawer: {
                bgColor: {
                    default: 'white',
                    _dark: 'gray.700',
                },
            },
            menu: {
                item: {
                    focus: {
                        bgColor: {
                            default: 'theme.100',
                            _dark: 'theme.900',
                        },
                        headingColor: {
                            default: 'theme.600',
                            _dark: 'theme.600',
                        },
                    },
                },
                groupTitle: {
                    color: {
                        default: 'gray.500',
                        _dark: 'gray.400',
                    },
                },
                noResults: {
                    color: {
                        default: 'gray.500',
                        _dark: 'gray.400',
                    },
                },
            },
            codeSnippet: {
                header: {
                    bgColor: {
                        default: 'gray.100',
                        _dark: '#011a2f',
                    }
                },
                body: {
                    bgColor: {
                        default: 'gray.50',
                        _dark: '#011627',
                    }
                },
                borderColor: {
                    default: 'gray.200',
                    _dark: 'rgba(45, 55, 72, 0.75)',
                }                 
            },
            filesystem: {
                selected: {
                    color: {
                        default: {
                            default: 'theme.800',
                            _dark: 'theme.300',
                        },
                        lowContrast: {
                            default: 'theme.600',
                            _dark: 'theme.400',
                        },
                    },
                },
                color: {
                    default: {
                        default: 'gray.800',
                        _dark: 'gray.300',
                    },
                    lowContrast: {
                        default: 'gray.400',
                        _dark: 'gray.600',
                    },
                },
                icon: {
                    color: {
                        default: {
                            default: 'gray.700',
                            _dark: 'gray.400',
                        },
                        lowContrast: {
                            default: 'gray.500',
                            _dark: 'gray.500',
                        },
                    },
                },
                borderColor: {
                    default: 'gray.200',
                    _dark: 'gray.700',
                },
                tooltip: {
                    bgColor: {
                        default: 'theme.700',
                        _dark: 'theme.800',
                    },
                    color: {
                        default: 'white',
                        _dark: 'gray.200',
                    },
                }
            },
        },
        shared: {
            translucent: {
                bgColor: {
                    default: 'rgba(255, 255, 255, 0.8)',
                    _dark: 'rgba(26, 32, 44, 0.8)',
                },
            },
            text: {
                default: {
                    default: 'gray.800',
                    _dark: 'gray.400',
                },
                bright: {
                    default: 'gray.600',
                    _dark: 'gray.300',
                },
            },
            body: {
                default: 'white',
                _dark: 'gray.800',
            }
        },
        separator: {
            borderColor: {
                default: 'gray.100',
                _dark: 'gray.700',
            },
        },
        topNav: {
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
            },
        },
        rightNav: {
            titleTop: {
                color: {
                    default: 'gray.800',
                    _dark: 'gray.200',
                },
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
            },
        },
    },
};

export default themeSemanticTokens;