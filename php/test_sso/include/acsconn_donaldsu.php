<?php

define('ACSGATE',	'http://acs-dev.ilongman.com:80/acs-web/App/ACSGateway.do?');
define('ACSAPPLICATIONID','41');

function xml2php($file) {

	// Open file connection
	$handle = fopen($file, "rb");
	if (isset($handle) && $handle!=null && $handle!='')  {

		$contents = '';
		while (!feof($handle)) {
			$contents .= fread($handle, 8192);
		}
	} else {
		echo 'Cannot get data returned from ACSGateway.';
		exit;
	}
	fclose($handle);

	// Start parsing the XML file
	$xml_parser = xml_parser_create();
	$contents = ltrim ($contents);
	if (!xml_parse_into_struct($xml_parser, $contents, $arr_vals, $index)) {
		sprintf("XML error: %s at line %d", xml_error_string(xml_get_error_code($xml_parser)), xml_get_current_line_number($xml_parser));
		$arr_vals = 'Failed parsing XML from ACSGateway' ."\n";
		if (count($arr_val)==0) $arr_vals .= 'XML return from ACSGateway has no value';
	}
	xml_parser_free($xml_parser);

	return $arr_vals;
}

function openACS($inMethod, $inAsMethod, $inParameter, $inNode, $inDetailArray, $tempXML) {
	$tgetURL = ACSGATE  . 'method=' . $inMethod . '&asMethod=' . $inAsMethod  . $inParameter ;
	//	echo $tgetURL . "\n";

	// Churn XML into php array
	$array = xml2php($tgetURL);

	// tokenize nodes into array
	$inNodePieces = explode("/", $inNode);

	$result = '';
	$j=0;
	for($i = 0; $i < count($array); $i++) {
		// Getting into the desire in node first
		if ( strcasecmp($inNodePieces[count($inNodePieces)-1], $array[$i]['tag']) ==0 && $array[$i]['type']=='open') {
			while ($array[$i+1]['type'] != 'close' && $array[$i+1]['type'] != 'open') {
				$result_inner[$array[$i+1]['tag']] = $array[$i+1]['value'];
				$result[$j] = $result_inner;
				$i++;
			}
			$j++;
		}
	}
	return $result;
}


function acsGetAccessRight($inLoginId){
	$method = 'getAccessRights';
	$asmethod = 'getByUser';
	$inputparameter = '&loginId='. $inLoginId;
	$node = 'AccessRights/Access';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	return $result;
}

function acsGetUserProfile($inLoginId){
	$method = 'getProfile';
	$asmethod = 'get';
	$inputparameter = '&loginId='. $inLoginId . '&applicationId='.ACSAPPLICATIONID.'&currentSchoolYearOnly=Y';
	
	$node = 'Profile';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	$node2 = 'Profile/SchoolHistory/SchoolYears/SchoolYear/Schools/School';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );

	$result = array_merge((array)$result, (array)$result2);
	return $result;
}

function acsGetUserAllProfile($inLoginId){
	$method = 'getProfile';
	$asmethod = 'get';
	$inputparameter = '&loginId='. $inLoginId;
	
	$node = 'Profile';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	$node2 = 'Profile/SchoolHistory/SchoolYears/SchoolYear/Schools/School';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );

	$result = array_merge((array)$result, (array)$result2);
	return $result;
}


//can use merge loginId
function acsGetProfile($inLoginId){
	$method = 'getUsers';
	$asmethod = 'get';
	$inputparameter = '&loginId='. $inLoginId .'&applicationId='.ACSAPPLICATIONID.'&currentSchoolYearOnly=Y';
	$node = 'Users/User';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	
	$node2 = 'Users/User/Schools/School';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );
	
	$node3 = 'Users/User/SubLoginIds';
	$result3 = openACS($method, $asmethod, $inputparameter, $node3, '','' );
	//$result3 = array();	
	$result = array_merge((array)$result, (array)$result2, (array)$result3);
	return $result;
}

print_r(acsGetProfile('ec_tester'));

function acsGetAccessRightByLoginIdAndPassword($inLoginId, $inPassword)
{
	$method = 'login';
	$asmethod = 'login';
	$inputparameter = '&loginId='. $inLoginId.'&password='.$inPassword;	
	$node = 'ACSMessage';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );

	$node2 = 'ACSMessage/Service';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );

	$result = array_merge((array)$result, (array)$result2);	
	
	return $result;
}

print_r(acsGetAccessRightByLoginIdAndPassword('ec_tester',123456));

function acsGetUserRoleProfile($inLoginId){
	$method = 'getProfile';
	$asmethod = 'getRole';
	$inputparameter = '&loginId='. $inLoginId;
	$node = 'ACSMessage/Profile/Roles/Role';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	return $result;
}

print_r(acsGetUserRoleProfile('ec_tester'));



function acsGetAllProfile($inLoginId){
	$method = 'getUsers';
	$asmethod = 'get';
	$inputparameter = '&loginId='. $inLoginId;
	
	$node = 'Users/User';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	$node2 = 'Users/User/Schools/School';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );

	$result = array_merge((array)$result, (array)$result2);
	return $result;
}

//Wait
function acsGetUsersProfile($inGroupId){
	$method = 'getUsers';
	$asmethod = 'getUsersByGroup';
	$inputparameter = '&studyGroupId='. $inGroupId;
	
	$node = 'Users/User';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	$node2 = 'Users/User/Schools/School';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );

	$result = array_merge((array)$result, (array)$result2);
	return $result;
}

//print_r(acsGetUsersProfile(342302));

function acsGetGroup($inLoginId) {
	$method = 'getStudyGroups';
	$asmethod = 'getByTeacher';
	$inputparameter = '&loginId='. $inLoginId .'&applicationId='. ACSAPPLICATIONID;
	$node = 'StudyGroups/StudyGroup';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	return $result;
}

function acsGetGroup2($inLoginId) {
	$method = 'getStudyGroups';
	$asmethod = 'getByTeacher';
	$inputparameter = '&loginId='. $inLoginId;
	$node = 'StudyGroups/StudyGroup';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	return $result;
}

function acsGetClass($inLoginId) {
	$method = 'getStudyGroups';
	$asmethod = 'getByUser';
	$inputparameter = '&loginId='. $inLoginId;
	$node = 'StudyGroups/StudyGroup';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );

	return $result;
}

function acsGetStudyGroup($inStudyGroupId) {
	$method = 'getStudyGroups';
	$asmethod = 'get';
	$inputparameter = '&studyGroupId='. $inStudyGroupId .'&applicationId='.ACSAPPLICATIONID.'&currentSchoolYearOnly=Y';
	
	$node = 'StudyGroups/StudyGroup';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );

	return $result;
}

function acsGetAllStudyGroup($inStudyGroupId) {
	$method = 'getStudyGroups';
	$asmethod = 'get';
	$inputparameter = '&studyGroupId='. $inStudyGroupId;
	
	$node = 'StudyGroups/StudyGroup';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );

	return $result;
}

function acsGetUserIdByLoginId($loginId){
	$result = acsGetProfile($loginId);
	foreach ($result as $k=>$v2){
		foreach ($result[$k] as $key => $v){
			if ($key == "USERID"){
				return $v;
			}
		}
	}
	return null;
}

function acsGetGroupByApplicationId($inLoginId, $inApplicationId) {
    $method = 'getStudyGroups';
    $asmethod = 'getByTeacher';
    $inputparameter = '&loginId='. $inLoginId .'&applicationId='. $inApplicationId;
    $node = 'StudyGroups/StudyGroup';
    $result = openACS($method, $asmethod, $inputparameter, $node, '','' );
    return $result;
}


?>