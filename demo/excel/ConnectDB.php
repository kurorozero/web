<?php

	/*********************************************************************

	*-----------------------------------------------------------------------------------------------------------
	*	Function Lists
	*-----------------------------------------------------------------------------------------------------------
	* 1. connection	-->	Function connection()
	* 2. query			-->	Function query($string)
	* 3. num_rows		-->	Function nums($string="",$qid="")



	* 4. object			-->	Function objects($string="",$qid="")



	* 5. insert			-->	Function insert($tb_name,$cols,$val,$astriction)



	* 6. update			-->	Function update($tb_name,$string,$astriction)



	* 7. delete			-->	Function del($tb_name,$astriction)



	*



	*********************************************************************/



	require_once "Clone.php";







	class ConnectDB{



		var $sql_link;



		var $query_id;



		var $db_host;



		var $db_user;



		var $db_pass;



		var $db_name;



/******* Setting & Connect ************************************/


        function getInstance()
        {
            if(!$instance){
                $instance = new ConnectDB();
                $instance->connection();
            }

            return $instance;
        }




function connection(){



			//	Check Connection is exist or not



				if(!$this->sql_link){







					//	Define All Variables



						if(!$this->db_host || !$this->db_user || !$this->db_pass){



							if ($_SERVER['HTTP_HOST'] == 'plet.dev1.ilongman.com'){



								$this->db_host = "localhost";



							} else {



								$this->db_host = "192.168.168.6";



							}



									//$this->db_host = "localhost";



									$this->db_user = "postgres";



									$this->db_pass = "hkstudy";



									$this->db_name = "plet";







								//	Connect to PostgreSQL



									$conn_string = "host=$this->db_host dbname=$this->db_name user=$this->db_user password=$this->db_pass";



									$this->sql_link = pg_connect ($conn_string);







									if(!$this->sql_link){



										//echo "Connect to PostgreSQL Failed <br>\n";



									}elseif($this->sql_link){



										//echo "Connect to PostgreSQL Success , Host = $this->db_host , DB = $this->db_name , User = $this->db_user , Pass = $this->db_pass <br>\n";



									}



						}



				}



		}











/******* Query ************************************/



		function query($query_str){



			if(empty($sql_link)){



				$this->connection();



			}



			$this->query_id = pg_query("$query_str");







				// Testing



//			echo "query_id = ".$this->query_id."<br>\n";



	//				echo "query_str = ".$query_str."<br>\n";



			if(!$this->query_id){



				//echo "Unable to Perform the query :".$string."<br>\n";



			}







			return $this->query_id;



		}











/******* Num ************************************/







		function nums($string="",$qid=""){



			if(empty($sql_link)){



				$this->connection();



			}







			// String is not empty but qid is empty



				if(!empty($string)){



					$this->query($string);



					$this->total_num = pg_num_rows($this->query_id);







					//Testing



					//	echo "Num Query String = ".$string."<br>\n";



					//	echo "Num_1 = ".$this->total_num."<br>\n";



				}







			// String is empty but qid is not empty



				if(!empty($qid)){



					$this->total_num = pg_num_rows($qid);







					//Testing



						//echo "Num_2 = ".$this->total_num."<br>\n";



				}







			// String and qid are both empty



				if(empty($string) && empty($qid)){



					$this->total_num = pg_num_rows($this->query_id);







					//Testing



	//					echo "Num_3 = ".$this->total_num."<br>\n";



				}







			return $this->total_num;



		}











/******* Object ************************************/







		function objects($string="",$qid=""){



			if(empty($sql_link)){



				$this->connection();



			}



			//String is not empty but qid is empty



				if(!empty($string)){



					$this->query($string);



						//$objects = pg_fetch_object($this->query_id);



						//Testing



						$objectArr =array();







						while ($objects = pg_fetch_object($this->query_id)) {



							$objectArr[] = clone($objects);



						}



						//echo "Object Query String = ".$string."<br>\n";



						return $objectArr;



				}







			//String is empty but qid is not empty



				if(!empty($qid)){



					$objects = pg_fetch_object($qid);



					return $objects;



				}







			//String and qid are both empty



				if(empty($string) && empty($qid)){



					$objects = pg_fetch_object($this->query_id);



					return $objects;



				}



//print_r($objectArr);



			return objects;



		}











/******* Insert ************************************/







	function insert($tb_name,$cols,$val,$astriction){



		if(empty($this->sql_link)){



			$this->connection();



		}







		//Check Cols is empty or not



			if(!$cols){



				$cols = "";



			}else{



				$cols = "(".$cols.")";



			}







		//Check astriction is empty or not



			if(!$astriction){



				$ast = "";



			}else{



				$ast = " WHERE ".$astriction;



			}







		$insert = pg_query($this->sql_link,"INSERT INTO $tb_name $cols VALUES ($val) $ast");

		//echo "Query String = INSERT INTO $tb_name $cols VALUES ($val) $ast<br>";





		if(!$insert){



			//echo "<br>Insert Data Failed : <br>";



			//echo "Query String = INSERT INTO $tb_name $cols VALUES ($val) $ast<br>";



			return false;



		}



		else {



			return true;



		}



	}











/******* Update ************************************/







	function update($tb_name,$string,$astriction){



		if(empty($this->sql_link)){



			$this->connection();



		}







		//Check astriction is empty or not



			if(!$astriction){



				$ast = "";



			}else{



				$ast = " WHERE ".$astriction;



			}







		$update = pg_query($this->sql_link,"UPDATE $tb_name SET $string $ast");







		if(!$update){



			//echo "<br>Update Data Failed : <br>";



			//echo "Query String = UPDATE $tb_name SET $string $ast<br>";



			return false;



		}



		else {



			return true;



		}



	}











/******* Delete ************************************/







	function Del($tb_name,$astriction){



		if(empty($this->sql_link)){



			$this->connection();



		}







		//Check astriction is empty or not



			if(!$astriction){



				$ast = "";



			}else{



				$ast = " WHERE ".$astriction;



			}



		$del = pg_query($this->sql_link,"DELETE FROM $tb_name $ast");







		if(!$del){



			//echo "<br>Delete Data Failed : <br>";



			//echo "Query String = DELETE FROM $tb_name $ast<br>";



		}







		return "true";



	}







}



?>
