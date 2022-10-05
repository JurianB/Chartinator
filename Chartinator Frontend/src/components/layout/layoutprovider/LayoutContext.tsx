import * as React from 'react';

export interface LayoutProviderContextProps {
    children: React.ReactNode[];
}

export interface LayoutContextProps {
    networkActivity: boolean;
    setNetworkActivity: (input: boolean) => typeof input;
    fullScreen: boolean;
    setFullScreen: (input: boolean) => typeof input;
}

export const LayoutContext = React.createContext<LayoutContextProps>({
    networkActivity: false,
    setNetworkActivity: (input: boolean) => input,
    fullScreen: true,
    setFullScreen: (input: boolean) => input
});

const LayoutProviderContext = (props: LayoutProviderContextProps) => {
    const [networkActivity, updateNetworkActivity] = React.useState<boolean>(false);
    const [fullScreen, updateFullScreen] = React.useState<boolean>(false);

    const setNetworkActivity = (input: boolean) => {
        updateNetworkActivity(input);
        return input;
    };

    const setFullScreen = (input: boolean) => {
        updateFullScreen(input);
        return input;
    };

    return (
        <LayoutContext.Provider value={{ networkActivity, setNetworkActivity, fullScreen, setFullScreen }}>
            {props.children}
        </LayoutContext.Provider>
    );
};

const useLayout = () => {
    const context = React.useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('LayoutProvider not used');
    }
    return context;
};

export { LayoutProviderContext, useLayout };
