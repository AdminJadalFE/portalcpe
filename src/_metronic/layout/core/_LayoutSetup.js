import { DefaultConfig } from './_LayoutConfig';
const LAYOUT_CONFIG_KEY = 'metronic-react-demo1-8100';
const getLayoutFromLocalStorage = () => {
    const ls = localStorage.getItem(LAYOUT_CONFIG_KEY);
    if (ls) {
        try {
            return JSON.parse(ls);
        }
        catch (er) {
            console.error(er);
        }
    }
    return DefaultConfig;
};
const setLayoutIntoLocalStorage = (config) => {
    try {
        localStorage.setItem(LAYOUT_CONFIG_KEY, JSON.stringify(config));
    }
    catch (er) {
        console.error(er);
    }
};
const getEmptyCssClasses = () => {
    return {
        header: [],
        headerContainer: [],
        headerMobile: [],
        headerMenu: [],
        aside: [],
        asideMenu: [],
        asideToggle: [],
        toolbar: [],
        toolbarContainer: [],
        content: [],
        contentContainer: [],
        footerContainer: [],
        sidebar: [],
        pageTitle: [],
        pageContainer: [],
    };
};
const getEmptyHTMLAttributes = () => {
    return {
        asideMenu: new Map(),
        headerMobile: new Map(),
        headerMenu: new Map(),
        headerContainer: new Map(),
        pageTitle: new Map(),
    };
};
const getEmptyCSSVariables = () => {
    return {
        body: new Map(),
    };
};
class LayoutSetup {
    static initCSSClasses() {
        LayoutSetup.classes = getEmptyCssClasses();
    }
    static initHTMLAttributes() {
        LayoutSetup.attributes = Object.assign({}, getEmptyHTMLAttributes());
    }
    static initCSSVariables() {
        LayoutSetup.cssVariables = getEmptyCSSVariables();
    }
    static initConfig(config) {
        let updatedConfig = LayoutSetup.initLayoutSettings(config);
        updatedConfig = LayoutSetup.initToolbarSetting(updatedConfig);
        return LayoutSetup.initWidthSettings(updatedConfig);
    }
    static initLayoutSettings(config) {
        var _a, _b, _c, _d, _e, _f;
        const updatedConfig = Object.assign({}, config);
        // clear body classes
        const bodyClasses = document.body.classList.value.split(' ');
        bodyClasses.forEach((cssClass) => document.body.classList.remove(cssClass));
        // clear body attributes
        const bodyAttributes = document.body.getAttributeNames().filter((t) => t.indexOf('data-') > -1);
        bodyAttributes.forEach((attr) => document.body.removeAttribute(attr));
        document.body.setAttribute('style', '');
        document.body.setAttribute('id', 'kt_app_body');
        document.body.setAttribute('data-kt-app-layout', updatedConfig.layoutType);
        document.body.setAttribute('data-kt-name', 'metronic');
        document.body.classList.add('app-default');
        const pageWidth = (_b = (_a = updatedConfig.app) === null || _a === void 0 ? void 0 : _a.general) === null || _b === void 0 ? void 0 : _b.pageWidth;
        if (updatedConfig.layoutType === 'light-header' || updatedConfig.layoutType === 'dark-header') {
            if (pageWidth === 'default') {
                const header = (_c = updatedConfig.app) === null || _c === void 0 ? void 0 : _c.header;
                if (header && header.default && header.default.container) {
                    header.default.container = 'fixed';
                }
                const toolbar = (_d = updatedConfig.app) === null || _d === void 0 ? void 0 : _d.toolbar;
                if (toolbar) {
                    toolbar.container = 'fixed';
                }
                const content = (_e = updatedConfig.app) === null || _e === void 0 ? void 0 : _e.content;
                if (content) {
                    content.container = 'fixed';
                }
                const footer = (_f = updatedConfig.app) === null || _f === void 0 ? void 0 : _f.footer;
                if (footer) {
                    footer.container = 'fixed';
                }
                const updatedApp = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, updatedConfig.app), header), toolbar), content), footer);
                return Object.assign(Object.assign({}, updatedConfig), { app: updatedApp });
            }
        }
        return updatedConfig;
    }
    static initToolbarSetting(config) {
        var _a, _b, _c, _d, _e;
        const updatedConfig = Object.assign({}, config);
        const appHeaderDefaultContent = (_c = (_b = (_a = updatedConfig.app) === null || _a === void 0 ? void 0 : _a.header) === null || _b === void 0 ? void 0 : _b.default) === null || _c === void 0 ? void 0 : _c.content;
        if (appHeaderDefaultContent === 'page-title') {
            const toolbar = (_d = updatedConfig.app) === null || _d === void 0 ? void 0 : _d.toolbar;
            if (toolbar) {
                toolbar.display = false;
                const updatedApp = Object.assign(Object.assign({}, updatedConfig.app), toolbar);
                return Object.assign(Object.assign({}, updatedConfig), { app: updatedApp });
            }
            return updatedConfig;
        }
        const pageTitle = (_e = updatedConfig.app) === null || _e === void 0 ? void 0 : _e.pageTitle;
        if (pageTitle) {
            pageTitle.description = false;
            pageTitle.breadCrumb = true;
            const updatedApp = Object.assign(Object.assign({}, updatedConfig.app), pageTitle);
            return Object.assign(Object.assign({}, updatedConfig), { app: updatedApp });
        }
        return updatedConfig;
    }
    static initWidthSettings(config) {
        var _a, _b, _c, _d, _e, _f;
        const updatedConfig = Object.assign({}, config);
        const pageWidth = (_b = (_a = updatedConfig.app) === null || _a === void 0 ? void 0 : _a.general) === null || _b === void 0 ? void 0 : _b.pageWidth;
        if (!pageWidth || pageWidth === 'default') {
            return config;
        }
        const header = (_c = updatedConfig.app) === null || _c === void 0 ? void 0 : _c.header;
        if (header && header.default) {
            header.default.container = pageWidth;
        }
        const toolbar = (_d = updatedConfig.app) === null || _d === void 0 ? void 0 : _d.toolbar;
        if (toolbar) {
            toolbar.container = pageWidth;
        }
        const content = (_e = updatedConfig.app) === null || _e === void 0 ? void 0 : _e.content;
        if (content) {
            content.container = pageWidth;
        }
        const footer = (_f = updatedConfig.app) === null || _f === void 0 ? void 0 : _f.footer;
        if (footer) {
            footer.container = pageWidth;
        }
        const updatedApp = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, updatedConfig.app), header), toolbar), content), footer);
        return Object.assign(Object.assign({}, updatedConfig), { app: updatedApp });
    }
    static updatePartialConfig(fieldsToUpdate) {
        const config = LayoutSetup.config;
        const updatedConfig = Object.assign(Object.assign({}, config), fieldsToUpdate);
        LayoutSetup.initCSSClasses();
        LayoutSetup.initCSSVariables();
        LayoutSetup.initHTMLAttributes();
        LayoutSetup.isLoaded = false;
        LayoutSetup.config = LayoutSetup.initConfig(Object.assign({}, updatedConfig));
        LayoutSetup.isLoaded = true; // remove loading there
        return updatedConfig;
    }
    static setConfig(config) {
        setLayoutIntoLocalStorage(config);
    }
}
LayoutSetup.isLoaded = false;
LayoutSetup.config = getLayoutFromLocalStorage();
LayoutSetup.classes = getEmptyCssClasses();
LayoutSetup.attributes = getEmptyHTMLAttributes();
LayoutSetup.cssVariables = getEmptyCSSVariables();
LayoutSetup.bootstrap = (() => {
    LayoutSetup.updatePartialConfig(LayoutSetup.config);
})();
export { LayoutSetup, getLayoutFromLocalStorage, setLayoutIntoLocalStorage, getEmptyCssClasses, getEmptyCSSVariables, getEmptyHTMLAttributes, };
