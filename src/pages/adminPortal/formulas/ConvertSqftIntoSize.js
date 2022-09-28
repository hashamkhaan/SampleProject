const getWhole = (value) => {
	// eslint-disable-next-line no-unused-vars
	const [whole, decimal] = String(value).split('.');
	return Number(whole);
};
const mod = (n, m) => {
	return ((n % m) + m) % m;
};

const ConvertSqftIntoSize = (totalInSquareFeet) => {
	// const marlaSize = 272;
	const size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };
	const feetInSarsai = 30;
	let remainder = totalInSquareFeet;

	size.kanal = getWhole(remainder / 5440);
	remainder = mod(remainder, 5440);

	size.marla = getWhole(remainder / 272);
	remainder = mod(remainder, 272);

	size.sarsai = getWhole(remainder / feetInSarsai);
	remainder = mod(remainder, feetInSarsai).toFixed(11);
	// if (remainder === '30.22222222222') {
	// 	size.sarsai += 1;
	// 	size.feet = 0;
	// } else {
	// 	size.feet = mod(remainder, feetInSarsai).toFixed(3);
	// }

	size.feet = mod(remainder, feetInSarsai).toFixed(3);
	return size;
};

export default ConvertSqftIntoSize;
