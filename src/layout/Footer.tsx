import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import JaenLogo from "../assets/icons/jaen.svg";

const year = new Date().getFullYear();

/**
 * Footer component.
 */
const Footer: FC = () => {

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
                    <Image
                        h='30px'
                        src={JaenLogo}
                        alt='Jaen Logo'
                    />
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