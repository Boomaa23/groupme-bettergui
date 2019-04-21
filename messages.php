<head>
  <style>
  body {
    <?php 
    if(isset($_GET['bkg']) && $_GET['bkg'] !== "null" && $_GET['bkg'] !== "undefined") {
      echo 'background: url(' . $_GET['bkg'] . ') no-repeat 99% -2% fixed;';
      $vars = (string)$_GET['max']-250;
      echo 'width:' . $vars . ';';
    } 
    ?>
    background-size: 200px 200px;
  }
  </style>
  <link type="text/css" href="messages.css">
</head>
<?php
echo '<script type="text/javascript" src="messages.js"></script>';
?>

<body>
<div id="messages"></div>
</body>