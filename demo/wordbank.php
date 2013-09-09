<?

include_once("_startup.php");
include_once("_login_session.php");
$dataPath = '/resource_download/materials/';

switch($_GET['section']){
	case 'by_book':
	$books = array(
				array(
					  'bookname'=>'1A',
					  'topics'=>'People around us<br>Toys<br>Numbers (1–10)<br>Colours<br>Things I bring to school<br>Things at school<br>Body parts<br>Adjectives<br>Feelings<br>Actions<br>Gifts<br>Classroom language',
					  'downloadfile'=>'lwte_word_bank_1A.doc'
				),
				array(
					  'bookname'=>'1B',
					  'topics'=>'Pets<br>Animals<br>Numbers (1–20)<br>Actions<br>Feelings<br>Things at home<br>Places and positions<br>Things we wear<br>Food and drink<br>Classroom language',
					  'downloadfile'=>'lwte_word_bank_1B.doc'
				),
				array(
					  'bookname'=>'2A',
					  'topics'=>'Getting around<br>Positions<br>Jobs<br>School subjects<br>Adjectives<br>Feelings<br>Actions related to rules<br>In the park',
					  'downloadfile'=>'lwte_word_bank_2A.doc'
				),
				array(
					  'bookname'=>'2B',
					  'topics'=>'Telling the time<br>Daily actions<br>Housework<br>Weekly activities<br>Days of the week<br>Tastes<br>Food and drink',
					  'downloadfile'=>'lwte_word_bank_2B.doc'
				),
				array(
					  'bookname'=>'3A',
					  'topics'=>'Seasons and activities<br>Weather<br>Festivals and activities<br>My things<br>School events<br>Months<br>Actions<br>Textures<br>Numbers (20–100)',
					  'downloadfile'=>'lwte_word_bank_3A.doc'
				),
				array(
					  'bookname'=>'3B',
					  'topics'=>'Positions<br>Places at school<br>Feelings<br>Adjectives<br>Things around us<br>Holiday activities<br>Abilities',
					  'downloadfile'=>'lwte_word_bank_3B.doc'
				),
				array(
					  'bookname'=>'4A',
					  'topics'=>'Free time activities<br>Habits<br>Actions<br>Abilities<br>Electronic products<br>Things around us<br>Places<br>Opposite adjectives<br>Adverbs<br>Animals and insects<br>Food and drink<br>Transport',
					  'downloadfile'=>'lwte_word_bank_4A.doc'
				),
				array(
					  'bookname'=>'4B',
					  'topics'=>'Clubs<br>Places to visit in Hong Kong<br>Actions related to rules<br>Fun activities<br>Food and drink',
					  'downloadfile'=>'lwte_word_bank_4B.doc'
				),
				array(
					  'bookname'=>'5A',
					  'topics'=>'Actions<br>Plans<br>Free time activities<br>Injuries and illnesses<br>Things to do when you are ill<br>Weather<br>Things around us<br>Festivals and activities',
					  'downloadfile'=>'lwte_word_bank_5A.doc'
				),
				array(
					  'bookname'=>'5B',
					  'topics'=>'Cooking<br>Making crafts<br>Simple actions<br>Experiences<br>Leisure activities<br>Animals<br>Feelings<br>Food and drink<br>Opposite adjectives<br>Things and places in a country park',
					  'downloadfile'=>'lwte_word_bank_5B.doc'
				),
				array(
					  'bookname'=>'6A',
					  'topics'=>'Jobs<br>Things people do<br>Hobbies<br>Materials<br>Things around us<br>Environmental protection<br>About pollution',
					  'downloadfile'=>'lwte_word_bank_6A.doc'
				),
				array(
					  'bookname'=>'6B',
					  'topics'=>'Leisure activities<br>Things I learnt from my teachers<br>Directions and positions<br>Places<br>Unhappy events<br>Opposite adjectives<br>Adjectives about people<br>Adjectives about experiences',
					  'downloadfile'=>'lwte_word_bank_6B.doc'
				)
		);	
	break;
}
?>



<html>

<head>

<title>Longman Welcome to English</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<!-- Fireworks 4.0  Dreamweaver 4.0 target.  Created Tue Jan 25 19:35:17 GMT+0800 (China Standard Time) 2005-->

<link rel="stylesheet" href="../css/main.css" type="text/css">
<link rel="stylesheet" href="../css/style.css" type="text/css">
<script lanuage="javascript" src="../js/common.js"></script>



</head>

<body bgcolor="#0066cc" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" background="images/bg.gif">

<form name="form1" method="post" action="">

<table height="100%" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>

<table width="770" border="0" cellspacing="0" cellpadding="0">

  <tr>

    <td colspan="2">

      <? include("_top.php"); ?>

    </td>

  </tr>

  <tr>

    <td valign="top">&nbsp;</td>

    <td valign="top">

      <table width="100%" border="0" cellspacing="0" cellpadding="0">

        <tr>

          <td><img src="images/spacer.gif" width="10" height="8"></td>

                  <td height="20" width="100%">

            <? include("_account_info.php"); ?>

           </td>

        </tr>

      </table>

    </td>

  </tr>

  <tr>

    <td valign="top" height="100%">

            <? include("_left.php"); ?>

    </td>

    <td>

      <table border="0" cellpadding="0" cellspacing="0" width="660">

        <!-- fwtable fwsrc="LWTE_Teacher_inside.png" fwbase="pic.jpg" fwstyle="Dreamweaver" fwdocid = "742308039" fwnested="1" -->

        <tr>

          <td>

            <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FF9900">

              <tr>

                <td>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%">

                    <tr>

                      <td><img name="tea_pic_top" src="images/tea_pic_top.gif" width="495" height="8" border="0"></td>

                    </tr>

                    <tr>

                      <td height="21" width="495" bgcolor="#FF9900" class="tea_nav"><img src="images/spacer.gif" width="10" height="1">

<? include ("_nav_link.php"); ?>



                        &gt; <a href="picture_bank_list.php" class="tea_nav">Teacher's Resources Centre</a>

                        &gt; <span class="tea_nav_highlight">School-based Materials</span></td>

                    </tr>

                    <tr>

                      <td><img name="tea_pic_head" src="images/ab_downRe_head_sbm.gif" width="495" height="63" border="0"></td>

                    </tr>

                  </table>

                </td>

                <td valign="top"><img name="tea_pic_rlogo" src="images/ab_downRe_corpix.gif" width="165" height="85" border="0"></td>

              </tr>

            </table>

          </td>

        </tr>

        <tr>

                      <td height="25" align=middle valign="top" bgcolor="#ff9900">

                        <table border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#CC0000">



                          <tr>

                            <td valign="top" bgcolor="#CC0000"><div align="center">

                              <table width="100%" border="0" align="right" cellpadding="0" cellspacing="0">

							  	<tr bgcolor="CC0000">

								  <td></td>

							  	</tr>

                                <tr>

                                  <td width="100%" valign="top" bgcolor="#CC0000">

								  <table width="524"  border="0" cellpadding="0" cellspacing="0">

                                        <tr>

                                          <td width="35"><img src="images/spacer.gif" width="35" height="8"></td>

                                          <td>

										  	<table cellpadding="0" cellspacing="0" border="0" width="100%">

												<tr>

													<td><img src="images/spacer.gif" width="1" height="25"></td>

												</tr>

											<tr>

													<td bgcolor="#FFFFFF">
                                                    <br>
                                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="font-family:Verdana">
                                    <tr>
                                      <td width="1%"><img src="images/UP_L.jpg" width="7" height="7"></td>
                                      <td width="98%" bgcolor="#FE9900"></td>
                                      <td width="1%"><img src="images/UP_R.jpg" width="7" height="7"></td>
                                    </tr>
                                    <tr>
                                      <td bgcolor="#FE9900"></td>
                                      <td bgcolor="#FE9900"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:10px 0px">
                                        <tr>
                                          <td height="50"><span class="text_1">Word Bank — By book </span></td>
                                          </tr>
                                        <tr>
                                          <td>
                                            <?php 
											foreach($books as $book){
											?>
                                            
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                              <tr>
                                                <td>&nbsp;</td>
                                                <td></td>
                                                </tr>
                                              <?php
												if($book['bookname'] != ''){
												?>
                                              <tr>
                                                <td width="74%" class="text_3"><?php echo $book['bookname'];?></td>
                                                <td width="26%"></td>
                                                </tr>
                                              <?php
												}
												?>
                                              <tr>
                                                <td width="74%" class="line_height_normal"><?php echo $book['topics'];?></td>
                                                <td width="26%" valign="bottom">
                                                  <table border="0" cellpadding="0" cellspacing="0" class="icon_b f_l margin">
                                                    <tr>
                                                      <td width="13"><img src="images/L.jpg" width="13" height="29"></td>
                                                      <td bgcolor="#D61D01" class="icon_b"><a href="data_file_download.php?data_path=<?php echo $dataPath;?><?php echo $book['downloadfile'];?>&file_name=<?php echo $book['downloadfile'];?>" class="m_download">Download</a></td>
                                                      <td width="13"><img src="images/R.jpg" width="13" height="29"></td>
                                                      </tr>
                                                    
                                                    
                                                    </table>
                                                  </td>
                                                </tr>
                                              <tr>
                                                <td colspan="2" height="11"><div style="height:1px;overflow:hidden; border-bottom:1px solid #D61D01"></div></td>
                                                </tr>
                                              </table>
                                            <?php
											}
											?>   
                                            </td>
                                          </tr>
                                        
                                        </table></td>
                                      <td bgcolor="#FE9900"></td>
                                    </tr>
                                    <tr>
                                      <td><img src="images/DOWN_L.jpg" width="7" height="7"></td>
                                      <td bgcolor="#FE9900"></td>
                                      <td><img src="images/DOWN_R.jpg" width="7" height="7"></td>
                                    </tr>
                                  </table>
                                  <br>
                                  </td>

												</tr>


												<tr>

													<td>&nbsp;</td>

												</tr>



												<tr>

													<td>

<span class="tea_nav_highlight">

<br>

<font style="color:#FF9900">

Please click the link below to download the SIL IPA fonts to view the phonetic symbols in the Phonics Worksheets properly.

<br>

<a

style="color:white"

href="http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=encore-ipa#801ab246" target="_blank">http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=encore-ipa#801ab246 </a>

<br>

</font>

</span>

													</td>

												</tr>





											</table>

										  </td>

										  

										  

                                        </tr>

                                    </table>

								  </td>

                                </tr>

                              </table>

                            </div></td>

                            <td rowspan="5" valign="bottom"><img src="images/ab_resorce_right.gif"></td>

                          </tr>

                          <tr>

                            <td height="20" valign="bottom" bgcolor="#CC0000"><img src="images/ab_resource_low1a.gif" width="524" usemap="#low1" border="0"></td>

                          </tr>

                        </table>

					  </td>

                </tr>



					<tr>

                    <td background="../images/common/ab_ehome_lowBg.gif"><table width="100%"  border="0" cellpadding="0" cellspacing="0">

                      <tr>

                        <td valign="bottom"><img src="images/ab_resource_low.gif"></td>

                      </tr>

                    </table>

					</td>

                    </tr>



      </table>

    </td>

  </tr>

  <tr><td><img src="images/spacer.gif" width="1" height="8" border="0"></td></tr>

</table>

</td></tr>

<tr valign="top"><td bgcolor="#068800" height="100%">

<? include("_bottom.php"); ?>

</td></tr></table>

</form>

<map name="low1">

<area alt="" coords="29,27,101,55" href="materials.php">

</map>

</body>

</html>

