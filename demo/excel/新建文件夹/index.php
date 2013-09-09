<?php 

	require_once "../../include/class/pictureMgr.php";

	require_once "../../include/_startup.php";

	

	$picKeyword = mysql_real_escape_string($_POST["keyword"]);

	$picCat = mysql_real_escape_string($_POST["picCat"]);

	$picSearch = mysql_real_escape_string($_POST["search"]);

	

	$picFrom = mysql_real_escape_string($_POST["picFrom"]);

	

	if ($picFrom == "") {

		$picFrom = 0;

	}

	$picNoRecord = 15;

	

	$picMgr= new PictureMgr();

	$cats = $picMgr->GetAllCategory();

	

	if ($picSearch) {

		//if ($picKeyword != "" || $picCat != "") {

			$totalPic = $picMgr->GetTotal($picKeyword, $picCat);

			$pics = $picMgr->GetPicture($picKeyword, $picCat, $picFrom, $picNoRecord);

	//		echo count($pics);

			if (count($pics) > 0) {

				$showPic = true;

			}

			else {

				$showPic = false;

			}

		//}

	}

	else {

		// default all

		$totalPic = $picMgr->GetTotal("", "");

		$pics = $picMgr->GetPicture("", "", 0, $picNoRecord);

		if (count($pics) > 0) {

			$showPic = true;

		}

		else {

			$showPic = false;

		}

	}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Primary Longman Elect Teacher's All-in-One Platform</title>

<link href="/css/teacher/style.css" rel="stylesheet" type="text/css" />

<link href="/css/jqModal.css" rel="stylesheet" type="text/css" />

<link href="/css/customselect.css" rel="stylesheet" type="text/css" />

<link href="/css/sifr.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="/js/jquery/jquery-1.3.2.min.js"></script>

<script type="text/javascript" src="/js/jquery/jqModal.js"></script>

<script type="text/javascript" src="/js/jquery/customselect.js"></script>

<script type="text/javascript" src="/js/sifr.js"></script>

<script type="text/javascript" src="/js/teacher/sifr-config.js"></script>

<script type="text/javascript" src="/js/common.js"></script>



<script type="text/javascript" language="javascript">

function searchPicture(picFrom) {

	document.picBankForm.picFrom.value = picFrom;

	document.picBankForm.submit();

}

</script>

</head>

<body>

<form action="index.php" name="picBankForm" method="post">

<div class="mainFrame">

<?php include "../../include/layouts/teacherHeader.php"; ?>

	

	<div class="mainContent">

		<!-- Left Box Start here -->

		<div class="leftNavigation">

			<div class="leftNav">

				<div class="nav"><a href="/teacher/teachingResources/index.php" class="teachingResources" title="Teaching Resources">&nbsp;</a></div>

				<div class="nav"><a href="/teacher/schoolBasedMaterials/index.php" class="schoolBased" title="School-based Materials Resource Bank">&nbsp;</a></div>

				<div class="nav selected"><a href="/teacher/pictureBank/index.php" class="pictureBank" title="Picture Bank">&nbsp;</a></div>

				<div class="nav"><a href="/teacher/reference/index.php" class="referenceToolbox" title="Reference Toolbox">&nbsp;</a></div>

				<div class="nav"><a href="/teacher/pupilsProgressReport/index.php" class="pupilsReport" title="Pupul's Progress Report">&nbsp;</a></div>

			</div>

		</div>	

		<!-- Left Box End -->

		<!-- Right Navigation Start here -->

		<div class="rightBox">

			<div class="greenBox">

				<div><img src="/images/teacher/header_picture_bank.gif" alt="" width="666" height="84" /></div>

				<div class="contentBox">

					<div class="margin">

						<!-- Content Start Here -->

						<div class="topHeader">

							<div class="headerIcon bg bgDb">

								<div class="form">

									<div class="lable" style="width: 50px;"><img src="/images/teacher/word_topic.gif" /></div>

									<div class="formObject" style="margin: 0 20px 0 0">

										<select name="picCat" onchange="javascript:searchPicture(0);" class="cat">

											<option value="">-----------All------------</option>

										<? foreach ($cats as $cat) {?>

											<option value="<?=$cat->cat_id?>" <? if ($cat->cat_id == $picCat) echo "selected";?>><?=$cat->cat_name?></option>

										<? } ?>

										</select>

									</div>

									<div class="clearer" style="height: 5px;"></div>

									<div class="lable" style="width: 50px;"><img src="/images/teacher/word_search.gif" /></div>

									<div class="formObject"><input type="text" name="keyword" value="<?=$picKeyword?>" class="keyword" /></div>

									<div class="formObject"><input type="image" src="/images/teacher/btn_go.gif" onclick="javascript:searchPicture(0);" name="submit" /></div>

								</div>

							</div>

						</div>

							<? //if ($picSearch) {

										if ($showPic) { ?>

							<div id="picPreview" ><div id="close"  style="position:absolute;right:15px;top:15px"></div><div id="save" align="center"></div><div id="picture"></div></div>

						  <table cellpadding="0" cellspacing="0" class="pictureBankTable">

							<?

											$picCount = 0;

											$picOnRow = 5;

											

											$totalpage = $totalPic/15;

											

											foreach ($pics as $pic) {

												$picCount = $picCount + 1;

												if ($picCount%$picOnRow == 1) {

													echo "<tr>";

												}

							
				

												echo "<td><div style=\"margin-bottom:0px;width:110px;height:110px;overflow:hidden;border:2px solid #CCCCCC;\" onmouseover='this.style.borderColor=\"#9900CC\"' onmouseout='this.style.borderColor=\"#CCCCCC\"'><div style='width:110px;height:110px;overflow:hidden'><table width='110' border='0' cellpadding='0' cellspacing='0'><tr><td height='110' style='vertical-align:middle'><img src=\"/teacher/pictureBank/thumbs/".$pic->file_name."\" onclick='showPic(\"".$pic->file_name."\", \"filepath=teacher&filesection=pictureBank&filename=".$pic->file_name."\")' style='cursor:pointer' /></td></tr></table></div></div><div>".$pic->keyword."</div></td>";



												if ($picCount%$picOnRow == 0) {

													echo "</tr>";

												}

											}

								?>

						  </table>

						  <? 		}

										else {

											echo "<div class=\"noPicFound\">No Picture Found</div>";

										}

								//}

						  ?>

				  </div>

						<div class="actionButton">

						

            <?php

							if ($picFrom > 0) {

						?>

            	<a href="#" onclick="searchPicture('<?=$picFrom-$picNoRecord?>');return false;" ><img src="/images/teacher/btn_back.gif" alt="Back" border="0" /></a>           

            <?php

							}

							

							if ($totalPic > $picFrom + $picNoRecord ) {

						?>

              <a href="javascript:searchPicture('<?=$picFrom+$picNoRecord?>');"><img src="/images/teacher/btn_next.gif" alt="Next" width="60" height="23" border="0" /></a>

						<?php

							}

						?>

            </div>

           	<?php	

							if ($totalPic > $picNoRecord) {

            ?>

						<div class="pagingBlock">

							<div class="word"><img src="/images/teacher/word_pages.gif" alt="" /></div>

           					<div class="select" id="pagingPulldown" style="margin-top:4px">

                            



                            	  <select name="select" id="select" onchange="searchPicture(this.value)">

                                  <?php

								$i=1;

								for ( $i=1; $i<$totalpage+1; $i++) { 

						?>

                            	    <option value="<?=($i-1)*$picNoRecord?>"  <? if($picFrom == ($i-1)*$picNoRecord){?> selected="selected"<? }?> ><?=$i?></option>

                                    <?

								}

						?>

                       	        </select>

 

           					</div>

							

				  </div>

						

						<br />

						<?

								}

						?>

                        <div class="clearer"></div>

            <!-- Content End -->

			  </div>

  			  <div><img src="/images/teacher/header_bottom.gif" width="668" height="26" alt="" /></div>

		  </div>

				

	  </div>

	</div>

		<div class="clearer"></div>

		<!-- Right Navigation End -->

		<br /><br /><br />

		<?php include "../../include/layouts/teacherFooter.php"; ?>

	</div>

</div>

  <input type="hidden" name="search" value="true" />

  <input type="hidden" name="picFrom" value="0" />   

</form>

</body>

</html>

