import { extendTheme } from '@chakra-ui/theme'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      variants: {
        solid: {
          bg: 'pink.500',
          color: 'white',
          _hover: {
            bg: 'pink.600',
          },
        },
        outline: {
          borderColor: 'whiteAlpha.400',
          color: 'white',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
      },
    },
  },
})

export default theme 