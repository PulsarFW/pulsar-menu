/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import Nui from '../../util/Nui';
import {
    interactiveRowHoverStyles,
    rowInteractiveStyle,
} from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();

    const onClick = () => {
        if (!data.options.disabled) {
            Nui.send('FrontEndSound', { sound: 'SELECT' });
            Nui.send('Selected', {
                id: data.id,
            });
        }
    };

    return (
        <Button
            fullWidth
            unstyled
            disabled={data.options.disabled}
            onClick={onClick}
            style={{
                ...rowInteractiveStyle(theme),
                opacity: data.options.disabled ? 0.5 : 1,
                cursor: data.options.disabled ? 'not-allowed' : 'pointer',
            }}
            styles={{
                ...interactiveRowHoverStyles(theme),
            }}
        >
            {data.label}
        </Button>
    );
};
