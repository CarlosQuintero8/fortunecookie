import React, { useState, useEffect } from 'react';
import fortunes from './fortunes.json';
import './App.css';

function BackgroundImage({ imageUrl, opacity }) {
	return (
		<div
			className="background-image"
			style={{
				backgroundImage: `url(${imageUrl})`,
				opacity: opacity,
			}}
		/>
	);
}

function App() {
	const [fortune, setFortune] = useState('');
	const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
	const [backgroundOpacity, setBackgroundOpacity] = useState(1);
	const [favoriteFortunes, setFavoriteFortunes] = useState([]);
	const sound = new Audio('/sounds/galleta.mp3');

	const backgroundImages = [
		'/images/bg1.jpg',
		'/images/bg2.jpg',
		'/images/bg3.jpg',
		'/images/bg4.jpg',
		'/images/bg5.jpg',
		'/images/bg6.jpg',
	];

	const handleClick = () => {
		const randomIndex = Math.floor(Math.random() * fortunes.length);
		setFortune(fortunes[randomIndex].frase);
		setBackgroundOpacity(0);

		setTimeout(() => {
			const randomImageIndex = Math.floor(
				Math.random() * backgroundImages.length,
			);
			setBackgroundImageIndex(randomImageIndex);
			setBackgroundOpacity(1);
		}, 500);

		sound.play();
	};

	const handleTwitterShare = () => {
		const tweet = `Mi fortuna: ${fortune}`;
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			tweet,
		)}`;
		window.open(url, '_blank');
	};

	const handleFacebookShare = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			window.location.href,
		)}`;
		window.open(url, '_blank');
	};

	const handleWhatsAppShare = () => {
		const message = `Mi fortuna: ${fortune}`;
		const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
		window.open(url, '_blank');
	};

	const handleSaveFortune = () => {
		const fortuneObject = fortunes.find((f) => f.frase === fortune);
		if (
			fortuneObject &&
			!favoriteFortunes.some((fav) => fav.frase === fortune)
		) {
			setFavoriteFortunes([...favoriteFortunes, fortuneObject]);
		}
	};

	return (
		<div className="App">
			<BackgroundImage
				imageUrl={backgroundImages[backgroundImageIndex]}
				opacity={backgroundOpacity}
			/>
			<h1>Galleta de la Fortuna</h1>
			<img src="/images/galleta.png" alt="Galleta" className="galleta-image" />
			<button onClick={handleClick}>Abrir galleta</button>
			{fortune && (
				<div className="fortune-message">
					{fortune}
					<div className="share-buttons">
						<button onClick={handleSaveFortune}>Guardar Frase</button>
						<button onClick={handleTwitterShare}>
							<img src="/images/twitter.png" alt="Twitter" />
						</button>
						<button onClick={handleFacebookShare}>
							<img src="/images/facebook.png" alt="Facebook" />
						</button>
						<button onClick={handleWhatsAppShare}>
							<img src="/images/whatsapp.png" alt="WhatsApp" />
						</button>
					</div>
				</div>
			)}

			{favoriteFortunes.length > 0 && (
				<div className="favorite-fortunes">
					<h2>Frases favoritas:</h2>
					<ul>
						{favoriteFortunes.map((favFortune, index) => (
							<li key={index}>
								{favFortune.frase} - {favFortune.autor}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default App;
