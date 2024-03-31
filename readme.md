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
    const markdownText = useMemo(() => (`
        something

        # Page Heading

        - List Item 1
        - List Item 2
        - List item 3

        Some other stuffs
    `), []);

    return <MarkdownJSX value={markdownText} />
};
```

## Properties

| Property           | Type       | Description                                                                  | Default |
| ------------------ | ---------- | ---------------------------------------------------------------------------- | ------- |
| value              | `String`   | **Required.** The plain-text to be parsed to JSX                             |         |
| className          | `String`   | Space-delimited classes to add to wrapper (ignored if renderInWrapper=false) |         |
| renderInWrapper    | `Boolean`  | If true, the HTML output will have a <div> wrapper                           | `false` |
| renderUnrecognized | `Function` | Unrecognized tags are rendered via this method                               |         |

## Static Properties

| Property               | Type       | Description                                                                         |
| ---------------------- | ---------- | ----------------------------------------------------------------------------------- |
| MarkdownJSX.preparsers | `Registry` | Registry of string replacers to apply before the value has been converted to markup |
| MarkdownJSX.replacers  | `Registry` | Registry of string replacers to apply after the value has been converted to markup  |

> **Note:** _The preparsers and replacers registries are identical in functionality._

#### MarkdownJSX.preparsers

By default the preparsers registry is empty. Registered string replacers are applied before the value has been converted to markup. This can be useful for validating or preformatting the input text.

```
MarkdownJSX.preparsers.register('something', {
    match: /something/gim,
    replace: 'Somethings',
});
```

#### MarkdownJSX.replacers

By default the replacers registry is empty. Registered string replacers are applied after the value has been converted to markup. This can be useful for customizing the markup with inline styling or class names as well as modifying which tags are being used for specific markup.

> **Note:** _The initial generated markup will never had any attributes applied to the elements._

```
MarkdownJSX.replacers.register('heading', {
    match: /<h([1-6])>(.+)<\/h[1-6]>/gim,
    replace: '<h$1><span>$2</span></h$1>',
});
```

##### Replace as a function

You can pass a function as the replace value to gain more control over the output of a preparser or replacer.

```
MarkdownJSX.replacers.register('heading', {
    match: /<h([1-6])>(.+)<\/h[1-6]>/gim,
    replace: (...args) => {
        const [, tag, text] = args;
        const id = String(text).replace(/\W/g, '-').toLowerCase();
        return `
        <h${tag} id='${id}'>
            <a href='#${id}'>
                ${text}
            </a>
        </h${tag}>
    `;
    },
});
```

#### Removing A Registered Parsers

You can remove any registered preparser or replacer.

```
// Remove a single parser
MarkdownJSX.replacers.unregister('heading');

// Remove multiple parsers
MarkdownJSX.replacers
    .unregister('heading')
    .unregister('foobar');

// Remove all parsers
MarkdownJSX.replacers.flush();

```

#### Replacing A Registered Parser

You can overwrite any registered preparser or replacer. The last in, first out rule is applied on the registry.

```
// input:
// Something is fooed!

MarkdownJSX.preparsers.register('foo', {
    match: / foo/gi,
    replace: ' fubar'
});

MarkdownJSX.preparsers.register('foo', {
    match: / foo/gi,
    replace: ' foobar'
});

// output:
// Something is foobared!
```

#### Protect A Registered Parser

You can ensure that a parser isn't unregistered or replaced by adding it to the protected list.

```
// create and protect the 'heading' replacer
MarkdownJSX.replacers
    .register('heading', {
        match: /<h([1-6])>(.+)<\/h[1-6]>/gim,
        replace: '<h$1><span>$2</span></h$1>',
    })
    .protect('heading');

// try to unregister the 'heading' replacer
MarkdownJSX.replacers.unregister('heading');

// Is it gone? Nope!
console.log('Gone?', !MarkdownJSX.replacers.get('heading'));

// unprotect the 'heading' replacer and unregister it
MarkdownJSX.replacers.unprotect('heading').unregister('heading');

// Is it gone now? Yep!
console.log('Gone?', !MarkdownJSX.replacers.get('heading'));
```

## MarkdownJSXParser()

If you need to parse markdown without rendering it you can import MarkdownJSXParser.

```
import { MarkdownJSXParser } from @atomic-reactor/markdown-to-jsx

const markdown = MarkdownJSXParser('# Something');

console.log(markdown);

// output:
// <h1>Something</h1>
```
