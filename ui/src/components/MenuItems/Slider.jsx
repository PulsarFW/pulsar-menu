import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Slider, Box } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

import Nui from '../../util/Nui';
import { fieldBlockStyle } from '../../theme/menuAppearance';

const SAVE_HEX = '#3ecf9a';

export default ({ data }) => {
    const theme = useMantineTheme();

    const [currValue, setCurrValue] = useState(data.options.current);
    const [savedValue, setSavedValue] = useState(data.options.current);

    const onChange = (newValue) => {
        if (!data.options.disabled) {
            setCurrValue(newValue);
        }
    };

    const onSave = () => {
        if (!data.options.disabled && currValue !== savedValue) {
            setSavedValue(currValue);
            Nui.send('FrontEndSound', { sound: 'SELECT' });
            Nui.send('Selected', {
                id: data.id,
                data: { value: currValue },
            });
        }
    };

    const style = data.options.disabled ? { opacity: 0.5 } : {};
    const dirty = currValue !== savedValue && !data.options.disabled;

    return (
        <div
            style={{
                ...fieldBlockStyle(theme),
                minHeight: 88,
                paddingTop: 16,
                paddingBottom: 16,
                ...style,
            }}
        >
            <Grid gutter="sm">
                <Grid.Col span={2} />
                <Grid.Col span={8}>
                    <Box
                        component="span"
                        style={{
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            fontSize: 11,
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.48)',
                        }}
                    >
                        {data.label}
                    </Box>
                </Grid.Col>
                <Grid.Col span={2} style={{ textAlign: 'right' }}>
                    <Box
                        onClick={dirty ? onSave : undefined}
                        style={{
                            color: dirty ? SAVE_HEX : 'transparent',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            cursor: dirty ? 'pointer' : 'default',
                            filter: dirty ? undefined : 'none',
                            borderRadius: 8,
                            padding: '2px 4px',
                            transition: 'color 175ms ease, filter 175ms ease',
                        }}
                        onMouseEnter={(e) => {
                            if (dirty) {
                                e.currentTarget.style.color = SAVE_HEX + 'aa';
                                e.currentTarget.style.filter = 'brightness(1.08)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (dirty) {
                                e.currentTarget.style.color = SAVE_HEX;
                                e.currentTarget.style.filter = 'none';
                            }
                        }}
                        role={dirty ? 'button' : undefined}
                    >
                        {dirty ? (
                            <FontAwesomeIcon
                                icon="circle-check"
                                style={{
                                    width: '0.85em',
                                    fontSize: '1.35rem',
                                }}
                            />
                        ) : null}
                    </Box>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Slider
                        color="pulsar"
                        disabled={data.options.disabled}
                        onChange={onChange}
                        value={currValue}
                        step={data.options.step != null ? data.options.step : 1}
                        min={data.options.min}
                        max={data.options.max}
                        size="md"
                        label={(v) => v}
                        thumbSize={22}
                        mt="md"
                        styles={{
                            root: { paddingTop: 4 },
                            thumb: {
                                borderWidth: 2,
                                borderColor: theme.colors.pulsar[4],
                                backgroundColor: '#ffffff',
                                boxShadow: `0 2px 10px ${theme.colors.pulsar[6]}55`,
                            },
                            track: {
                                height: 6,
                                background: 'rgba(255,255,255,0.08)',
                            },
                            bar: {
                                height: 6,
                                background: `linear-gradient(90deg, ${theme.colors.pulsar[7]} 0%, ${theme.colors.pulsar[4]} 100%)`,
                            },
                        }}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};
