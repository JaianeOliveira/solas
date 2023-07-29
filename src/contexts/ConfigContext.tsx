import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const BACKGROUNDIMAGELOCALKEY = 'solas-background-image-id';
export const THEMELOCALKEY = 'solas-theme';
export const USERNAMELOCALKEY = 'solas-username';

export const ConfigContext = createContext<{
	darkModeActive: boolean;
	backgroundImage: number;
	changeBackgroundImage: (id: number) => void;
	toggleDarkModeIsActive: (to: boolean) => void;
	username: string | null;
	changeUsername: (to: string) => void;
}>({
	darkModeActive: true,
	backgroundImage: 8,
	changeBackgroundImage: () => {},
	toggleDarkModeIsActive: () => {},
	username: '',
	changeUsername: () => {},
});

export const ConfigContextProvider = ({ children }: PropsWithChildren) => {
	const [darkModeActive, setDarkModeActive] = useState<boolean>(
		localStorage.getItem(THEMELOCALKEY) === null
			? true
			: localStorage.getItem(THEMELOCALKEY) === 'dark'
	);
	const [backgroundImage, setBackgroundImage] = useState(
		Number(localStorage.getItem(BACKGROUNDIMAGELOCALKEY)) || 1
	);

	const [username, setUsername] = useState(
		localStorage.getItem(USERNAMELOCALKEY)
	);

	function changeBackgroundImage(id: number) {
		setBackgroundImage(id);
		localStorage.setItem(BACKGROUNDIMAGELOCALKEY, String(id));
	}

	function toggleDarkModeIsActive(to: boolean) {
		to
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');

		localStorage.setItem(THEMELOCALKEY, to ? 'dark' : 'light');

		setDarkModeActive(to);
	}

	function changeUsername(to: string) {
		setUsername(to);
		localStorage.setItem(USERNAMELOCALKEY, to);
	}

	useEffect(() => {
		darkModeActive
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	});

	return (
		<ConfigContext.Provider
			value={{
				darkModeActive,
				backgroundImage,
				changeBackgroundImage,
				toggleDarkModeIsActive,
				username,
				changeUsername,
			}}
		>
			{children}
		</ConfigContext.Provider>
	);
};
