Component that takes plain text markdown and parses it into JSX.

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

| Property           | Type         | Default | Description                                                                  |
| ------------------ | ------------ | ------- | ---------------------------------------------------------------------------- |
| value              | **String**   |         | **Required.** The plain-text to be parsed to JSX                             |
| plainTextParser    | **Function** |         | Function that returns a modified version of the value string                 |
| renderInWrapper    | **Boolean**  | false   | If true, the HTML output will have a <div> wrapper                           |
| className          | **String**   |         | Space-delimited classes to add to wrapper (ignored if renderInWrapper=false) |
| renderUnrecognized | **Function** |         | Unrecognized tags are rendered via this method                               |

## Static Properties

| Property              | Type      | Default | Description                         |
| --------------------- | --------- | ------- | ----------------------------------- |
| MarkdownJSX.replacers | **Array** | `[]`    | Object array of string replacements |

### MarkdownJSX.replacers

By default the replacers array is empty. Adding items to it will allow you to customize the output of the jsx before rendering. 

```
MarkdownJSX.replacers.push({
    id: 'heading',
    match: /<h([1-6])>(.+)<\/h[1-6]>/gim,
    replace: '<h$1><span>$2</span></h$1>',
});
```

* Note: The id property is unique and required. 
