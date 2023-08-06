export type Photo = {
	id: number;
	src: string;
	preview: string;
	url: string;
	photographer: string;
	avgColor: string;
	alt: string;
};

export const defaultBackgroundImage: Photo = {
	alt: 'Wooden House Near a Lake',
	avgColor: '#495C4D',
	id: 12825195,
	photographer: 'Tom Verdoot',
	src: 'https://images.pexels.com/photos/12825195/pexels-photo-12825195.png',
	preview:
		'https://images.pexels.com/photos/12825195/pexels-photo-12825195.png?auto=compress&cs=tinysrgb&h=130',
	url: 'https://www.pexels.com/photo/wooden-house-near-a-lake-12825195/',
};
