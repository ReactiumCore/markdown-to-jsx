Component that takes plain text markdown and parses it into JSX"

## Install

```
npm install --save @atomic-reactor/markdown-to-jsx
```

## Usage

```
import React, { useMemo } from 'react';
import { MarkdownJSX } from '@atomic-reactor/markdown-to-jsx';

const MyComponent = () => {
    const somePlainText = useMemo(() => (`
        # Page Heading

        - List Item 1
        - List Item 2
        - List item 3

        Some other stuffs
    `), []);

    return <MarkdownJSX value={somePlainText} />
};
```

## Properties

| Property | Type        | Default | Description                                   |
| -------- | ----------- | ------- | --------------------------------------------- |
| value    | **String**  | null    | Required. The plain-text to be parsed to JSX  |
| sanitize | **Boolean** | true    | Sanitize the generate JSX to be DOM compliant |
