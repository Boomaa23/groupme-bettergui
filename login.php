<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="-1" />
  
  <style>
    body {background-color:#f7f7f7;}
    .main-display {text-align:center;font-family:Arial;margin: 0;position: absolute;top: 45%;left: 50%;transform: translate(-50%, -100%); }
    .token-container {padding-top:4px;padding-bottom:6px;}
    .title {font-weight:bold; padding-bottom:15px; font-size:28px;padding-top:10px;}
  </style>
  
  <link rel="icon" type="image/ico" href="favicon.ico">
  <title>GroupMe BetterGUI</title>
</head>
<body>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <?php 
      if(isset($_GET['access_token']) || isset($_POST['token'])) {
        if(file_exists('dotenv.js')) {
          ftruncate(fopen('dotenv.js', "r+"), 0);
            file_put_contents('dotenv.js', 'const token = "token="' . PHP_EOL . 'const ip = "' .  getIPAddress() . '";');
        }
        $token = isset($_GET['access_token']) ? $_GET['access_token'] : $_POST['token'];
        if($token === "") {
          displayLogin(true);
          return;
        }
        file_put_contents("dotenv.js", 'const token = "token=' . $token . '";' . PHP_EOL . 'const ip = "' . getIPAddress() . '";');
        if(!file_exists('id.js')) {
          file_put_contents("id.js", "");
        }
        $url = "index.html?login=" . time();
        header("refresh:0;url=" . $url);
      } else {
        displayLogin(false);
      }

      function displayLogin($tokennull) {
        echo '
        <div class="main-display">
          <img src="favicon.ico">
          <div class="title">GroupMe BetterGUI</div>
          <div>Please log in using your access token:</div>
          <div class="token-container" style="">
            <input type="text" id="token" name="token" placeholder=" GroupMe Access Token" style="border:1px solid #a3a3a3;"></input>
            <input type="submit" style="padding:4px;"><a>
          </div>
          <b> OR </b></a><a href="https://oauth.groupme.com/oauth/authorize?client_id=3iOCIP8KHemfBNPgYtckc3vcfjNKb17adgj0fBHMpLR9l1CF">OAuth Auto-Login</a>';
          if(isset($_POST['logout']) || isset($_GET['logout'])) { 
            file_put_contents("dotenv.js","");
            echo '<br /><br /><b><div>Logged out successfully!</div></b>'; 
          }
          if($tokennull) { 
            echo '<br /><br /><div><b>Bad authentication token. Please try again.</b></div>'; 
          }
          if(isset($_GET['badip'])) {
            file_put_contents("dotenv.js","");
            echo '<br /><br /><b><div>Non-matching IP found from last user. Please log in again.</div></b>';
          }
        echo '</div>';
      }
      
      function getIPAddress() {
        if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)){
          return  $_SERVER["HTTP_X_FORWARDED_FOR"];  
        } else if (array_key_exists('REMOTE_ADDR', $_SERVER) && $_SERVER["REMOTE_ADDR"] !== "::1") { 
          return $_SERVER["REMOTE_ADDR"]; 
        } else if (array_key_exists('HTTP_CLIENT_IP', $_SERVER)) {
          return $_SERVER["HTTP_CLIENT_IP"]; 
        } else {
          $rawrtn = file_get_contents("https://httpbin.org/ip");
          $rtnip = json_decode($rawrtn)->origin;
          $allip = explode (", ", $rtnip);
          return $allip[sizeof($allip) - 1];
        }
      }
   ?>
  </form>
  
</body>
</html>

