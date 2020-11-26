

export function LineAwesomeLoader(){
	const head = document.getElementsByTagName("head")[0];
	const url = "https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome.min.css";
	let exists = false;
	for(let i=0; i<head.children.length; i++){
		const child = head.children[i];
		if (child.getAttribute("href") == url){
			exists = true;
			break;
		}
	}
	if (!exists){
		const link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", url);
		head.insertBefore(link, head.children[0]);
	}
}