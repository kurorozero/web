<?php

session_start();

include('include/acsconn.php');

$user = $josso_agent->getUserInSession();



echo $user->name;

echo '<br/><br/>';

echo '<b>acsGetAccessRight</b><br/>';
$userAccessRight = acsGetAccessRight($user->name);
echo '<table border="1" cellspacing="2" cellpadding="1">';
echo '<tr><th>ServiceCode</th><th>RoleId</th><th>ExpiryDate</th></tr>';
if(!empty($userAccessRight) && is_array($userAccessRight)){
    foreach($userAccessRight as $val){
        echo '<tr><td>'.$val['SERVICECODE'].'</td><td title="'.$val['ROLENAME'].'">'.$val['ROLEID'].'</td><td>'.$val['EXPIRYDATE'].'</td></tr>';
    }
}else{
    echo '<tr><td>空</td></tr>';
}
echo '</table>';



$Bonus = acsGetBonus($user->name,"CIT_SCHOOL_CORE");



//$UpdateBonus = acsUpdateBonus($user->name,"CIT_SCHOOL_CORE",50,"desc");

//echo "aa3";

//exit;

$BonusLimit = acsGetBonusLimit($user->name);



$userProfile = acsGetUserProfile($user->name);



$userAllProfile = acsGetUserAllProfile($user->name);
if(!empty($userAllProfile) && is_array($userAllProfile)){
    foreach($userAllProfile as $items){
        if(!empty($items)){
            echo '<br />';
            echo '<table width="100%" border="1" cellspacing="2" cellpadding="1"><tr>';
            $i = 0;
            foreach($items as $key=>$val){
                if($i>=9){
                    echo '</tr></table><table width="100%" border="1" cellspacing="2" cellpadding="1"><tr>';
                    $i = 0;
                }
                echo '<td><table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';
                echo '<tr><th>'.$key.'</th></tr><tr><td style="border-top:1px solid #000;">'.($val?$val:'&nbsp;').'</td></tr>';
                echo '</table></td>';
                $i++;
            }
            echo '</tr></table><br />';
        }
    }
}


$Profile = acsGetProfile($user->name);



$AllProfile = acsGetAllProfile($user->name);



$UsersProfile = acsGetUsersProfile(281778);



$Group = acsGetGroup($user->name);



$Group2 = acsGetGroup2($user->name);



$Class = acsGetClass($user->name);



//$AllClass = acsGetAllClass($user->name);



$AllStudyGroup = acsGetAllStudyGroup(251532);



$StudyGroup = acsGetStudyGroup(281800);





/*

print_r(acsGetProfile($user->name));



exit(0);

*/




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







/*

if ($class[0]['STUDYGROUPID']!=""){

	foreach ($class as $k => $v){

			$i++;

			if($i>10){

				return null;

			}

			print_r(acsGetUsersProfile($v['STUDYGROUPID']));

			echo '<br/>--------------------------------------<br/>';

	}

}else{

	

		echo '-------------------------------<br/> no acsGetUsersProfile infomantions <br/>--------------------------';	

	

	}

echo '<br/>';

*/



/*

echo '$userAllProfile<br/>';

print_r($userAllProfile);

echo '<br/>';

echo '<br/>';

*/



/*

echo '$userProfile2<br/>';

print_r($userProfile2);

echo '<br/>';

echo '<br/>';



echo '$userProfile<br/>';

print_r($userProfile);

echo '<br/>';

echo '<br/>';

*/







?>

