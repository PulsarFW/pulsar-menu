// app visibility + menu/navigation-stack state, SUBMENU_BACK's Nui side effects live in the explicit goBack() function below

import { Nui } from '../nui';
import type { MenuDef } from '../types';

export const appState = $state({
	hidden: true,
});

export const menuState = $state({
	menu: null as MenuDef | null,
	stack: [] as MenuDef[],
});

export function handleMenuMessage(type: string, data: Record<string, unknown>) {
	switch (type) {
		case 'APP_SHOW':
			appState.hidden = false;
			break;
		case 'APP_HIDE':
			appState.hidden = true;
			break;
		case 'SETUP_MENU':
			menuState.stack = [];
			menuState.menu = data.data as MenuDef;
			break;
		case 'SUBMENU_OPEN': {
			const payload = data as { data: MenuDef; addHistroy: boolean };
			if (payload.addHistroy && menuState.menu) {
				menuState.stack.push(menuState.menu);
			}
			menuState.menu = payload.data;
			break;
		}
		case 'CLEAR_MENU':
			menuState.menu = null;
			menuState.stack = [];
			break;
		case 'UPDATE_MENU':
			menuState.menu = data.data as MenuDef;
			break;
	}
}

// closes the whole menu, the "X" button in the header
export function closeMenu() {
	Nui.close();
	menuState.menu = null;
	menuState.stack = [];
}

// GOBACK row navigation, the row's own Selected{id}/FrontEndSound calls belong to SubmenuBack.svelte
export function goBack() {
	if (!menuState.menu) return;
	Nui.menuClose(menuState.menu.id);

	if (menuState.stack.length > 0) {
		const prev = menuState.stack.pop()!;
		menuState.menu = prev;
		Nui.menuOpen(prev.id, true);
	} else {
		menuState.menu = null;
		Nui.close();
	}
}
