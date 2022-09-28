// eslint-disable-next-line import/prefer-default-export
const ConvertSizeIntoSqft = (size) => {
	let totalInSquareFeet = 0;
	totalInSquareFeet += parseFloat(size.kanal > 0 ? size.kanal : 0) * 20 * 272;
	totalInSquareFeet += parseFloat(size.marla > 0 ? size.marla : 0) * 272;
	totalInSquareFeet += parseFloat(size.sarsai > 0 ? size.sarsai : 0) * 30;
	totalInSquareFeet += parseFloat(size.feet > 0 ? size.feet : 0);
	return totalInSquareFeet;
};

export default ConvertSizeIntoSqft;
