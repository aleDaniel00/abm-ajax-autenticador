<?php

session_start();

function __autoload($cn) {
	require_once dirname(__FILE__).'/Clases/'.$cn.'.php';
}
