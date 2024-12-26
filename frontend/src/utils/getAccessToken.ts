export function getAccessToken(): string {
    const storedUser = localStorage.getItem("user");
    let token=""
    if (storedUser) {
         token = JSON.parse(storedUser).accessToken;
    }else{
        console.log("NOT TOKEN FOUND")
        return "";
    }
    return `Bearer ${token}`;
}