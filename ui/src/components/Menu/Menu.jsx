import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionIcon, Alert, Box, Text, useMantineTheme } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Draggable from 'react-draggable';

import Nui from '../../util/Nui';

import {
    AdvancedButton,
    Button,
    Checkbox,
    ColorList,
    ColorPicker,
    Slider,
    SubMenu,
    SubMenuBack,
    Ticker,
    Input,
    Number,
    Select,
    Text as MenuTextBlock,
} from '../MenuItems';

import Logo from '../../assets/logo.png';
import {
    menuUi,
    menuZIndex,
    panelShellStyle,
    scrollRegionStyle,
} from '../../theme/menuAppearance';

export default function Menu() {
    const theme = useMantineTheme();
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu.menu);
    const prevMenu = useSelector((state) => state.menu.prevMenu);
    const hidden = useSelector((state) => state.app.hidden);

    const goBackRow = useMemo(() => {
        const items = menu.items || [];
        return items.find(
            (it) => String(it?.type ?? '').toUpperCase() === 'GOBACK',
        );
    }, [menu.items]);

    const showHeaderBack =
        prevMenu.length > 0 && !goBackRow?.options?.disabled;

    const [pos, setPos] = useState({ x: 25, y: 25 });

    useEffect(() => {
        setPos({ x: 25, y: 25 });
    }, [hidden]);

    const onChange = (e, p) => {
        e.preventDefault();
        e.stopPropagation();
        setPos({ x: p.x, y: p.y });
    };

    const [elements, setElements] = useState([]);
    useEffect(() => {
        setElements(
            (menu.items || []).map((item, i) => {
                switch (item.type.toUpperCase()) {
                    case 'ADVANCED':
                        return (
                            <AdvancedButton
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'CHECKBOX':
                        return (
                            <Checkbox
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'SLIDER':
                        return (
                            <Slider
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'TICKER':
                        return (
                            <Ticker
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'COLORPICKER':
                        return (
                            <ColorPicker
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'COLORLIST':
                        return (
                            <ColorList
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'INPUT':
                        return (
                            <Input
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'NUMBER':
                        return (
                            <Number
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'SELECT':
                        return (
                            <Select
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'TEXT':
                        return (
                            <MenuTextBlock
                                key={`${menu.id}-${i}`}
                                mId={menu.id}
                                id={i}
                                data={item}
                            />
                        );
                    case 'SUBMENU':
                        return (
                            <SubMenu
                                key={`${menu.id}-${i}`}
                                id={i}
                                mId={menu.id}
                                data={item}
                            />
                        );
                    case 'GOBACK':
                        return (
                            <SubMenuBack
                                key={`${menu.id}-${i}`}
                                id={i}
                                mId={menu.id}
                                data={item}
                            />
                        );
                    default:
                        return (
                            <Button
                                key={`${menu.id}-${i}`}
                                id={i}
                                mId={menu.id}
                                data={item}
                            />
                        );
                }
            }),
        );
    }, [menu]);

    const onCloseMenu = () => {
        Nui.send('Close');
        dispatch({
            type: 'CLEAR_MENU',
        });
    };

    const onHeaderBack = () => {
        if (!showHeaderBack) {
            return;
        }
        Nui.send('FrontEndSound', { sound: 'BACK' });
        if (goBackRow?.id != null) {
            Nui.send('Selected', { id: goBackRow.id });
        }
        dispatch({ type: 'SUBMENU_BACK' });
    };

    const panelPad = menuUi.gap + 5;

    /* Do not mount the draggable/menu layer while hidden — avoids stray layout and focus issues. */
    if (hidden) {
        return null;
    }

    return (
        <Draggable
            handle=".drag-handle"
            bounds="#app"
            defaultPosition={{ x: 25, y: 25 }}
            position={pos}
            onDrag={onChange}
        >
            <Box
                style={{
                    pointerEvents: 'auto',
                    position: 'absolute',
                    margin: 'auto',
                    width: 500,
                    maxHeight: 800,
                    zIndex: menuZIndex.panel,
                    padding: panelPad,
                    overflow: 'hidden',
                    ...panelShellStyle(theme),
                }}
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    {showHeaderBack ? (
                        <ActionIcon
                            variant="light"
                            color="pulsar"
                            radius="xl"
                            aria-label="Back"
                            onClick={(e) => {
                                e.stopPropagation();
                                onHeaderBack();
                            }}
                            size="sm"
                            styles={{
                                root: {
                                    boxShadow:
                                        '0 1px 3px rgba(0,0,0,0.4), 0 0 4px rgba(122,34,201,0.14)',
                                    border: `1px solid ${theme.colors.pulsar[5]}44`,
                                    background: `linear-gradient(
                                        155deg,
                                        rgba(122,34,201,0.36) 0%,
                                        rgba(20,7,31,0.52) 100%
                                    )`,
                                    color: '#f5ebff',
                                    '&:hover': {
                                        filter: 'brightness(1.06)',
                                    },
                                },
                            }}
                        >
                            <FontAwesomeIcon icon="arrow-left" size="sm" />
                        </ActionIcon>
                    ) : null}
                    <ActionIcon
                        variant="light"
                        color="red"
                        radius="xl"
                        aria-label="Close menu"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCloseMenu();
                        }}
                        size="sm"
                        styles={{
                            root: {
                                boxShadow:
                                    '0 1px 3px rgba(0,0,0,0.42), 0 0 4px rgba(198,40,57,0.16)',
                                border: `1px solid ${theme.colors.red[4]}55`,
                                background: `linear-gradient(
                                    155deg,
                                    rgba(198, 40, 57, 0.42) 0%,
                                    rgba(55, 10, 16, 0.58) 100%
                                )`,
                                color: '#f5ebff',
                                '&:hover': {
                                    filter: 'brightness(1.06)',
                                },
                            },
                        }}
                    >
                        <FontAwesomeIcon icon="x" size="sm" />
                    </ActionIcon>
                </Box>

                <Box
                    component="img"
                    src={Logo}
                    alt=""
                    style={{
                        position: 'absolute',
                        opacity: 0.04,
                        top: -80,
                        right: 0,
                        left: 0,
                        margin: 'auto',
                        width: '100%',
                        maxWidth: 280,
                        zIndex: 0,
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}
                />

                <Box
                    className="drag-handle"
                    pb="lg"
                    pr={showHeaderBack ? 74 : 36}
                    style={{
                        cursor: 'move',
                        userSelect: 'none',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Text
                        fw={700}
                        size="xl"
                        tt="uppercase"
                        lh={1.2}
                        c="rgba(255,255,255,0.93)"
                        lineClamp={2}
                        style={{
                            textAlign: 'left',
                            letterSpacing: '0.22em',
                        }}
                    >
                        {Boolean(menu.label) ? menu.label : 'Pulsar Framework'}
                    </Text>
                    <Box
                        mt={12}
                        style={{
                            height: 2,
                            width: '52%',
                            maxWidth: 220,
                            borderRadius: 999,
                            background: `linear-gradient(90deg, ${theme.colors.pulsar[4]}aa 0%, ${theme.colors.pulsar[7]}44 72%, transparent 100%)`,
                        }}
                    />
                </Box>

                <Box className="pulsar-menu-scroll" style={scrollRegionStyle()}>
                    {elements.length > 0 ? (
                        elements
                    ) : (
                        <Alert variant="filled" color="red">
                            Menu Has No Content
                        </Alert>
                    )}
                </Box>
            </Box>
        </Draggable>
    );
}
