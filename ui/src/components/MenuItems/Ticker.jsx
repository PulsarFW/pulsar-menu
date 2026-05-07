import React, { useState } from 'react';
import { ActionIcon, NumberInput } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

import Nui from '../../util/Nui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fieldBlockStyle } from '../../theme/menuAppearance';

const Ticker = (props) => {
    const theme = useMantineTheme();
    const [value, setValue] = useState(props.data.options.current);

    const onLeft = () => {
        if (
            (props.data.options.min && value - 1 < props.data.options.min) ||
            value - 1 < 0
        ) {
            setValue(props.data.options.max);
        } else {
            setValue(value - 1);
        }
        Nui.send('FrontEndSound', { sound: 'UPDOWN' });
        Nui.send('Selected', {
            id: props.data.id,
            data: { value: value === 0 ? props.data.options.max : value - 1 },
        });
    };

    const onRight = () => {
        if (value + 1 > props.data.options.max) {
            setValue(props.data.options.min ? props.data.options.min : 0);
        } else {
            setValue(value + 1);
        }

        Nui.send('FrontEndSound', { sound: 'UPDOWN' });
        Nui.send('Selected', {
            id: props.data.id,
            data: {
                value:
                    value === props.data.options.max
                        ? props.data.options.min
                        : value + 1,
            },
        });
    };

    const updateIndex = (v) => {
        if (props.data.options.disabled) return;

        const num = typeof v === 'number' ? v : parseInt(String(v), 10);

        if (Number.isNaN(num)) {
            setValue(props.data.options.min);
            Nui.send('Selected', {
                id: props.data.id,
                data: { value: props.data.options.min },
            });
            return;
        }

        let next = num;
        if (next > props.data.options.max) {
            next = props.data.options.max;
        } else if (next < props.data.options.min) {
            next = props.data.options.max;
        }
        setValue(next);
        Nui.send('Selected', {
            id: props.data.id,
            data: { value: next },
        });
    };

    const style = props.data.options.disabled ? { opacity: 0.5 } : {};

    return (
        <div
            style={{
                ...fieldBlockStyle(theme),
                minHeight: 92,
                lineHeight: 1.4,
                ...style,
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridGap: 4,
                    gridTemplateColumns: '18% 64% 18%',
                    gridTemplateRows: 'auto auto',
                }}
            >
                <div
                    style={{
                        gridColumn: 2,
                        gridRow: 1,
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.48)',
                        textAlign: 'center',
                    }}
                >
                    {props.data.label}
                </div>
                <div
                    style={{
                        gridColumn: 1,
                        gridRow: '1 / 3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ActionIcon
                        variant="light"
                        color="pulsar"
                        radius="xl"
                        size="lg"
                        onClick={onLeft}
                        disabled={props.data.options.disabled}
                        styles={{
                            root: {
                                border: `1px solid ${theme.colors.pulsar[7]}55`,
                                background: `linear-gradient(160deg, rgba(122,34,201,0.35) 0%, rgba(8,6,12,0.7) 100%)`,
                            },
                        }}
                    >
                        <FontAwesomeIcon icon="chevron-left" />
                    </ActionIcon>
                </div>
                <div
                    style={{
                        gridColumn: 2,
                        gridRow: 2,
                        textAlign: 'center',
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.88)',
                    }}
                >
                    <NumberInput
                        variant="unstyled"
                        hideControls
                        clampBehavior="none"
                        disabled={props.data.options.disabled}
                        value={value}
                        onChange={updateIndex}
                        min={props.data.options.min}
                        max={props.data.options.max}
                        styles={{
                            input: {
                                color: theme.colors.pulsar[4],
                                textAlign: 'center',
                                width: 48,
                                display: 'inline-block',
                                fontSize: 16,
                                fontWeight: 600,
                                fontVariantNumeric: 'tabular-nums',
                            },
                            wrapper: { display: 'inline-block', width: 48 },
                        }}
                    />{' '}
                    <span style={{ opacity: 0.45 }}>/</span>{' '}
                    {props.data.options.max}
                </div>
                <div
                    style={{
                        gridColumn: 3,
                        gridRow: '1 / 3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ActionIcon
                        variant="light"
                        color="pulsar"
                        radius="xl"
                        size="lg"
                        onClick={onRight}
                        disabled={props.data.options.disabled}
                        styles={{
                            root: {
                                border: `1px solid ${theme.colors.pulsar[7]}55`,
                                background: `linear-gradient(160deg, rgba(122,34,201,0.35) 0%, rgba(8,6,12,0.7) 100%)`,
                            },
                        }}
                    >
                        <FontAwesomeIcon icon="chevron-right" />
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
};

export default Ticker;
