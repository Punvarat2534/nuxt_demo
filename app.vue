<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color:#0769ad;
}

.topnav {
  overflow: hidden;
  background-color: #FFF;
}

.topnav a {
  float: left;
  display: block;
  color: #1b2531;
  text-align: center;
  padding: 12px 14px;
  text-decoration: none;
  font-size: 14px;
  font-weight:bold;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #333;
  color: white;
}

.topnav .icon {
  display: none;
}

.tbl{
    margin:0 auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.tbl tr{
    padding:0;
    height:10px;
}

.tbl th{
    background-color:#1b3952;
    padding:0.5em;
    color:white;
    font-weight:bold;
}

.tbl td{
    padding:0.5em;
    border-bottom:1px dashed #ccc;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

.search-icon {
  padding:100px;
  background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat right;
  background-size: 35px;
  cursor:pointer;
}

.footer{
  background-color:#1b3952;color:white;margin:0px;text-align:center;padding:0.5em;border-top:1px solid #999;
}
</style>

<template>
<div style="width:100%;height:10px;background-color:#003c71;"></div>
<div class="topnav" id="myTopnav">
  <NuxtLink to="/" class="active">Home</NuxtLink>
  <NuxtLink to="/">Forum</NuxtLink>
  <a href="#contact">Member</a>
  <a href="#about">Search</a>
  <a href="#about">Help</a>
  <a href="#about">New Topics</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()"><font-awesome icon="bars" style="font-size:12pt;cursor:pointer;" /></a>
</div>
<NuxtPage />

<!--<footer class="footer">
  copyright@2025
</footer>-->
</template>