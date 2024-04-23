import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const navigate = useNavigate();
  fetch("https://todoist.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: "cf6143a039db40078b4b82e1e93e9ca7",
      client_secret: "fad0c00fa9224bd794491b44df860d9e",
      code: code,
      redirect_uri: "http://localhost:3000/",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("access_token", JSON.stringify(response));
      navigate("/");
    });
};
export default Authorization;
