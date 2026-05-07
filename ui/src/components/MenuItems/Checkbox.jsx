/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Group } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Nui from '../../util/Nui';
import {
    interactiveRowHoverStyles,
    rowInteractiveStyle,
} from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();
    const [selected, setSelected] = useState(data.options.selected);

    const onClick = () => {
        setSelected(!selected);
        Nui.send('FrontEndSound', { sound: 'SELECT' });
        Nui.send('Selected', {
            id: data.id,
            data: { selected: !selected },
        });
    };

    const iconColor = selected
        ? theme.colors.pulsar[4]
        : 'rgba(255,255,255,0.45)';

    return (
        <Button
            fullWidth
            unstyled
            onClick={onClick}
            style={{
                ...rowInteractiveStyle(theme),
                justifyContent: 'stretch',
            }}
            styles={{
                ...interactiveRowHoverStyles(theme),
            }}
        >
            <Group gap="sm" justify="flex-start" wrap="nowrap" w="100%">
                <span
                    style={{
                        flex: '0 0 10%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: iconColor,
                    }}
                >
                    {selected ? (
                        <FontAwesomeIcon icon="square-check" size="lg" />
                    ) : (
                        <FontAwesomeIcon icon="square" size="lg" />
                    )}
                </span>
                <span style={{ flex: 1, textAlign: 'center' }}>
                    {data.label}
                </span>
                <span style={{ flex: '0 0 10%' }} />
            </Group>
        </Button>
    );
};
