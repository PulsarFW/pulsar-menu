/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { useMantineTheme } from '@mantine/core';

import { Sanitize } from '../../util/Parser';

const buildStyles = (theme) => ({
    defaultStyle: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 'normal',
    },
    heading: {
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '0.04em',
        padding: '12px 0 14px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 100%',
        backgroundSize: '68% 2px',
        backgroundImage: `linear-gradient(90deg, ${theme.colors.pulsar[5]}ee, ${theme.colors.pulsar[6]}77, transparent)`,
        color: 'rgba(255,255,255,0.94)',
    },
    textSmall: {
        fontSize: 8,
    },
    textMedium: {
        fontSize: 12,
    },
    textLarge: {
        fontSize: 18,
    },
    textExtraLarge: {
        fontSize: 24,
    },
    code: {
        fontFamily: 'Inconsolata, monospace',
    },
    left: {
        textAlign: 'left',
    },
    center: {
        textAlign: 'center',
    },
    /** Option key used by menu content for right alignment */
    right: {
        textAlign: 'right',
    },
    /** Alias if content used older duplicate class name */
    rightAlign: {
        textAlign: 'right',
    },
    bold: {
        fontWeight: 'bold',
    },
    pad: {
        padding: 15,
    },
    colorPrimary: {
        color: theme.colors.pulsar[6],
    },
    colorError: {
        color: theme.colors.red[6],
    },
    colorWarning: {
        color: theme.colors.yellow[5],
    },
    colorSuccess: {
        color: theme.colors.green[3],
    },
});

export default (props) => {
    const theme = useMantineTheme();
    const styleMap = buildStyles(theme);

    let merged = { ...styleMap.defaultStyle };

    if (
        props.data.options.classes != null &&
        props.data.options.classes.length > 0
    ) {
        props.data.options.classes.forEach((key) => {
            if (styleMap[key]) {
                merged = { ...merged, ...styleMap[key] };
            }
        });
    }

    return <div style={merged}>{Sanitize(props.data.label)}</div>;
};
