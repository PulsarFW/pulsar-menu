// shared types for the Lua <-> NUI contract, load-bearing since ~9 other resources build menus via plsr.Menu:Create(...)

export interface RGB {
	r: number;
	g: number;
	b: number;
}

export interface ColorListEntry {
	label: string;
	hex?: string;
	rgb?: RGB;
}

export interface SelectOption {
	label: string;
	value: string | number;
}

interface BaseOptions {
	disabled: boolean;
}

export interface ButtonItem {
	type: 'BUTTON';
	id: string;
	label: string;
	options: BaseOptions & { success?: boolean; error?: boolean };
}

export interface AdvancedButtonItem {
	type: 'ADVANCED';
	id: string;
	label: string;
	options: BaseOptions & { secondaryLabel: string };
}

export interface CheckboxItem {
	type: 'CHECKBOX';
	id: string;
	label: string;
	options: BaseOptions & { selected: boolean };
}

export interface SliderItem {
	type: 'SLIDER';
	id: string;
	label: string;
	options: BaseOptions & { min: number; max: number; current: number; step?: number };
}

export interface TickerItem {
	type: 'TICKER';
	id: string;
	label: string;
	options: BaseOptions & { min?: number; max: number; current: number };
}

export interface ColorPickerItem {
	type: 'COLORPICKER';
	id: string;
	options: BaseOptions & { current: RGB };
}

export interface ColorListItem {
	type: 'COLORLIST';
	id: string;
	options: BaseOptions & { current: number; colors: ColorListEntry[] };
}

export interface InputItem {
	type: 'INPUT';
	id: string;
	label: string;
	options: BaseOptions & { max: number; current?: string };
}

export interface NumberItem {
	type: 'NUMBER';
	id: string;
	label: string;
	options: BaseOptions & { current?: number; min?: number; max?: number; step?: number };
}

export interface SelectItem {
	type: 'SELECT';
	id: string;
	label: string;
	options: BaseOptions & { current: string | number; list: SelectOption[] };
}

export interface TextItem {
	type: 'TEXT';
	id: string;
	label: string;
	options: { classes?: string[] };
}

export interface SubmenuItem {
	type: 'SUBMENU';
	id: string;
	label: string;
	menu: string;
	options: BaseOptions;
}

export interface GoBackItem {
	type: 'GOBACK';
	id: string;
	label: string;
	options: BaseOptions;
}

export type MenuItem =
	| ButtonItem
	| AdvancedButtonItem
	| CheckboxItem
	| SliderItem
	| TickerItem
	| ColorPickerItem
	| ColorListItem
	| InputItem
	| NumberItem
	| SelectItem
	| TextItem
	| SubmenuItem
	| GoBackItem;

export interface MenuDef {
	id: string;
	label: string;
	items: MenuItem[];
}

export type SoundName = 'SELECT' | 'BACK' | 'UPDOWN' | 'DISABLED';
