

 function GetRTime(){
       var EndTime= new Date('2019/01/31 00:00:00');
       var NowTime = new Date();
       var t =EndTime.getTime() - NowTime.getTime();
       var d=Math.floor(t/1000/60/60/24);
       var h=Math.floor(t/1000/60/60%24);
       var m=Math.floor(t/1000/60%60);
       var s=Math.floor(t/1000%60);
	   
	          var EndTime1= new Date('2019/02/18 00:00:00');
       var NowTime1 = new Date();
       var t1 =EndTime1.getTime() - NowTime1.getTime();
       var d1=Math.floor(t1/1000/60/60/24);
       var h1=Math.floor(t1/1000/60/60%24);
       var m1=Math.floor(t1/1000/60%60);
       var s1=Math.floor(t1/1000%60);
	   
	          var EndTime2= new Date('2019/03/10 00:00:00');
       var NowTime2 = new Date();
       var t2 =EndTime2.getTime() - NowTime2.getTime();
       var d2=Math.floor(t2/1000/60/60/24);
       var h2=Math.floor(t2/1000/60/60%24);
       var m2=Math.floor(t2/1000/60%60);
       var s2=Math.floor(t2/1000%60);

       document.getElementById("t_d").innerHTML = d + "天";
       document.getElementById("t_h").innerHTML = h + "时";
       document.getElementById("t_m").innerHTML = m + "分";
       document.getElementById("t_s").innerHTML = s + "秒";
	   document.getElementById("t_d1").innerHTML = d1 + "天";
       document.getElementById("t_h1").innerHTML = h1 + "时";
       document.getElementById("t_m1").innerHTML = m1 + "分";
       document.getElementById("t_s1").innerHTML = s1 + "秒";
	   document.getElementById("t_d2").innerHTML = d2 + "天";
       document.getElementById("t_h2").innerHTML = h2 + "时";
       document.getElementById("t_m2").innerHTML = m2 + "分";
       document.getElementById("t_s2").innerHTML = s2 + "秒";

   }
   setInterval(GetRTime,1000);
    

    

	

