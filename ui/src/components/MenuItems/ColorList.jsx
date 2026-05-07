import React, { useState } from 'react';
import { Button, Group, Modal, Box, ScrollArea } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import Nui from '../../util/Nui';
import {
    interactiveRowHoverStyles,
    modalRowHoverSx,
    modalRowStyle,
    rowInteractiveStyle,
} from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();
    const [showList, setShowList] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
        data.options.colors[data.options.current],
    );

    const toggle = () => {
        if (!data.options.disabled) {
            setShowList((open) => !open);
        }
    };

    const changeColor = (index) => {
        setSelectedColor(data.options.colors[index]);
        setShowList(false);
        Nui.send('Selected', {
            id: data.id,
            data: { color: data.options.colors[index] },
        });
    };

    const previewBg = (color) =>
        color.rgb != null
            ? `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
            : color.hex;

    const swatchSx = {
        width: 54,
        height: 28,
        borderRadius: 8,
        border: '2px solid rgba(255,255,255,0.2)',
        flexShrink: 0,
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.35)',
    };

    return (
        <div>
            <Button
                fullWidth
                unstyled
                onClick={toggle}
                disabled={data.options.disabled}
                style={{
                    ...rowInteractiveStyle(theme),
                    height: 'auto',
                    minHeight: 46,
                    opacity: data.options.disabled ? 0.5 : 1,
                    cursor: data.options.disabled ? 'not-allowed' : 'pointer',
                    justifyContent: 'stretch',
                    padding: '8px 14px',
                }}
                styles={{
                    ...interactiveRowHoverStyles(theme),
                }}
            >
                <Group gap="md" wrap="nowrap" align="center" justify="flex-start">
                    <Box style={{ ...swatchSx, background: previewBg(selectedColor) }} />
                    <span style={{ fontWeight: 500, letterSpacing: '0.02em' }}>
                        {selectedColor.label}
                    </span>
                </Group>
            </Button>

            <Modal opened={showList} onClose={toggle} title="Select color">
                <ScrollArea mah={380}>
                    {data.options.colors.map((color, i) => (
                        <Button
                            key={i}
                            fullWidth
                            unstyled
                            type="button"
                            disabled={data.options.disabled}
                            onClick={() => changeColor(i)}
                            style={{
                                ...modalRowStyle(theme),
                                justifyContent: 'flex-start',
                                marginBottom: i === data.options.colors.length - 1 ? 0 : 8,
                            }}
                            styles={{
                                root: modalRowHoverSx(theme),
                            }}
                        >
                            <Group gap="md" wrap="nowrap" align="center" w="100%">
                                <Box
                                    style={{
                                        ...swatchSx,
                                        background: previewBg(color),
                                    }}
                                />
                                <span>{color.label}</span>
                            </Group>
                        </Button>
                    ))}
                </ScrollArea>
            </Modal>
        </div>
    );
};
