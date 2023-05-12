import { Box, Center, HStack, Image, Link, Text, useColorMode } from "@chakra-ui/react";
import React, { FC } from "react";
import JaenLogoLight from "../assets/icons/jaen_light.svg";
import JaenLogoDark from "../assets/icons/jaen_dark.svg";

const year = new Date().getFullYear();

/**
 * Footer component.
 */
const Footer: FC = () => {

    const { colorMode } = useColorMode();

    return (
        <Center
            as='footer'
            bgColor='footer.bgColor'
            color='footer.textColor'
        >
            <Box
                w='100%'
                maxW='7xl'
                px={6}
                py={12}
            >
                <HStack>
                    <Text>Powered by</Text>
                    <Link>
                        <Image
                            h='30px'
                            src={colorMode === 'light' ? JaenLogoLight : JaenLogoDark}
                            alt='Jaen Logo'
                            _hover={{
                                transform: 'scale(1.1)'
                            }}
                            transition='transform 0.2s ease-in-out'
                        />
                    </Link>
                </HStack>
                <Text 
                    mt={5}
                    fontSize='xs'
                >
                    © {year} Snek.
                </Text>
            </Box>
        </Center>
    )
}

export default Footer;