<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="cache-control" content="max-age=0">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="-1">
  <meta http-equiv="expires" content="Tue, 01 Jan 1980 11:00:00 GMT">
  <meta http-equiv="pragma" content="no-cache">
  
  <link rel="icon" type="image/ico" href="https://web.groupme.com/images/favicon.ico">
  <title>GroupMe BetterGUI</title>
</head>
<body>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <?php 
      $ip = getIpAddress();
      echo $ip;
      if(isset($_POST['logout'])) {
        file_put_contents("dotenv.js","");
      }
      if(isset($_GET['access_token']) || isset($_POST['token'])) {
        if(file_exists('dotenv.js')) {
          ftruncate(fopen('dotenv.js', "r+"), 0);
        }
        $token = isset($_GET['access_token']) ? $_GET['access_token'] : $_POST['token'];
        if($token === "") {
          echo '<a>Please log in using your access token or OAuth:</a><br />';
          echo 'Token: <input type="text" id="token" name="token"></input>';
          echo '<input type="submit"><a>';
          echo '<b> OR </b></a><a href="https://oauth.groupme.com/oauth/authorize?client_id=3iOCIP8KHemfBNPgYtckc3vcfjNKb17adgj0fBHMpLR9l1CF">OAuth Auto-Login</a><br /><br />';
          echo '<a><b>No token entered or retrieved through OAuth. Please try again.</b></a>';
          return;
        }
        file_put_contents("dotenv.js", 'const token = "token=' . $token . '";' . PHP_EOL . 'const ip = "' . $ip . '";');
        if(!file_exists('id.js')) {
          file_put_contents("id.js", "");
        }
        echo '<a>Redirecting in 2 seconds...</a>';
        header("refresh:2;url=index.html");
      } else {
        echo '<a>Please log in using your access token or OAuth:</a><br />';
        echo 'Token: <input type="text" id="token" name="token"></input>';
        echo '<input type="submit"><a>';
        if(!isset($_GET['access_token'])) {
          echo '<b> OR </b></a><a href="https://oauth.groupme.com/oauth/authorize?client_id=3iOCIP8KHemfBNPgYtckc3vcfjNKb17adgj0fBHMpLR9l1CF">OAuth Auto-Login</a>';
        }
      }

      if(isset($_POST['logout'])) {
        echo '<br /><br /><b><a>Logged out successfully!</a></b>';
      }
      
      function getIpAddress() {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipAddresses = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            return trim(end($ipAddresses));
        }
        else {
            return $_SERVER['REMOTE_ADDR'];
        }
    }
   ?>
  </form>
  
</body>
</html>

