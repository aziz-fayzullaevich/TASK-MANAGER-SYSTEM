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

  components: {
    Paper: {
      defaultProps: { withBorder: true, shadow: 'md' },
      styles: (theme: any) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' ? '#141414' : '#fff',
          borderColor: `${myOrange[4]}`,
        }
      })
    },

    Button: {
      styles: {
        root: { transition: 'all 0.2s ease' }
      }
    },

    TextInput: {
      styles: (theme: any) => ({
        input: {
          '&:focus': { borderColor: theme.colors.orange[5] }
        }
      })
    },
  }
});