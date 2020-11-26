export function argmax(arr: number[]): number{
	return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

export function argmin(arr: number[]): number{
	return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
}