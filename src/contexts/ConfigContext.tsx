/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-document @typescript-eslint/ban-ts-comment

import { Photo as PexelsPhoto } from 'pexels';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { pexelsClient } from '../services/pexels';
import { Photo, defaultBackgroundImage } from '../utils';

export const BACKGROUNDIMAGELOCALKEY = 'solas-background-image-id';
export const BACKGROUNDIMAGECACHELOCALKEY = 'solas-background-image-cache';
export const THEMELOCALKEY = 'solas-theme';
export const USERNAMELOCALKEY = 'solas-username';

export const ConfigContext = createContext<{
	darkModeActive: boolean;
	backgroundImage: Photo | undefined;
	backgrounds: Pick<Photo, 'id' | 'alt' | 'avgColor' | 'preview'>[];
	changeBackgroundImage: (id: number) => void;
	toggleDarkModeIsActive: (to: boolean) => void;
	username: string | null;
	changeUsername: (to: string) => void;
}>({
	darkModeActive: true,
	backgroundImage: defaultBackgroundImage,
	backgrounds: [],
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
	const [backgroundImage, setBackgroundImage] = useState<Photo>();

	const [backgrounds, setBackgrounds] = useState<
		Pick<Photo, 'id' | 'alt' | 'avgColor' | 'preview'>[]
	>([]);

	const [username, setUsername] = useState(
		localStorage.getItem(USERNAMELOCALKEY)
	);

	async function changeBackgroundImage(id: number) {
		try {
			const cache = localStorage.getItem('collectionCache');
			// @ts-ignore
			let data: Photo;

			if (cache) {
				const collection = JSON.parse(cache);
				data = collection[id];

				localStorage.setItem(BACKGROUNDIMAGELOCALKEY, String(data.id));
				setBackgroundImage(data);
				localStorage.setItem(
					BACKGROUNDIMAGECACHELOCALKEY,
					JSON.stringify(data)
				);
			} else {
				// @ts-ignore
				const photo: PexelsPhoto = await pexelsClient.photos.show({ id });
				data = {
					id: photo.id,
					alt: photo.alt || '',
					avgColor: photo.avg_color || '#222222',
					url: photo.url,
					src: photo.src.original,
					preview: photo.src.small,
					photographer: photo.photographer,
				};
			}

			localStorage.setItem(BACKGROUNDIMAGELOCALKEY, String(data.id));
			setBackgroundImage(data);
			localStorage.setItem(BACKGROUNDIMAGECACHELOCALKEY, JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}

		return true;
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

	useEffect(() => {
		const cachedImages = localStorage.getItem('collectionCache');
		const cachedBackground = localStorage.getItem(BACKGROUNDIMAGECACHELOCALKEY);

		let imageToSave: Photo | undefined = undefined;

		if (!cachedImages) {
			pexelsClient.collections
				.media({
					id: 'o9dragu',
					per_page: 25,
				})
				.then((response) => {
					// @ts-ignore
					const data: Photo[] = response.media.map((photo: PexelsPhoto) => ({
						id: photo.id,
						alt: photo.alt || '',
						avgColor: photo.avg_color || '#222222',
						url: photo.url,
						src: photo.src.original,
						preview: photo.src.small,
						photographer: photo.photographer,
					}));
					const cache: Record<number, Photo> = {};
					data.forEach((image) => (cache[image.id] = image));

					localStorage.setItem('collectionCache', JSON.stringify(cache));
					setBackgrounds(data);
					imageToSave = data[0];
				})
				.catch((error) => console.log(error));
		} else {
			const cache = JSON.parse(cachedImages);
			const data: Photo[] = Object.values(cache);
			setBackgrounds(data);
			imageToSave = data[0];
		}

		if (!cachedBackground && imageToSave !== undefined) {
			localStorage.setItem(
				BACKGROUNDIMAGECACHELOCALKEY,
				JSON.stringify(imageToSave)
			);
			setBackgroundImage(imageToSave);
		} else {
			console.log(cachedBackground);
			setBackgroundImage(JSON.parse(cachedBackground || ''));
		}
	}, []);

	return (
		<ConfigContext.Provider
			value={{
				darkModeActive,
				backgroundImage,
				backgrounds,
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
