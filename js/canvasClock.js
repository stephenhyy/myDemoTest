/**
 * Created by steve on 2017/2/17.
 */
window.onload=function()
{
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	function drawClock()
	{
		var now=new Date();
		var hours=now.getHours();
		var min=now.getMinutes();
		var second=now.getSeconds();
		hours=hours%12;
		hours=hours+min/60;
		ctx.clearRect(0,0,500,500);
		//��������Բ
		ctx.lineWidth="10";
		ctx.strokeStyle="blue";
		ctx.beginPath();
		ctx.arc(250,250,200,0,Math.PI * 2,true);
		ctx.closePath();
		ctx.stroke();
//��ʱ��ı��̶̿�
		for(var i=0;i<12;i++)
		{
			ctx.save();
			ctx.lineWidth="7";
			ctx.strokeStyle="#000";
			ctx.translate(250,250);
			ctx.rotate(30*i*Math.PI/180);
			ctx.beginPath();
			ctx.moveTo(0,-190);
			ctx.lineTo(0,-170);
			//����������ʽ
			ctx.font = "16px Courier New";
			//�������(0,-150)��ʼ��������
			ctx.textAlign="center";
			ctx.fillText(i==0?12:i,0,-150);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
//������ı��̶̿�
		for(var i=0;i<60;i++)
		{
			ctx.save();
			ctx.lineWidth="5";
			ctx.strokeStyle="#000";
			ctx.translate(250,250);
			ctx.rotate(6*i*Math.PI/180);
			ctx.beginPath();
			ctx.moveTo(0,-190);
			ctx.lineTo(0,-180);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
//��ʱ��
		ctx.save();
		ctx.lineWidth="10";
		ctx.strokeStyle="#000";
		ctx.translate(250,250);
		ctx.rotate(hours*30*Math.PI/180);
		ctx.beginPath();
		ctx.moveTo(0,-100);
		ctx.lineTo(0,20);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
//������
		ctx.save();
		ctx.lineWidth="7";
		ctx.strokeStyle="#000";
		ctx.translate(250,250);
		ctx.rotate(min*6*Math.PI/180);
		ctx.beginPath();
		ctx.moveTo(0,-140);
		ctx.lineTo(0,20);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
//������
		ctx.save();
		ctx.lineWidth="5";
		ctx.strokeStyle="red";
		ctx.translate(250,250);
		ctx.rotate(second*6*Math.PI/180);
		ctx.beginPath();
		ctx.moveTo(0,-160);
		ctx.lineTo(0,20);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
//����
		ctx.save();
		ctx.lineWidth="3";
		ctx.strokeStyle="red";
		ctx.fillStyle="gray";
		ctx.translate(250,250);
		ctx.rotate(second*6*Math.PI/180);
		ctx.beginPath();
		ctx.arc(0,0,5,0,2*Math.PI,true);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.beginPath();
		ctx.arc(0,-130,5,0,2*Math.PI,true);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	drawClock();
	setInterval(drawClock,1000);

}

