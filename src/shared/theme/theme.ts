import { createTheme, type MantineColorsTuple } from '@mantine/core';

const myOrange: MantineColorsTuple = [
  '#fff4e2', '#ffe9cc', '#ffd09c', '#ffb766', '#ffa13b',
  '#ff931f', '#ff8c0f', '#e37900', '#ca6c00', '#af5b00'
];

export const theme = createTheme({
  primaryColor: 'orange',
  colors: {
    orange: myOrange,
  },

  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, sans-serif',

  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
      },
      styles: () => ({
        root: {
          transition: 'transform 0.15s ease, background-color 0.2s ease',
          '&:active': { transform: 'scale(0.96)' },
        },
      }),
    },
    TextInput: {
      styles: {
        input: {
          border: '1px solid #333',
          backgroundColor: '#1a1a1a',
          color: '#eee',
          '&:focus': { borderColor: '#ff931f' },
        },
        label: { marginBottom: 5, fontWeight: 500 },
      },
    },
    PasswordInput: {
      styles: {
        input: { backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#eee' },
      },
    },
    Paper: {
      defaultProps: {
        p: 'xl',
        shadow: 'xl',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: '#111',
          borderColor: '#333',
        },
      },
    },
  },
});