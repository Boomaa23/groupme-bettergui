<head>
  
  <style>
  body {
    <?php 
    if(isset($_GET['bkg']) && $_GET['bkg'] !== "null" && $_GET['bkg'] !== "undefined") {
      echo 'background: url(' . $_GET['bkg'] . ') no-repeat 99% -2% fixed;';
    } 
    ?>
    font-family: Arial;
    font-size:14px;
    background-size: 200px 200px;
  }
  </style>
  <script type="text/javascript">
  
  </script>
  <link type="text/css" href="messages.css">
</head>

<?php 
  file_put_contents("id.js", PHP_EOL . 'const idGlobal = "' . $_GET['id'] . '";');
?>
<script type="text/javascript" src="messages.js"></script>
<body>
<div id="messages"></div>
</body>