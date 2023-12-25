import React from 'react';
import TestingComponent from "../components/testingComponent";

import { shallow } from 'enzyme';

it("should Render Component", () => {
    const testingComponent = shallow(<TestingComponent />);
    expect(testingComponent.find('UserName').length).toBe(1);
})


