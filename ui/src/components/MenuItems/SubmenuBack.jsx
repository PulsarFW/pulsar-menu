import React from 'react';
import { Button } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import Nui from '../../util/Nui';
import {
    interactiveRowHoverStyles,
    rowInteractiveStyle,
} from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();
    const dispatch = useDispatch();

    const onClick = () => {
        if (!data.options.disabled) {
            Nui.send('FrontEndSound', { sound: 'BACK' });
            Nui.send('Selected', {
                id: data.id,
            });

            dispatch({
                type: 'SUBMENU_BACK',
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
                cursor: data.options.disabled ? 'default' : 'pointer',
            }}
            styles={{
                ...interactiveRowHoverStyles(theme),
            }}
        >
            {data.label}
        </Button>
    );
};
