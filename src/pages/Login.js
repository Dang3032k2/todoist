const Login = () => {
  const handleLogin = () => {
    window.open(
      "https://todoist.com/oauth/authorize?client_id=cf6143a039db40078b4b82e1e93e9ca7&scope=data:read_write,data:delete,project:delete&state=fad0c00fa9224bd794491b44df860d9e",
      "_self"
    );
  };

  return (
    <div className="login-page">
      <button onClick={handleLogin} className="login-page__btn">
        ĐĂNG NHẬP
      </button>
    </div>
  );
};
export default Login;
