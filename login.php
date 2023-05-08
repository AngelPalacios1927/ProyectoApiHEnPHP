<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
  <div class="login-box">
    <h2>Login</h2>
    <form method="post" action="validacion.php">
      <div class="user-box">
        <input type="text" required="" name="Nombre">
        <label>Username</label>
      </div>
      <div class="user-box">
        <input type="password" required="" name="Password">
        <label>Password</label>
      </div>
      <button type="submit">ingresar</button>
    </form>
  </div>
  <script src="script.js"></script>
</body>
</html>
