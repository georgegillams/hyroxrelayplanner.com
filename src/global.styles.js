import { backgroundColorDarkMode, notBlackDarkMode, primaryColor } from '@george-gillams/components/constants/colors';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { quattrocento } from './quattrocento.styles';
import { hyroxBlack, hyroxWhite } from 'constants/hyrox-theme';

export default createGlobalStyle`
 ${normalize}

 ${quattrocento}

::selection {
  background-color: ${primaryColor};
  color: white;
}

// This makes box-sizing conform to the more-convenient IE standard.
// See https://stackoverflow.com/a/4698091/6029750
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 1;
  background-color: ${hyroxBlack}
}

body {
  background-color: ${hyroxBlack};
  color: ${hyroxWhite};
  font-family: 'Quattrocento Sans', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', Arial, sans-serif;

  @media (prefers-color-scheme: dark) {
    background-color: ${backgroundColorDarkMode};
    color: ${notBlackDarkMode};
  }
}

body.fontLoaded {
  font-family: 'Quattrocento Sans', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-width: 100%;
  min-height: 100%;
}
`;
