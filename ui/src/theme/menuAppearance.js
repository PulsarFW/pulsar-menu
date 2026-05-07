/**
 * Shared visual tokens for the Pulsar menu NUI (Mantine).
 * Keeps surfaces consistent across row types.
 */

/**
 * Menu shell + Mantine portals (Select dropdown, Modal, Popover defaults are 300/200 — below this).
 */
export const menuZIndex = {
    panel: 1000,
    portal: 11_000,
};

export const menuUi = {
    radiusPanel: 16,
    radiusRow: 11,
    gap: 11,
    /** Hairline borders */
    lineSubtle: 'rgba(255, 255, 255, 0.07)',
    lineMedium: 'rgba(255, 255, 255, 0.11)',
};

const EASE_UI = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const MENU_DURATION = '175ms';

export const menuTransition = (props = '') =>
    props
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
        .map((prop) => `${prop} ${MENU_DURATION} ${EASE_UI}`)
        .join(', ');

const rowShadow = '0 2px 14px rgba(0, 0, 0, 0.28)';
const rowShadowHover =
    '0 6px 22px rgba(122, 34, 201, 0.18), 0 2px 8px rgba(0, 0, 0, 0.35)';

/** Outer draggable panel */
export function panelShellStyle(theme) {
    return {
        borderRadius: menuUi.radiusPanel,
        background: `
            radial-gradient(
                120% 80% at 10% -20%,
                rgba(201, 125, 255, 0.14) 0%,
                transparent 55%
            ),
            radial-gradient(
                80% 50% at 100% 0%,
                rgba(122, 34, 201, 0.12) 0%,
                transparent 45%
            ),
            linear-gradient(180deg, #141019 0%, #080609 52%, #000000 100%)
        `,
        border: `1px solid ${menuUi.lineMedium}`,
        boxShadow: `
            0 28px 56px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.06) inset,
            0 1px 0 rgba(255, 255, 255, 0.06) inset
        `,
    };
}

/** Content block wrapping menu rows — scroll region */
export function scrollRegionStyle() {
    return {
        maxHeight: 696,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: 6,
        marginRight: -4,
    };
}

/**
 * Interactive row shell (buttons, clickable rows).
 * @param {import('@mantine/core').MantineTheme} theme
 */
export function rowInteractiveStyle(theme) {
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: menuUi.radiusRow,
        border: `1px solid ${menuUi.lineSubtle}`,
        background: `linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.052) 0%,
            rgba(0, 0, 0, 0.22) 100%
        )`,
        color: 'rgba(255, 255, 255, 0.94)',
        fontSize: 13.5,
        fontWeight: 500,
        letterSpacing: '0.01em',
        minHeight: 44,
        width: '100%',
        padding: '0 14px',
        userSelect: 'none',
        marginBottom: menuUi.gap,
        boxShadow: rowShadow,
        transition: menuTransition(
            'border-color, background-color, box-shadow, transform',
        ),
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        cursor: 'pointer',
        outline: 'none',
    };
}

export function interactiveRowHoverStyles(theme) {
    return {
        root: {
            '&:hover:not(:disabled)': {
                background: `linear-gradient(
                    145deg,
                    rgba(122, 34, 201, 0.22) 0%,
                    rgba(0, 0, 0, 0.14) 100%
                )`,
                boxShadow: rowShadowHover,
            },
            '&:active:not(:disabled)': {
                transform: 'scale(0.997)',
            },
        },
    };
}

/** Non-button field blocks (inputs, sliders, ticker) */
export function fieldBlockStyle(theme) {
    return {
        borderRadius: menuUi.radiusRow,
        border: `1px solid ${menuUi.lineSubtle}`,
        background: `linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(0, 0, 0, 0.28) 100%
        )`,
        color: '#ffffff',
        fontSize: 13,
        width: '100%',
        userSelect: 'none',
        padding: '14px 18px',
        marginBottom: menuUi.gap,
        boxShadow: rowShadow,
    };
}

export function labelFieldStyles() {
    return {
        color: 'rgba(255, 255, 255, 0.52)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 8,
    };
}

export function modalRowStyle(theme) {
    return {
        width: '100%',
        cursor: 'pointer',
        padding: '10px 14px',
        marginBottom: 8,
        borderRadius: menuUi.radiusRow - 2,
        border: `1px solid ${menuUi.lineSubtle}`,
        background: `linear-gradient(
            145deg,
            rgba(255,255,255,0.06) 0%,
            rgba(0,0,0,0.2) 100%
        )`,
        color: theme.white,
        display: 'flex',
        alignItems: 'center',
        transition: menuTransition('border-color, background-color, box-shadow'),
        boxShadow: '0 1px 8px rgba(0,0,0,0.2)',
    };
}

export function modalRowHoverSx(theme) {
    return {
        '&:hover': {
            borderColor: `${theme.colors.pulsar[4]}55`,
            background: `linear-gradient(
                145deg,
                rgba(122, 34, 201, 0.22) 0%,
                rgba(0,0,0,0.15) 100%
            )`,
            boxShadow: rowShadowHover,
        },
    };
}
