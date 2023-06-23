const themeSemanticTokens = {
  colors: {
    components: {
      separator: {
        borderColor: {
          default: 'gray.100',
          _dark: 'gray.700'
        }
      },
      button: {
        ghost: {
          hover: {
            bgColor: {
              default: 'gray.100',
              _dark: 'whiteAlpha.200'
            }
          }
        }
      },
      drawer: {
        bgColor: {
          default: 'white',
          _dark: 'gray.700'
        }
      },
      menu: {
        item: {
          focus: {
            bgColor: {
              default: 'theme.100',
              _dark: 'theme.900'
            },
            headingColor: {
              default: 'theme.600',
              _dark: 'theme.600'
            }
          },
          highlight: {
            default: 'theme.600',
            _dark: 'theme.600'
          },
        },
        groupTitle: {
          color: {
            default: 'gray.500',
            _dark: 'gray.400'
          }
        },
        noResults: {
          color: {
            default: 'gray.500',
            _dark: 'gray.400'
          }
        }
      },
      codeSnippet: {
        header: {
          bgColor: {
            default: 'gray.100',
            _dark: '#011a2f'
          }
        },
        body: {
          bgColor: {
            default: 'gray.50',
            _dark: '#011627'
          }
        },
        borderColor: {
          default: 'gray.200',
          _dark: 'rgba(45, 55, 72, 0.75)'
        }
      },
      filesystem: {
        selected: {
          color: {
            default: {
              default: 'theme.800',
              _dark: 'theme.300'
            },
            lowContrast: {
              default: 'theme.600',
              _dark: 'theme.400'
            }
          }
        },
        color: {
          default: {
            default: 'gray.800',
            _dark: 'gray.300'
          },
          lowContrast: {
            default: 'gray.400',
            _dark: 'gray.600'
          }
        },
        icon: {
          color: {
            default: {
              default: 'gray.700',
              _dark: 'gray.400'
            },
            lowContrast: {
              default: 'gray.500',
              _dark: 'gray.500'
            }
          }
        },
        borderColor: {
          default: 'gray.200',
          _dark: 'gray.700'
        },
        tooltip: {
          bgColor: {
            default: 'theme.700',
            _dark: 'theme.800'
          },
          color: {
            default: 'white',
            _dark: 'gray.200'
          }
        }
      },
      heading: {
        link: {
          color: {
            default: {
              default: 'gray.200',
              _dark: 'gray.700'
            },
            active: {
              default: 'gray.500',
              _dark: 'gray.400'
            }
          }
        }
      },
      callout: {
        default: {
          container: {
            bgColor: {
              default: 'rgb(255, 247, 237)',
              _dark: 'rgba(251, 146, 60, 0.2)'
            },
            borderColor: {
              default: 'rgb(255, 237, 213)',
              _dark: 'rgba(251, 146, 60, 0.3)'
            },
            color: {
              default: 'rgb(154, 52, 18)',
              _dark: 'rgb(253, 186, 116)'
            },
          },
        },
        info: {
          container: {
            bgColor: {
              default: 'rgb(219, 234, 254)',
              _dark: 'rgba(30, 58, 138, 0.3)'
            },
            borderColor: {
              default: 'rgb(191, 219, 254)',
              _dark: 'rgb(191, 219, 254, 0.3)'
            },
            color: {
              default: 'rgb(30, 58, 138)',
              _dark: 'rgb(191, 219, 254)'
            },
          },
        },
        warning: {
          container: {
            bgColor: {
              default: 'rgb(254, 252, 232)',
              _dark: 'rgb(161, 98, 7, 0.3)'
            },
            borderColor: {
              default: 'rgb(254, 249, 195)',
              _dark: 'rgb(254, 240, 138, 0.3)'
            },
            color: {
              default: 'rgb(154, 52, 18)',
              _dark: 'rgb(254, 240, 138)'
            },
          },
        },
        error: {
          container: {
            bgColor: {
              default: 'rgb(254, 226, 226)',
              _dark: 'rgba(127, 29, 29, 0.3)'
            },
            borderColor: {
              default: 'rgb(254, 202, 202)',
              _dark: 'rgb(254, 200, 200, 0.3)'
            },
            color: {
              default: 'rgb(127, 29, 29)',
              _dark: 'rgb(254, 202, 202)'
            },
          },
        },
      },
      imageCard: {
        bgColor: {
          default: 'gray.100',
          _dark: 'gray.700'
        },
        borderColor: {
          default: 'gray.200',
          _dark: 'gray.600'
        },
        hover: {
          bgColor: {
            default: 'components.imageCard.bgColor',
            _dark: 'gray.600'
          },
          borderColor: {
            default: 'gray.300',
            _dark: 'gray.500'
          },
          boxShadow: {
            default: 'md',
            _dark: 'none'
          }
        }
      },
      iconCard: {
        color: {
          default: 'gray.600',
          _dark: 'gray.400'
        },
        bgColor: {
          default: 'transprent',
          _dark: 'gray.800'
        },
        borderColor: {
          default: 'gray.200',
          _dark: 'gray.700'
        },
        hover: {
          color: {
            default: 'gray.800',
            _dark: 'gray.300'
          },
          bgColor: {
            default: 'rgb(248, 250, 252)',
            _dark: 'gray.700'
          },
          borderColor: {
            default: 'gray.300',
            _dark: 'gray.600'
          },
        }
      }
    },
    shared: {
      translucent: {
        bgColor: {
          default: 'rgba(255, 255, 255, 0.5)',
          _dark: 'rgba(26, 32, 44, 0.5)'
        }
      },
      text: {
        default: {
          default: 'gray.800',
          _dark: 'gray.400'
        },
        bright: {
          default: 'gray.600',
          _dark: 'gray.300'
        }
      },
      body: {
        default: 'white',
        _dark: 'gray.800'
      },
      scrollbar: {
        thumb: {
          bgColor: {
            default: 'gray.300',
            _dark: 'gray.700'
          },
          hover: {
            bgColor: {
              default: 'gray.400',
              _dark: 'gray.600'
            }
          }
        }
      }
    },
    topNav: {
      borderColor: {
        default: 'rgb(229, 231, 235)',
        _dark: 'gray.700'
      },
      GitHubFill: {
        default: 'black',
        _dark: 'white'
      },
      input: {
        focus: {
          bgColor: {
            default: 'white',
            _dark: 'gray.900'
          },
          //? This doesnt work with focusBorderColor for some reason
          borderColor: {
            default: 'red.500',
            _dark: 'red.500'
          }
        }
      },
      mobile: {
        hamburger: {
          bgColor: {
            default: 'gray.800',
            _dark: 'gray.200'
          }
        },
        menu: {
          sectionIconColor: {
            default: 'gray.400',
            _dark: 'gray.600'
          }
        }
      }
    },
    leftNav: {
      accordion: {
        activeItem: {
          bgColor: {
            default: 'theme.100',
            _dark: 'theme.900'
          },
          hoverBgColor: {
            default: 'theme.100',
            _dark: 'theme.700'
          },
          button: {
            icon: {
              hoverContainerBgColor: {
                default: 'theme.200',
                _dark: 'theme.800'
              }
            },
            text: {
              color: {
                default: 'theme.800',
                _dark: 'theme.200'
              }
            }
          }
        },
        inactiveItem: {
          hoverBgColor: {
            default: 'gray.100',
            _dark: 'gray.700'
          },
          button: {
            icon: {
              hoverContainerBgColor: {
                default: 'gray.200',
                _dark: 'gray.600'
              }
            }
          }
        },
        panel: {
          borderLeftColor: {
            default: 'gray.200',
            _dark: 'gray.700'
          }
        }
      },
      bottomNav: {
        menu: {
          item: {
            active: {
              bgColor: {
                default: 'theme.100',
                _dark: 'theme.900'
              },
              textColor: {
                default: 'theme.800',
                _dark: 'theme.200'
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
            _dark: 'gray.400'
          }
        },
        inactive: {
          color: {
            default: 'gray.400',
            _dark: 'gray.600'
          },
          hover: {
            color: {
              default: 'gray.900',
              _dark: 'gray.400'
            }
          }
        }
      },
      bottomNav: {
        linkHoverColor: {
          default: 'theme.800',
          _dark: 'theme.300'
        }
      }
    },
    rightNav: {
      titleTop: {
        color: {
          default: 'gray.800',
          _dark: 'gray.200'
        }
      },
      link: {
        active: {
          color: {
            default: 'theme.800',
            _dark: 'theme.300'
          }
        },
        inactive: {
          color: {
            default: 'gray.800',
            _dark: 'gray.400'
          }
        }
      }
    },
    footer: {
      bgColor: {
        default: 'gray.100',
        _dark: '#1B222E'
      },
      textColor: {
        default: 'gray.800',
        _dark: 'gray.400'
      }
    }
  }
};

export default themeSemanticTokens;
