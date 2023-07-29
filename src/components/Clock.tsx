import { memo, useEffect, useState } from 'react';

const Clock = memo(() => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<h2
				className="font-beckman text-[5rem] lg:text-[6rem] font-semibold text-center select-none transition-all mb-3"
				style={{ lineHeight: 0.9 }}
			>
				{time.toLocaleTimeString().split(':')[0]} <br />
				{time.toLocaleTimeString().split(':')[1]}
			</h2>

			<h4 className="font-beckman uppercase text-sm lg:text-lg text-center font-semibold select-none transition-all">
				{time.toLocaleDateString('pt-BR', {
					day: '2-digit',
					month: 'long',
				})}
			</h4>
			<h4 className="font-beckman uppercase text-sm lg:text-lg font-semibold	text-center select-none transition-all">
				{time.toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0]}
			</h4>
		</div>
	);
});

export default Clock;
