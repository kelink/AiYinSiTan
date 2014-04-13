<?php
    //echo "haha";
	//echo 'haha';
	$num = $_POST['data'];
	$song['song_id'] = 1;
	$song['song_name'] = "haha";
	$data['data'] = array();
	array_push($data['data'], $song);
	echo json_encode($data);
	// // exit(0);
	// $liArray = array();
	// for($i = 0; $i < $num; $i++){
	// 	$data['img'] = "../media/images/new_game1.gif";
	// 	$data['title'] = "游戏名字";
	// 	array_push($liArray, $data);
	// }
	// ajaxReturn($liArray,'获取信息成功', 1);

 //    /**
 //     * Ajax方式返回数据到客户端
 //     * @access protected
 //     * @param mixed $data 要返回的数据
 //     * @param String $type AJAX返回数据格式
 //     * @return void
 //     */
 //    function ajaxReturn($data,$type='') {
 //        if(func_num_args()>2) {// 兼容3.0之前用法
 //            $args           =   func_get_args();
 //            array_shift($args);
 //            $info           =   array();
 //            $info['data']   =   $data;
 //            $info['info']   =   array_shift($args);
 //            $info['status'] =   array_shift($args);
 //            $data           =   $info;
 //            $type           =   $args?array_shift($args):'';
 //        }
 //        if(empty($type)) $type  =   'JSON';
 //        if(strtoupper($type)=='JSON') {
 //            // 返回JSON数据格式到客户端 包含状态信息
 //            header('Content-Type:text/html; charset=utf-8');
 //            exit(json_encode($data));
 //        }elseif(strtoupper($type)=='XML'){
 //            // 返回xml格式数据
 //            header('Content-Type:text/xml; charset=utf-8');
 //            exit(xml_encode($data));
 //        }elseif(strtoupper($type)=='EVAL'){
 //            // 返回可执行的js脚本
 //            header('Content-Type:text/html; charset=utf-8');
 //            exit($data);
 //        }else{
 //            // TODO 增加其它格式
 //        }
 //    }
?>