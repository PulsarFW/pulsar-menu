import React from 'react';
import { Box, Select } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import Nui from '../../util/Nui';
import {
    fieldBlockStyle,
    labelFieldStyles,
    menuZIndex,
} from '../../theme/menuAppearance';

/** Mantine throws if two rows share the same `value`; Lua menus can repeat values by mistake. */
function uniqueSelectData(list) {
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    const out = [];
    for (const option of list) {
        const value = String(option.value);
        if (seen.has(value)) continue;
        seen.add(value);
        out.push({ value, label: option.label });
    }
    return out;
}

export default ({ data }) => {
    const theme = useMantineTheme();
    const [value, setValue] = React.useState(() =>
        data.options.current != null ? String(data.options.current) : null,
    );

    const handleChange = (next) => {
        setValue(next);
        let parsed = next;
        if (
            typeof data.options.current === 'number' &&
            next != null &&
            next !== ''
        ) {
            const n = Number(next);
            if (!Number.isNaN(n)) parsed = n;
        }
        Nui.send('Selected', {
            id: data.id,
            data: { value: parsed },
        });
    };

    const selectData = uniqueSelectData(data.options.list);

    return (
        <Box
            style={{
                ...fieldBlockStyle(theme),
                opacity: data.options.disabled ? 0.5 : 1,
                minHeight: 88,
            }}
        >
            <Select
                variant="unstyled"
                searchable={false}
                allowDeselect={false}
                disabled={data.options.disabled}
                label={data.label}
                value={value}
                onChange={handleChange}
                data={selectData}
                styles={{
                    input: {
                        color: 'rgba(255,255,255,0.92)',
                        textAlign: 'left',
                        fontSize: 14,
                    },
                    label: labelFieldStyles(),
                    option: {
                        borderRadius: 8,
                        margin: '2px 4px',
                        color: '#f8f8ff',
                    },
                    dropdown: {
                        zIndex: menuZIndex.portal,
                        background: `
                            radial-gradient(
                                ellipse 140% 60% at 50% -20%,
                                rgba(122, 34, 201, 0.25),
                                transparent 58%
                            ),
                            linear-gradient(180deg, #18141f 0%, #0e0c14 55%, #000000 100%)
                        `,
                        border: `1px solid rgba(255,255,255,0.09)`,
                        borderRadius: 12,
                        boxShadow:
                            '0 20px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
                    },
                }}
                comboboxProps={{
                    withinPortal: true,
                    zIndex: menuZIndex.portal,
                }}
            />
        </Box>
    );
};
