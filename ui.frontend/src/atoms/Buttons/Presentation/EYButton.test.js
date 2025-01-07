import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import EYButton, { BUTTON_STYLE } from './EYButton';

describe('EYButton Component', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    })

    test('renders with default button style', () => {
        ReactDOM.render(<EYButton>Click Me</EYButton>, container);
        const button = container.querySelector('button');

        //check if the default class is applied
        expect(button.className).toContain(BUTTON_STYLE.PRIMARY);
    });

    test('renders with custom button style', () => {
        ReactDOM.render(<EYButton buttonStyle={BUTTON_STYLE.SECONDARY}>Click Me</EYButton>, container);
        const button = container.querySelector('button');

        //check if the custom style class is applied
        expect(button.className).toContain(BUTTON_STYLE.SECONDARY);
    });

    test('triggers onClick function when clicked', () => {
        const onClickSpy = sinon.spy();

        ReactDOM.render(<EYButton onClick={onClickSpy}>Click Me</EYButton>, container);
        const button = container.querySelector('button');

        //simulate a click event
        TestUtils.Simulate.click(button);

        //Check if the onClick function was called
        sinon.assert.calledOnce(onClickSpy);
    });

    test('throw error if onClick is not a function', () => {
        //Pass a non-function value to onClick and check for errors
        ReactDOM.render(<EYButton onClick="notAFunction">Click Me</EYButton>, container);
        const button = container.querySelector('button');

        expect(() => {
            //Simulate a click event
            TestUtils.Simulate.click(button);

            //Since 'onClick' is not a function, it should throw an errors
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
            expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('Failed prop type'));
            consoleError.mockRestore();
        });
    });
});