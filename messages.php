<head>
  
  <style>
  body {
    <?php 
    if(isset($_GET['bkg']) && $_GET['bkg'] !== "null" && $_GET['bkg'] !== "undefined") {
      echo 'background: url(' . $_GET['bkg'] . ') no-repeat 99% -1% fixed;';
    } 
    ?>
    font-family: Arial;
    font-size:14px;
    background-size:150px 150px;
  }
  </style>
  <script type="text/javascript">
  
  </script>
  <link type="text/css" href="messages.css">
</head>

<?php 
  ftruncate(fopen("id.js", "r+"), 0);
  file_put_contents("id.js", PHP_EOL . 'const idGlobal = "' . $_GET['id'] . '";', FILE_APPEND);
?>
<script type="text/javascript" src="messages.js"></script>
<body>
<div id="messages"></div>
</body>