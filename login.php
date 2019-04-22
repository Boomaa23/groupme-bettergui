<!DOCTYPE html>
<html>
<body>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    Name: <input type="text" id="name" name="name"></input>
    Token: <input type="password" id="token" name="token"></input>
    <input type="submit">
  </form>
</body>
</html>

<?php 
  if(isset($_POST['token'])) {
    ftruncate(fopen('dotenv.js', "r+"), 0);
    ftruncate(fopen('name.js', "r+"), 0);
    file_put_contents("dotenv.js", 'const token = "token=' . $_POST['token'] . '";');
    file_put_contents("name.js", 'const nameGlobal = "' . $_POST['name'] . '";');
    header("refresh:0;url=index.html");
  }
?>