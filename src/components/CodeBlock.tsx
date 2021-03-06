import React, { FC } from "react";
import { Prism } from "react-syntax-highlighter";
import nord from "react-syntax-highlighter/dist/cjs/styles/prism/nord";

export const CodeBlock: FC<{ language?: string; value: string }> = ({
    language,
    value,
}) => (
    <Prism language={language} style={nord}>
        {value}
    </Prism>
);
