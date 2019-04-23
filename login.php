<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <link rel="icon" type="image/ico" href="https://web.groupme.com/images/favicon.ico">
  <title>GroupMe BetterGUI</title>
</head>
<body>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <?php 
      if(isset($_POST['logout'])) {
        file_put_contents("dotenv.js","");
      }
      if(isset($_GET['access_token']) || isset($_POST['token'])) {
        if(file_exists('dotenv.js')) {
          ftruncate(fopen('dotenv.js', "r+"), 0);
        }
        $token = isset($_GET['access_token']) ? $_GET['access_token'] : $_POST['token'];
        file_put_contents("dotenv.js", 'const token = "token=' . $token . '";');
        if(!file_exists('id.js')) {
          file_put_contents("id.js", "");
        }
        header("refresh:0;url=index.html");
      } else {
        echo '<a>Please log in using your access token or OAuth:</a><br />';
        echo 'Token: <input type="text" id="token" name="token"></input>';
      }
    ?>
    <input type="submit"><a>
    <?php 
      if(!isset($_GET['access_token'])) {
        echo '<b> OR </b></a><a href="https://oauth.groupme.com/oauth/authorize?client_id=3iOCIP8KHemfBNPgYtckc3vcfjNKb17adgj0fBHMpLR9l1CF">OAuth Auto-Login</a>';
      }
     
     if(isset($_POST['logout'])) {
       echo '<br /><br /><b><a>Logged out successfully!</a></b>';
     }
   ?>
  </form>
  
</body>
</html>

