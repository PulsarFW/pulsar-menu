import React from 'react';
import Nui from '../../util/Nui';
import { Button, Group } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import {
    interactiveRowHoverStyles,
    rowInteractiveStyle,
} from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();

    const onClick = () => {
        Nui.send('FrontEndSound', { sound: 'SELECT' });
        Nui.send('Selected', {
            id: data.id,
        });
    };

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
            <Group gap="sm" justify="space-between" wrap="nowrap" w="100%">
                <span
                    style={{
                        flex: '0 0 18%',
                        textAlign: 'left',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: theme.colors.pulsar[3],
                        fontWeight: 600,
                        fontSize: 12,
                    }}
                >
                    {data.options.secondaryLabel}
                </span>
                <span style={{ flex: 1, textAlign: 'center' }}>
                    {data.label}
                </span>
                <span style={{ flex: '0 0 18%' }} />
            </Group>
        </Button>
    );
};
