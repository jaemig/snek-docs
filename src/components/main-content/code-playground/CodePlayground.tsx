import { Box } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useState } from 'react';
import CodeSnippet, { ICodeSnippetProps } from '../code-snippet/CodeSnippet';
import { mainComponentBaseStyle } from '../../../layout/main/mainContent.vars';
import CodeResultPreview from '../code-result-preview/CodeResultPreview';

interface ICodePlaygroundProps {
  codeEditorProps: ICodeSnippetProps;
  executeCode: (code: string) => Promise<ReactNode>;
}
/**
 * Component for showing a code editor and (live) preview.
 * This component uses the CodeSnippet component to display and edit the code.
 */
const CodePlayground: FC<ICodePlaygroundProps> = ({
  codeEditorProps,
  executeCode
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof executeCode>>>();

  const handleExecuteCode = async (code: string) => {
    try {
      setIsExecuting(true);

      // Placeholder for the actual function call. Replace with code below
      setTimeout(() => {
        setResult(<h1>How cool is that?</h1>);
      }, 3000);
      //TODO: Replace the placeholder with this actual function call:
      // setResult(await executeCode(code));
    } finally {
      setTimeout(() => {
        setIsExecuting(false);
      }, 3000);
    }
  };

  return (
    <>
      <Box
        {...mainComponentBaseStyle.baseProps}
        border="1px solid"
        borderRadius="xl"
        borderColor="components.codeSnippet.borderColor"
        h="fit-content"
        overflow="hidden"
      >
        <CodeSnippet
          {...codeEditorProps}
          containerProps={{
            border: 'none',
            borderBottomRadius: 'none'
          }}
          isStandalone={false}
          isExecutable
          isExecuting={isExecuting}
          executeCode={code => handleExecuteCode(code)}
        />
      </Box>
      <CodeResultPreview
        isStandalone
        headerText="Code Preview"
        isExecuting={isExecuting}
        result={result}
      />
    </>
  );
};

CodePlayground.defaultProps = {
  codeEditorProps: {
    code: '',
    headerText: 'Editable Code',
    startingLineNumber: 1,
    language: 'javascript'
  }
};

export default CodePlayground;
