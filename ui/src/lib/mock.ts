// dev-only simulated Lua message stream, so `bun run dev` shows a live populated menu

import { applyMessage } from './messages';
import type { MenuDef } from './types';

const rootMenu: MenuDef = {
	id: 'root',
	label: 'Test Menu',
	items: [
		{ type: 'TEXT', id: 'root-item0', label: 'Section Heading', options: { classes: ['heading'] } },
		{ type: 'BUTTON', id: 'root-item1', label: 'Simple Button', options: { disabled: false } },
		{ type: 'BUTTON', id: 'root-item2', label: 'Success Button', options: { disabled: false, success: true } },
		{ type: 'ADVANCED', id: 'root-item3', label: 'Advanced Button', options: { disabled: false, secondaryLabel: '$500' } },
		{
			type: 'SELECT',
			id: 'root-item4',
			label: 'Select',
			options: {
				disabled: false,
				current: 1,
				list: [
					{ label: 'Option One', value: 1 },
					{ label: 'Option Two', value: 2 },
					{ label: 'Option Three', value: 3 },
				],
			},
		},
		{ type: 'CHECKBOX', id: 'root-item5', label: 'Checkbox', options: { disabled: false, selected: false } },
		{
			type: 'COLORPICKER',
			id: 'root-item6',
			options: { disabled: false, current: { r: 139, g: 92, b: 246 } },
		},
		{
			type: 'COLORLIST',
			id: 'root-item7',
			options: {
				disabled: false,
				current: 0,
				colors: [
					{ label: 'White', hex: '#ffffff' },
					{ label: 'Black', hex: '#000000' },
					{ label: 'Red', rgb: { r: 255, g: 0, b: 0 } },
					{ label: 'Green', rgb: { r: 0, g: 255, b: 0 } },
				],
			},
		},
		{ type: 'TICKER', id: 'root-item8', label: 'Ticker', options: { disabled: false, min: 1, max: 10, current: 3 } },
		{ type: 'SLIDER', id: 'root-item9', label: 'Slider', options: { disabled: false, current: 5, step: 1, min: 1, max: 20 } },
		{ type: 'INPUT', id: 'root-item10', label: 'Input', options: { disabled: false, max: 64, current: '' } },
		{ type: 'NUMBER', id: 'root-item11', label: 'Number', options: { disabled: false, current: 1 } },
		{ type: 'SUBMENU', id: 'sub-menu', label: 'Open Submenu', menu: 'sub-menu', options: { disabled: false } },
	],
};

const subMenu: MenuDef = {
	id: 'sub-menu',
	label: 'Sub Menu',
	items: [
		{ type: 'TEXT', id: 'sub-item0', label: 'You are inside a submenu.', options: {} },
		{ type: 'GOBACK', id: 'sub-item1', label: 'Back', options: { disabled: false } },
	],
};

export function startMock(): void {
	setTimeout(() => {
		applyMessage('APP_SHOW', {});
		applyMessage('SETUP_MENU', { data: rootMenu });
	}, 300);

	// Nui.send dispatches a 'nui:send' event in dev, listen and simulate Lua's SubMenu response so nav is testable
	window.addEventListener('nui:send', ((e: CustomEvent<{ event: string; data: { id: string; back?: boolean } }>) => {
		if (e.detail.event === 'MenuOpen' && e.detail.data.id === 'sub-menu') {
			applyMessage('SUBMENU_OPEN', { data: subMenu, addHistroy: !e.detail.data.back });
		}
	}) as EventListener);
}
