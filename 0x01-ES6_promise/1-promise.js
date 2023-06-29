export default function getFullResponseFromAPI(success)
{
	return new Promise((resolve, reject) => {
		if(success)
			resolve();
		else
			reject();
	});
