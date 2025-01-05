export function getAccessToken(): string {
	const storedUser = localStorage.getItem("user");
	let token = "";
	if (storedUser) {
		token = JSON.parse(storedUser).accessToken;
	} else {
		console.log("NOT TOKEN FOUND");
		return "";
	}
	return `Bearer ${token}`;
}

export function getUserRole(): string{
    const storedUser = localStorage.getItem("user");
    let role = "";
    if (storedUser) {
        role = JSON.parse(storedUser).role;
    } else {
        console.log("NOT USER FOUND");
        return "";
    }
    return role;
}