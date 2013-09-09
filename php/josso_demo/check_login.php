<?php 
//single site on
$user = $josso_agent->getUserInSession();
if(isset($user)){
	if($user->name != $_SESSION['username']){
		//init user
        $_SESSION['username'] = $user->name;	
	}
	$login = true;
}else{
	session_destroy();
	$login = false;
    header('Location:login.php');
}
?>