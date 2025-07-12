import styled from 'styled-components';

export const ContainerStyled = styled.main`
	/* position: relative; */
	/* min-height: 100vh; */
	width: 100%;
	/* background-color: red;/ */
`;

export const MasonicStyled = styled.div`
	padding: 8px;
	width: 100%;
	// max-width: 960px;
	margin: 0 auto;
	box-sizing: border-box;
`;

export const HeaderStyled: any = styled.h1`
	font-family: Quantico, sans-serif;
	font-size: 1.5rem;
	font-weight: 900;
	letter-spacing: -0.075em;
	/* color: #fff; */
	/* position: fixed; */
	/* left: 0; */
	/* right: 0; */
	/* top: 0; */
	/* padding: 2rem; */
	z-index: 999;
	/* width: 80%; */
	text-align: center;
	transition:
		padding 200ms ease-in-out,
		background-color 200ms 200ms linear;

	/* minify */
	padding: ${(props: any) => (props.minify ? '0.5rem' : null)};
	color: ${(props: any) => (props.minify ? '#f2fafe' : null)};
	background-color: ${(props: any) => (props.minify ? '#1d2326' : null)};
`;

export const CardStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100px;
	background-color: #1d2326;
	border-radius: 1rem;
	transition: transform 400ms ease-in-out;

	span:last-of-type {
		color: #fff;
		padding: 0.5rem;
	}
	&:hover {
		position: relative;
		background-color: #fff;
		transform: scale(1.125);
		z-index: 1000;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);

		span:last-of-type {
			color: #1d2326;
			padding: 0.5rem;
		}
	}
`;
