import { PropsWithChildren, createContext, useState } from 'react';

export const DrawerContext = createContext<{
	drawerIsOpen: boolean;
	toggleVisibility: (changeTo?: boolean) => void;
}>({
	drawerIsOpen: false,
	toggleVisibility: () => {},
});

export const DrawerContextProvider = ({ children }: PropsWithChildren) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	function toggleVisibility(changeTo?: boolean) {
		setDrawerIsOpen((prevState) => changeTo ?? !prevState);
	}
	return (
		<DrawerContext.Provider value={{ drawerIsOpen, toggleVisibility }}>
			{children}
		</DrawerContext.Provider>
	);
};
