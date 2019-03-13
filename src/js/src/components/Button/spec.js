import React from 'react'
import Button from './index'
import { findByTestAtrr, checkProps } from './../../../../../utils'
import { shallow } from 'enzyme'

const setUp = (props={}) => {
    const component = shallow(<Button {...props} />);
    return component;
};

// Décris dans quel composant s'effectue les tests
describe('Button Component', () => {
    //
    describe('Checking PropTypes', () => {
        it('Should NOT throw a warning', () => {
            const expectedProps = {
                text: 'Mon bouton',
                emitEvent: () => {}
            }
            const propsError = checkProps(Button, expectedProps)
            expect(propsError).toBeUndefined()
        })
    })

    describe('Render component', () => {
        let wrapper
        // Ajouter des props factice au composant
        beforeEach(() => {
            const props = {
                text: "Mon bouton",
                emitEvent: () => {}
            }
            wrapper = setUp(props)
        })

        it("Should render button", () => {
            const button = findByTestAtrr(wrapper, "buttonComponent")
            expect(button.length).toBe(1)
        })
    })
})
