import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import About from './about';

const mockDict = {
  aboutProject: 'About this project',
  projectDescription:
    'Restman is an application for working with API requests. It supports method selection, URL, headers, includes history with previously executed requests and variables section. To start using the application you need to sign up.',
  aboutTeam: 'Our team',
  roleDeveloper: 'Role: developer',
  Tony: 'Anton Davydchyk',
  aboutTony: 'Made such complex tasks as the REST Client page and session control.',
  roleLeader: 'Role: team leader',
  Hoft: 'Nikolay Hoft',
  aboutHoft:
    'Came up with a design solution for the entire project, set it up and competently described all the tasks, monitored the quality of the code.',
  Eugeniya: 'Eugeniya Repnikova',
  aboutEugeniya: 'Full implementation of history and variables pages, multi-language app support.',
  aboutCourse: 'This app is an educational project of React course by The Rolling Scopes community.',
};

describe('About', () => {
  it('renders a component with right heading', () => {
    const { getAllByRole } = render(<About dict={mockDict} />);

    expect(getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });
});
