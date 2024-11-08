import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ codeString }: { codeString: string }) => {
  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {codeString}
    </SyntaxHighlighter>
  );
};
export default CodeSnippet;
