<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="cache-control" content="max-age=0">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="-1">
  <meta http-equiv="expires" content="Tue, 01 Jan 1980 11:00:00 GMT">
  <meta http-equiv="pragma" content="no-cache">
  
  <style>
    body {background-color:#f7f7f7;}
    .main-display {text-align:center;font-family:Arial;margin: 0;position: absolute;top: 45%;left: 50%;transform: translate(-50%, -100%); }
    .token-container {padding-top:4px;padding-bottom:6px;}
    .title {font-weight:bold; padding-bottom:15px; font-size:28px;padding-top:10px;}
  </style>
  
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
        if($token === "") {
          displayLogin(true);
          return;
        }
        file_put_contents("dotenv.js", 'const token = "token=' . $token . '";' . PHP_EOL . 'const ip = "' . file_get_contents("https://api.ipify.org") . '";');
        if(!file_exists('id.js')) {
          file_put_contents("id.js", "");
        }
        echo '<a>Redirecting in 2 seconds...</a>';
        header("refresh:2;url=index.html");
      } else {
        displayLogin(false);
      }

      function displayLogin($tokennull) {
        echo '
        <div class="main-display">
          <img src="https://web.groupme.com/images/favicon.ico">
          <div class="title">GroupMe BetterGUI</div>
          <div>Please log in using your access token:</div>
          <div class="token-container" style="">
            <input type="text" id="token" name="token" placeholder=" GroupMe Access Token" style="border:1px solid #a3a3a3;"></input>
            <input type="submit" style="padding:4px;"><a>
          </div>
          <b> OR </b></a><a href="https://oauth.groupme.com/oauth/authorize?client_id=3iOCIP8KHemfBNPgYtckc3vcfjNKb17adgj0fBHMpLR9l1CF">OAuth Auto-Login</a>';
          if(isset($_POST['logout'])) { echo '<br /><br /><b><div>Logged out successfully!</div></b>'; }
          if($tokennull) { echo '<br /><br /><div><b>Bad authentication token. Please try again.</b></div>'; }
        echo '</div>';
      }
   ?>
  </form>
  
</body>
</html>

