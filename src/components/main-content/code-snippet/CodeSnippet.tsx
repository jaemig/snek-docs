import { Box, IconButton, Text, transition, useColorModeValue } from "@chakra-ui/react";
import React, { FC } from "react";
import "highlight.js/styles/atom-one-dark.css";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
    code: string;
    fileName?: string;
    startingLineNumber?: number;
}

let timeout: NodeJS.Timeout;

/**
 * Code snippet component for displaying code examples.
 */
const CodeSnippet: FC<CodeSnippetProps> = ({ code, fileName, startingLineNumber = 1, }) => {
  const [buttonIcon, setButtonIcon] = React.useState<'copy' | 'check'>('copy');
  const theme = useColorModeValue(oneLight, oneDark);

  /**
   * Copy code to clipboard.
   */
  const copyToClipboard = () => {
    setButtonIcon('check');
    clearTimeout(timeout);
    timeout = setTimeout(() => setButtonIcon('copy'), 2000);
  }

    return (
        <Box
            fontSize='sm'
            borderRadius='md'
            // border='1px solid #2D3748'
            __css={{
                '& pre': {
                    borderRadius: 'xl',
                    borderTopRadius: fileName ? 'none' : 'xl',
                    border: '1px solid',
                    borderTop: fileName ? 'none' : '1px solid',
                    borderColor: 'components.codeSnippet.borderColor',
                    backgroundColor: 'components.codeSnippet.body.bgColor !important',
                    fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
                    fontWeight: 500,
                    fontSize: '12.96px',
                    padding: 3,
                    pt: 0,
                    pb: 5,
                    mt: '0 !important',
                    minH: '100px',
                },
                '&:hover .code-snippet-copy-button': {
                    visibility: 'visible',
                    opacity: 1,
                },
                '&:hover': {
                  boxShadow: 'lg',
                }
            }}
            transition='box-shadow 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)'
        >
          {
            fileName && (
              <Text
                bgColor='components.codeSnippet.header.bgColor'
                borderTopLeftRadius='xl'
                borderTopRightRadius='xl'
                border='1px solid'
                borderBottom='none'
                borderColor='components.codeSnippet.borderColor'
                fontSize='xs'
                p={3}
              >{ fileName }</Text>
            )
          }
            <Box
              position='relative'
            >
              <SyntaxHighlighter 
                language="javascript"
                style={theme}
                startingLineNumber={startingLineNumber}
                showLineNumbers
                wrapLongLines
              >
                { code }
              </SyntaxHighlighter>
              {/* <Highlight className="react-highlight">{ code }</Highlight> */}
              <IconButton
                position='absolute'
                top={5}
                right={5}
                visibility='hidden'
                opacity={0}
                className='code-snippet-copy-button'
                aria-label='Copy code to clipboard'
                icon={buttonIcon === 'copy' ? <CopyIcon /> : <CheckIcon />} 
                transition='opacity 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000), visibility 0.2s cubic-bezier(0.000, 0.735, 0.580, 1.000)'
                onClick={copyToClipboard}
              />
            </Box>
        </Box>
    )
}

export default CodeSnippet;