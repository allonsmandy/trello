import { uuid } from './utils';

export default {
  name: 'trello',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'in progress',
      tasks: [
        {
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};
