/*global chrome*/

import { Gear } from 'phosphor-react';
import { useContext, useRef } from 'react';
import Clock from './components/Clock';
import Drawer from './components/Drawer';
import { ConfigContext } from './contexts/ConfigContext';
import { DrawerContext } from './contexts/DrawerContext';

export default function App() {
	const { username, backgroundImage } = useContext(ConfigContext);
	const { toggleVisibility, drawerIsOpen } = useContext(DrawerContext);
	const searchInputRef = useRef('');

	return (
		<div
			className={`relative bg-zinc-300 dark:bg-zinc-950 text-zinc-200 h-screen w-screen flex items-center justify-center flex-col bg-image bg-cover bg-no-repeat`}
		>
			<div className="inset-0 absolute -z-0">
				<img
					src={`/backgrounds/w-${backgroundImage}.jpg`}
					className="w-full h-full"
					alt="Background image"
				/>
			</div>
			<div className="relative z-[1] flex flex-col items-center justify-center h-screen w-screen ">
				<div className="flex flex-col lg:flex-row gap-3 lg:gap-5 dark:text-zinc-200 text-zinc-950 w-full items-center justify-center">
					<div className="flex justify-center flex-col items-center lg:items-end pl-4 lg:py-8 lg:w-1/2 w-full">
						<Clock />
					</div>

					<div className="dark:bg-zinc-200 bg-zinc-950 rounded-full h-1 w-1/2 lg:h-full lg:w-1 transition-all"></div>
					<div className="flex flex-col gap-2 justify-center items-center lg:items-start select-none transition-all w-full lg:w-1/2">
						<h2 className="text-md font-semibold lg:text-xl">Olá {username}</h2>
						<form
							className="flex items-center lg:justify-start w-1/2"
							onSubmit={(e) => {
								e.preventDefault();
								searchInputRef.current &&
									chrome.search?.query({ text: searchInputRef.current });
							}}
						>
							<input
								onChange={(e) => (searchInputRef.current = e.target.value)}
								placeholder="O que está na sua mente?"
								type="text"
								className="w-full placeholder:text-zinc-200/40 text-center lg:text-start dark:bg-zinc-200/10 bg-zinc-950/50 text-sm rounded-full outline-none px-4 py-2 backdrop-blur-sm"
							/>
							<button type="submit" className="hidden"></button>
						</form>
					</div>
				</div>
				<button
					onClick={() => toggleVisibility()}
					className="absolute right-[3vw] bottom-[4vh] dark:text-zinc-200 text-zinc-900 transition-all"
				>
					<Gear size={24} weight="fill" />
				</button>
				{drawerIsOpen && <Drawer />}
			</div>
		</div>
	);
}
