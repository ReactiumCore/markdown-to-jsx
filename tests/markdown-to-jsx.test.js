import React from 'react';
import { MarkdownJSX } from '../src';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const value = `
        Some markdown text
        
        - item 1
        - item 2
        - item 3
    `;

    const component = renderer.create(<MarkdownJSX value={value} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
