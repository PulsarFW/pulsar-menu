import React from 'react';
import '@mantine/core/styles.css';
import '../../nuiViewport.css';
import { MantineProvider, createTheme, rem } from '@mantine/core';

/**
 * Mantine globals use `background-color: var(--mantine-color-body)`.
 * Default dark maps that to opaque `dark[7]`. Declare transparent in `:root`, light, AND dark blocks
 * so the variable is valid even before `data-mantine-color-scheme` is stable in CEF.
 */
const TRANSPARENT_SURFACE = 'rgba(0, 0, 0, 0)';

const nuiTransparentBodyResolver = () => ({
    variables: {
        '--mantine-color-body': TRANSPARENT_SURFACE,
    },
    light: {
        '--mantine-color-body': TRANSPARENT_SURFACE,
    },
    dark: {
        '--mantine-color-body': TRANSPARENT_SURFACE,
    },
});

/** localStorage-backed scheme can behave oddly inside FiveM CEF — keep Mantine deterministic. */
const nuiEmbeddedColorSchemeManager = {
    get: (defaultValue) => defaultValue,
    set: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
    clear: () => {},
};

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import GlobalStyle from '../../globalStyles';

import Menu from '../../components/Menu/Menu';
import { menuZIndex } from '../../theme/menuAppearance';

library.add(fab, fas, far);

const pulsar = [
    '#faf5ff',
    '#f0e0ff',
    '#e4c8ff',
    '#d8b0ff',
    '#c97dff',
    '#9d4ee0',
    '#7a22c9',
    '#5d1a9a',
    '#3a105f',
    '#14071f',
];

const theme = createTheme({
    primaryColor: 'pulsar',
    /** Softer corners while keeping bespoke row radii via menuAppearance */
    defaultRadius: 'md',
    fontFamily:
        '"Plus Jakarta Sans", "Source Sans Pro", system-ui, -apple-system, sans-serif',
    headings: {
        fontFamily:
            '"Plus Jakarta Sans", "Source Sans Pro", system-ui, -apple-system, sans-serif',
        fontWeight: '600',
    },
    spacing: {
        xs: rem(8),
        sm: rem(10),
        md: rem(14),
        lg: rem(18),
        xl: rem(24),
    },
    colors: {
        pulsar,
        dark: [
            '#f1eef5',
            '#d9d5e2',
            '#bfbace',
            '#a599b8',
            '#8f81a8',
            '#6f6490',
            '#4f475f',
            '#2f2a39',
            '#141317',
            '#000000',
        ],
        red: [
            '#ffcdd2',
            '#ef9a9a',
            '#e57373',
            '#c62839',
            '#a61f2e',
            '#851a25',
            '#6e1616',
            '#561012',
            '#3f0c0f',
            '#290809',
        ],
        green: [
            '#d4edd1',
            '#bfe2bb',
            '#9dd396',
            '#7abf72',
            '#60a058',
            '#52984a',
            '#3f7539',
            '#2f562b',
            '#1f3920',
            '#102614',
        ],
        yellow: [
            '#fef3e6',
            '#fdebd0',
            '#fcdeb3',
            '#fadb9a',
            '#f09348',
            '#d9792e',
            '#b05d1a',
            '#8f4a13',
            '#6f3810',
            '#4f280b',
        ],
    },
    components: {
        Modal: {
            defaultProps: {
                radius: 'lg',
                padding: 'lg',
                centered: true,
                zIndex: menuZIndex.portal,
            },
            styles: {
                header: {
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: rem(8),
                    paddingBottom: rem(14),
                    alignItems: 'flex-start',
                },
                title: {
                    fontWeight: '700',
                    fontSize: rem(13),
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.88)',
                },
                close: {
                    color: '#c97dff',
                    '&:hover': {
                        background: 'rgba(122, 34, 201, 0.2)',
                    },
                },
                content: {
                    background: `
                        radial-gradient(
                            ellipse 120% 80% at 50% -30%,
                            rgba(122, 34, 201, 0.18),
                            transparent 55%
                        ),
                        linear-gradient(180deg, #16121c 0%, #0b090e 55%, #000000 100%)
                    `,
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow:
                        '0 32px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)',
                    outline: 'none',
                },
                body: {
                    paddingTop: rem(4),
                },
            },
        },
        Alert: {
            styles: {
                root: {
                    borderRadius: rem(11),
                    border: '1px solid rgba(255,80,80,0.35)',
                    background:
                        'linear-gradient(145deg, rgba(255,80,90,0.15) 0%, rgba(0,0,0,0.3) 100%)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                },
            },
        },
    },
});

export default function App() {
    return (
        <MantineProvider
            theme={theme}
            defaultColorScheme="dark"
            colorSchemeManager={nuiEmbeddedColorSchemeManager}
            cssVariablesResolver={nuiTransparentBodyResolver}
        >
            <GlobalStyle />
            <Menu />
        </MantineProvider>
    );
}
