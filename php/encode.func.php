<?php
/**
 * �κα����ַ���ת��Ϊutf-8
 *
 * @param string $str �����ַ���
 * @return string ���utf-8�����ַ���
 */
function anystring2utf8($str) {
	$encode = mb_detect_encoding($str,"ASCII,UNICODE,UTF-8,GBK,CP936,EUC-CN,BIG-5,EUC-TW");
	return ($encode != 'UTF-8' && $encode != 'ASCII' ? iconv($encode,'UTF-8',$str) : $str);
}
/**
 * �κα����ַ���ת��Ϊgbk
 *
 * @param string $str �����ַ���
 * @return string ���gbk�����ַ���
 */
function anystring2gbk($str) {
	$encode = mb_detect_encoding($str,"ASCII,UNICODE,UTF-8,GBK,CP936,EUC-CN,BIG-5,EUC-TW");
	return ($encode != 'CP936' && $encode != 'ASCII' && $encode != 'GBK' ? iconv($encode,'GB18030',$str) : $str);
}

/**
 * �κα����ַ���(����)ת��Ϊutf-8
 *
 * @param mixed $string �����ַ���(����)
 * @return mixed ���utf-8�����ַ���(����)
 */
function any2utf8($string) {//ͨ���ݹ�ת���ַ�������
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = any2utf8($val); //�ݹ�
		}
	} else {
		$string = anystring2utf8($string);
	}
	return $string;
}
/**
 * �κα����ַ���(����)ת��Ϊgbk
 *
 * @param mixed $string �����ַ���(����)
 * @return mixed ���gbk�����ַ���(����)
 */
function any2gbk($string) {//ͨ���ݹ�ת���ַ�������
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = any2gbk($val); //�ݹ�
		}
	} else {
		$string = anystring2gbk($string);
	}
	return $string;
}
?>