import { CheckCircle, XCircle } from 'phosphor-react';
import { useContext, useState } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { DrawerContext } from '../contexts/DrawerContext';

const Drawer = () => {
	const { toggleVisibility } = useContext(DrawerContext);
	const {
		changeBackgroundImage,
		darkModeActive,
		toggleDarkModeIsActive,
		username,
		changeUsername,
	} = useContext(ConfigContext);
	const [out, setOut] = useState(false);
	const [changed, setChanged] = useState(false);

	const [nameInputValue, setNameInputValue] = useState(username || '');

	const backgrounds = 16;

	function closeDrawer() {
		setOut(true);
		setTimeout(() => {
			setOut(false);
			toggleVisibility(false);
		}, 200);
	}

	return (
		<>
			<div
				id="drawer-backdrop"
				className="h-screen w-screen fixed right-0 z-2 cursor-pointer"
				onClick={closeDrawer}
				onTouchEnd={closeDrawer}
			/>
			<div
				className={`flex flex-col gap-4 fixed right-0 h-screen overflow-y-scroll w-[90vw] lg:w-[40vw] bg-zinc-950/90 shadow-lg z-0 p-8 transition-all  ${
					out ? 'animate-slideRight' : 'animate-slideLeft'
				}`}
			>
				<h2 className="mb-4 font-bold text-2xl">Configurações</h2>
				<form className="">
					<div className="flex gap-2 w-full items-end border-b-2 border-b-zinc-100/50 focus:border-b-zinc-100">
						<div className="flex flex-col gap-1 w-full mr-2 ">
							<label className="font-semibold">Seu nome</label>
							<input
								value={nameInputValue}
								onChange={(e) => {
									setNameInputValue(e.target.value);
									setChanged(e.target.value !== username);
								}}
								className="transition-all bg-transparent  outline-none w-full"
							/>
						</div>
						<button
							onClick={(e) => {
								e.preventDefault();
							}}
							className={`${
								!changed && ' hidden'
							}  text-red-600 rounded-md aspect-square flex items-center justify-center pb-2`}
						>
							<XCircle size={20} weight="bold" />
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								changeUsername(nameInputValue);
								setChanged(false);
							}}
							className={`${
								!changed && ' hidden'
							}  text-green-600 rounded-md aspect-square flex items-center justify-center pb-2`}
						>
							<CheckCircle size={20} weight="bold" />
						</button>
					</div>
				</form>
				<form className="flex flex-col gap-2">
					<span className="font-semibold">Esquema de cores</span>
					<label className="relative inline-flex items-center cursor-pointer gap-2 ">
						<input
							type="checkbox"
							checked={darkModeActive}
							className="sr-only peer"
							onChange={(e) => {
								toggleDarkModeIsActive(e.target.checked);
							}}
						/>
						<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-900 peer-checked:after:bg-zinc-100 after:border-zinc-900 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-900 "></div>
						<span className="font-medium">
							{darkModeActive ? 'Claro' : 'Escuro	'}
						</span>
					</label>
				</form>
				<form className="flex flex-col gap-2">
					<span className="font-semibold">Background</span>
					<div className="flex gap-4 flex-wrap">
						{Array.from({ length: backgrounds }).map((_, index) => (
							<button
								onClick={(e) => {
									e.preventDefault();
									changeBackgroundImage(index + 1);
								}}
								key={index}
								className=" aspect-square h-[12vh] rounded-md overflow-hidden border-zinc-200 border-2"
							>
								<img
									className="object-cover h-full"
									src={`/backgrounds-previews/p-${index + 1}.jpg`}
									alt={`Background ${index + 1}`}
								/>
							</button>
						))}
					</div>
				</form>
			</div>
		</>
	);
};

export default Drawer;
