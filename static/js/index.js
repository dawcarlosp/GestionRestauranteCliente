const token = localStorage.getItem("token");
if(!token){
    location.href = "html/login.html";
}
