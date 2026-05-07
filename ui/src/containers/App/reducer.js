/**
 * NUI overlay must boot hidden so CEF never shows the menu shell unless Lua sends APP_SHOW.
 *
 * - Production bundle: webpack does not expose `module.hot` → hidden = true always (do not rely
 *   on NODE_ENV or FiveM natives; both have failed in edge pipelines).
 * - Dev server (`webpack-dev-server` + HotModuleReplacementPlugin): `module.hot` exists → hidden
 *   false so designers can iterate without LUA messages.
 */
function shouldStartWithMenuHidden() {
    try {
        if (typeof module !== 'undefined' && module && module.hot) {
            return false;
        }
    } catch {
        /* ignore */
    }
    return true;
}

export const initialState = {
    hidden: shouldStartWithMenuHidden(),
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP_SHOW':
            return {
                ...state,
                hidden: false,
            };
        case 'APP_HIDE':
            return {
                ...state,
                hidden: true,
            };
        default:
            return state;
    }
};

export default appReducer;
