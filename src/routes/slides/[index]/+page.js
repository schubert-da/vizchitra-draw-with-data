export const prerender = true;

export const load = ({ params }) => {
	return { slideIndex: Number(params.index) };
};
