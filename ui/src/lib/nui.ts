// outbound UI -> Lua transport, fire-and-forget, real work comes back via SendNUIMessage pushes in messages.ts

const RESOURCE_NAME = 'pulsar_menu';

async function send(event: string, data: unknown = {}): Promise<void> {
	if (import.meta.env.DEV) {
		// Lets lib/mock.ts observe outbound sends (e.g. MenuOpen for a submenu)
		// and simulate the corresponding Lua response, without a full DevPanel
		window.dispatchEvent(new CustomEvent('nui:send', { detail: { event, data } }));
		return;
	}
	try {
		await fetch(`https://${RESOURCE_NAME}/${event}`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(data),
		});
	} catch {
		// Expected to fail outside the actual NUI browser
	}
}

export const Nui = {
	menuOpen: (id: string, back?: boolean) => send('MenuOpen', { id, back }),
	menuClose: (id: string) => send('MenuClose', { id }),
	close: () => send('Close'),
	selected: (id: string, data?: unknown) => send('Selected', { id, data }),
	frontEndSound: (sound: import('./types').SoundName) => send('FrontEndSound', { sound }),
	toggleFocusLoss: () => send('ToggleFocusLoss'),
};
