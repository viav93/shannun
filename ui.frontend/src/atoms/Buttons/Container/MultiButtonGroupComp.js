import React, { Component } from 'react';
import ButtonComp from '../Presentation/ButtonComp';
import ButtonGroupComp from '../Presentation/ButtonGroupComp';
import ButtonToolBarComp from '../Presentation/ButtonToolBarComp';

/**
 * Multi Group Button Component
 */
class MultiButtonGroupComp extends Component {
    render() {
        const { options = [] } = this.props;
        if (options && options instanceof Array && options.length > 0) {
            return (
                <ButtonToolBarComp>
                    {options.map((option, index) => {
                        return (
                            <ButtonGroupComp key={`ButtonGroupComp-${index}`}>
                                <ButtonComp>
                                    {option.btnText}
                                </ButtonComp>
                            </ButtonGroupComp>
                        );
                    })}
                </ButtonToolBarComp>
            );
        } else {
            return null;
        }
    }
}

// default export
export default MultiButtonGroupComp;