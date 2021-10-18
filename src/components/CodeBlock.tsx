import React, { FC } from "react";
import { Prism } from "react-syntax-highlighter";
import nord from "react-syntax-highlighter/dist/cjs/styles/prism/nord";

export const CodeBlock: FC<{ inline?: boolean; className?: string }> = (
    props,
) => {
    const { inline, className, children } = props;
    const match = /language-(\w+)/.exec(className ?? "");
    if (inline || match === null) {
        return <code {...props} />;
    }
    const language = match[1];
    return (
        <Prism language={language} style={nord}>
            {children}
        </Prism>
    );
};
