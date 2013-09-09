<?php

session_start();

include('include/acsconn.php');
include('check_login.php');





$logout_url = '<a href="'.ACSLOGOUT.'">logout</a><br><br>';
echo $logout_url;


echo "Username:".$user->name;

echo '<br/><br/>';


$userAccessRight = acsGetAccessRight($user->name);


$userProfile = acsGetUserProfile($user->name);
$userAllProfile = acsGetUserAllProfile($user->name);
$Profile = acsGetProfile($user->name);
$AllProfile = acsGetAllProfile($user->name);
$UsersProfile = acsGetUsersProfile(281778);
$Group = acsGetGroup($user->name);
$Group2 = acsGetGroup2($user->name);
$Class = acsGetClass($user->name);
$AllStudyGroup = acsGetAllStudyGroup(251532);
$StudyGroup = acsGetStudyGroup(281800);

echo '<b>acsGetAccessRight</b><br/>';

var_dump($userAccessRight);

echo '<br>';

echo '<br/>';




echo '<b>acsGetUserProfile</b><br/>';

var_dump($userProfile);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetUserAllProfile</b><br/>';

var_dump($userAllProfile);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetProfile</b><br/>';

var_dump($Profile);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetAllProfile</b><br/>';

var_dump($AllProfile);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetUsersProfile</b><br/>';

var_dump($UsersProfile);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetGroup</b><br/>';

print_r($Group);

echo '<br/>';

echo '<br/>';





echo '<b>acsGetGroup2</b><br/>';

print_r($Group2);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetClass</b><br/>';

var_dump($Class);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetAllStudyGrou</b><br/>';

var_dump($AllStudyGroup);

echo '<br/>';

echo '<br/>';



echo '<b>acsGetStudyGroup</b><br/>';

var_dump($StudyGroup);

echo '<br/>';

echo '<br/>';












?>

