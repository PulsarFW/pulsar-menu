/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Textarea, useMantineTheme } from '@mantine/core';
import Nui from '../../util/Nui';
import { fieldBlockStyle, labelFieldStyles } from '../../theme/menuAppearance';

export default ({ data }) => {
    const theme = useMantineTheme();
    const [value, setValue] = useState(
        data.options.current == null ? '' : data.options.current,
    );

    const onChange = (event) => {
        setValue(event.target.value);
        Nui.send('Selected', {
            id: data.id,
            data: { value: event.target.value },
        });
    };

    const maxLength = data.options.max != null ? data.options.max : 1024;

    return (
        <Box
            style={{
                ...fieldBlockStyle(theme),
                opacity: data.options.disabled ? 0.5 : 1,
                minHeight: 88,
            }}
        >
            <Textarea
                label={data.label}
                disabled={data.options.disabled}
                value={value}
                onChange={onChange}
                autosize
                minRows={2}
                maxLength={maxLength}
                variant="unstyled"
                styles={{
                    input: {
                        color: 'rgba(255,255,255,0.92)',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: 14,
                        lineHeight: 1.45,
                        paddingTop: 2,
                    },
                    label: labelFieldStyles(),
                }}
            />
        </Box>
    );
};
