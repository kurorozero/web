<?php

include_once ("acs_constants.php");


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

function acsGetBonus($inLoginId, $inserviceCode){
	$method = 'getBalance';
	$asmethod = 'getBonusBalanceByUser';
	$inputparameter = '&loginId='. $inLoginId;
	$node = 'Balance';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );

	$total = 0;
	if (count($result)>0) {
		foreach ($result as $val) {
			$total += $val['TOTAL'];
		}
	}

	return $total;
}


// Wait 20050827
function acsUpdateBonus($inLoginId, $inserviceCode, $inBonus, $inDesc){
	$method = 'updateBonus';
	$asmethod = 'award';
	$inputparameter = '&loginId='. $inLoginId . '&serviceCode=' . inserviceCode . '&amount=' . inBonus . '&bonusType=1&txnDate=' . Year(Date) . FormatNum(Month(Date)) . FormatNum(Day(Date)) . '&remark=' . inDesc;
	$node = 'BonusTxns';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
}

function acsGetBonusLimit($inLoginId){
	$method = 'getBonusTxns';
	$asmethod = 'getBonusTxnByUser';
	$inputparameter = '&loginId='. $inLoginId;
	$node = 'BonusTxns/BonusTxn';
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

/*
function acsGetProfile($inLoginId){
	$method = 'getUsers';
	$asmethod = 'get';
	$inputparameter = '&loginId='. $inLoginId .'&applicationId='.ACSAPPLICATIONID.'&currentSchoolYearOnly=Y';
	
	$node = 'Users/User';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );
	$node2 = 'Users/User/Schools/School';
	$result2 = openACS($method, $asmethod, $inputparameter, $node2, '','' );

	$result = array_merge((array)$result, (array)$result2);
	return $result;
}
*/

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
	
	$result = array_merge((array)$result, (array)$result2, (array)$result3);
	return $result;
}

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

function acsGetTopTen(){
	$method = 'getBonusRanking';
	$asmethod = 'getBonusRankingByRoleId';

	$sclServiceCode = $HTTP_COOKIE_VARS['SCLSERVICECODE'];
	if (strpos($sclServiceCode, 'JSCL') >= 0) {
		$sclServiceCode = 'JSCL_BOOK';
	} elseif (strpos($sclServiceCode, 'SSCL') >= 0) {
		$sclServiceCode = 'SSCL_BOOK';
	} else {
		$sclServiceCode = '';
	}

	$sclServiceCode = 'SSCL_BOOK';

	$inputparameter = '&roleId=1&serviceCode='. $sclServiceCode .'&numOfRanking=10';
	$node = 'BonusRanking/Ranking';
	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );


	echo "<TABLE width='168' border='0' cellspacing='0' cellpadding='0' align='right'>";
	echo "<TR>";
	echo "<TD colspan=3 height=10></TD>";
	echo "</TR>";

	foreach ($result as $val) {

		echo "<TR>";
		echo "<TD width='18'><FONT size='-1' class='b5font9Gray'><b>" . $val['RANK'] . ")</b></font></TD>";
		echo "<TD width='85'><FONT size='-1' class='b5font9Gray'><b>" . $val['CHINAME'] . "</b></font></TD>";
		echo "<TD width='65'><FONT size='-1' class='b5font9Gray'><b><FONT color='#CC6600'>" . $val['BONUSPOINT'] . "</FONT>��</b></font></TD>";
		echo "</TR>";
		echo "<TR>";
		echo "<TD>&nbsp;</TD>";
		echo " <TD colspan=2><FONT size='-1' class='b5font9Gray'>";
		if ($val['CHISCHOOLNAME']==null || $val['CHISCHOOLNAME'] == '' ) {
			echo $val['SCHOOLNAME'];
		} else {
			echo $val['CHISCHOOLNAME'];
		}
		echo "</font></TD>";
		echo "</TR>";

	}
	//http://leap.ilongman.com:80/acs-web/App/ACSGateway.do?method=getBonusRanking&asMethod=getBonusRankingByRoleId&roleId=1&serviceCode=&numOfRanking=10

	echo "</TABLE>";
	return $result;
}


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

?>