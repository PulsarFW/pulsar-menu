/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { ChromePicker } from 'react-color';
import Nui from '../../util/Nui';
import { rowInteractiveStyle } from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();
    const [showPicker, setShowPicker] = useState(false);
    const [currColor, setCurrColor] = useState(data.options.current);
    const [tColor, setTColor] = useState(currColor);

    const toggle = () => {
        if (!data.options.disabled) {
            setShowPicker((o) => !o);
        }
    };

    const onChange = (color) => {
        if (!data.options.disabled) {
            setTColor(color.rgb);
        }
    };

    const onSave = () => {
        if (!data.options.disabled) {
            setCurrColor(tColor);
            Nui.send('Selected', {
                id: data.id,
                data: { color: tColor },
            });
            toggle();
        }
    };

    const bg = `rgb(${currColor.r}, ${currColor.g}, ${currColor.b})`;
    const baseRow = rowInteractiveStyle(theme);

    return (
        <div>
            <Button
                fullWidth
                unstyled
                onClick={toggle}
                disabled={data.options.disabled}
                style={{
                    ...baseRow,
                    minHeight: 84,
                    justifyContent: 'center',
                    padding: '14px 18px',
                    background: bg,
                    boxShadow:
                        '0 4px 14px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 0 1px rgba(0,0,0,0.2)',
                    opacity: data.options.disabled ? 0.5 : 1,
                    cursor: data.options.disabled ? 'not-allowed' : 'pointer',
                }}
                styles={{
                    root: {
                        '&:hover:not(:disabled)': {
                            filter: 'brightness(1.07)',
                            transform: 'translateY(-1px)',
                        },
                        '&:active:not(:disabled)': {
                            transform: 'scale(0.996)',
                        },
                    },
                }}
            >
                <span
                    style={{
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textShadow:
                            '0 2px 10px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.6)',
                        color: '#ffffff',
                    }}
                >
                    Select color · rgb({currColor.r}, {currColor.g}, {currColor.b})
                </span>
            </Button>
            <Modal opened={showPicker} onClose={toggle} title="Select color">
                <ChromePicker
                    color={tColor}
                    disableAlpha
                    onChange={onChange}
                    width="100%"
                    styles={{
                        default: {
                            background: `${theme.colors.dark[8]} !important`,
                            boxShadow: 'none !important',
                            borderRadius: 12,
                        },
                    }}
                />
                <Group justify="flex-end" mt="md">
                    <Button
                        variant="gradient"
                        gradient={{
                            from: 'pulsar',
                            to: '#0a0a0a',
                            deg: 145,
                        }}
                        onClick={onSave}
                        radius="md"
                        style={{
                            border: `1px solid ${theme.colors.pulsar[6]}88`,
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontSize: 12,
                        }}
                    >
                        Save color
                    </Button>
                </Group>
            </Modal>
        </div>
    );
};
