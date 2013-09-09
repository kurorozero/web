<?php

    require_once 'ConnectDB.php';

		require_once 'Category.php';

		require_once 'Picture.php';



class PictureMgr {



	function GetTotal($keyword, $cat_id) {

		$append = false;

		$cDB = new ConnectDB();

		$cDB->connection();

		$query = "SELECT DISTINCT pic.pic_id, pic.keyword, pic.file_name, pic.pic_status, pic.date_create, pic.date_upd FROM tblpicture pic, tblpicturecategory piccat WHERE pic.pic_id = piccat.pic_id ";

		if ($keyword != "") {

			$query = $query." AND keyword LIKE '%".$keyword."%'";

			$append = true;

		}

		if ($cat_id != "") {

			// get on msg, no matter it's approved or not

			$query = $query." AND cat_id = '".$cat_id."'";

			$append = true;

		}

		$query = $query." ORDER BY pic.keyword ";
		$no = $cDB->nums($query);

		return $no;

	}



	function GetPicture($keyword, $cat_id, $pageFrom, $noRecord) {

		$append = false;

		$cDB = new ConnectDB();

		$cDB->connection();

		$query = "SELECT DISTINCT pic.pic_id, pic.keyword, pic.file_name, pic.pic_status, pic.date_create, pic.date_upd FROM tblpicture pic, tblpicturecategory piccat WHERE pic.pic_id = piccat.pic_id ";

		if ($keyword != "") {

			$query = $query." AND keyword LIKE '%".$keyword."%'";

			$append = true;

		}

		if ($cat_id != "") {

			// get on msg, no matter it's approved or not

			$query = $query." AND cat_id = '".$cat_id."'";

			$append = true;

		}

		$query = $query." ORDER BY pic.keyword ";
		$query = $query." LIMIT ".$noRecord." OFFSET ".$pageFrom;var_dump($query);

		//if ($append) {

			$picture = $cDB->objects($query);

		//}

		//else {

			// too much result

			//$picture = "too much result !";

		//}

		return $picture;

	}

	

	function GetAllCategory() {

		$cDB = new ConnectDB();

		$cDB->connection();

		$category = new Category();

		$query = "SELECT * FROM tblCategory ORDER BY order_id";

		$category = $cDB->objects($query);		

		return $category;

	}

}

?>