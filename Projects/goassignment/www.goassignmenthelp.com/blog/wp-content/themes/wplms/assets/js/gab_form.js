function callsnow(){
        document.getElementById("snowfall").innerHTML="<canvas id='canv' style='margin: 0;padding: 0;position: fixed;touch-action: none;width: calc(100% - 2px);height: calc(100% - 2px); top:0;left:0;border:none'></canvas>";

     var c = document.getElementById('canv'), 
    ctx = c.getContext("2d");
var w = c.width = window.innerWidth, 
    h = c.height = window.innerHeight;


    Snowy();

function Snowy() {
  var snow, arr = [];
  var num = 600, tsc = 1, sp = 1;
  var sc = 1.3, t = 0, mv = 20, min = 1;
    for (var i = 0; i < num; ++i) {
      snow = new Flake();
      snow.y = Math.random() * (h + 50);
      snow.x = Math.random() * w;
      snow.t = Math.random() * (Math.PI * 2);
      snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
      snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
      snow.sp = snow.sp < min ? min : snow.sp;
      arr.push(snow);
    }
  go();
  function go(){
    window.requestAnimationFrame(go);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, w, h);
      ctx.fill();
        for (var i = 0; i < arr.length; ++i) {
          f = arr[i];
          f.t += .05;
          f.t = f.t >= Math.PI * 2 ? 0 : f.t;
          f.y += f.sp;
          f.x += Math.sin(f.t * tsc) * (f.sz * .3);
          if (f.y > h + 50) f.y = -10 - Math.random() * mv;
          if (f.x > w + mv) f.x = - mv;
          if (f.x < - mv) f.x = w + mv;
          f.draw();}
 }
 function Flake() {
   this.draw = function() {
      this.g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
      this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
      this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
      ctx.moveTo(this.x, this.y);
      ctx.fillStyle = this.g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
      ctx.fill();}
  }
}
window.addEventListener('resize', function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);


}
//callsnow();
var baseProtocol ="https";
$(document).ready(function(){
try{
   $("#fileupload").validate(
                {rules:{
				number:{required:true,number:true},
subject:{required:true}					
                },
                 messages: {
        email:"Enter Email Id",
        subject:"Select Subject",
        date:"Please select deadline"
        },});
}catch(err){}
$( "#order_date" ).datetimepicker({ dateFormat: 'yy-mm-dd',minDate:new Date()});
        var get_Data=function(request,response){
         $.ajax({
            url: baseProtocol + '://api.transtutors.com/api/AssignmentSubmit/GetSubjectList',
            dataType: "json",
            data: {
                term: request.term
            },
            success: function (data) {
                var parsed = JSON.parse(data);
                var newArray = new Array(parsed.length);
                var i = 0;

                parsed.forEach(function (entry) {
                    var newObject = {
                        label: entry.label,
                        value:entry.value,
                        desc:entry.desc
                    };
                    newArray[i] = newObject;
                    i++;
                });

                response(newArray);
            }
        });
    }
        var select = false;
        try{
         $( "#subject" ).autocomplete({
source:get_Data,
minLength:3,autoFocus:false,selectFirst:true,
 open: function(event, ui) { if(select) select=false; },
         select: function(event, ui) {
              
        if(ui.item){
            select=true;
$(this).val(ui.item.label);
var topics=ui.item.value.split("|");
$("#topicId").val(topics[0]);
$("#subTopicId").val(topics[2]);
return false;
             }
        
    },
    focus: function(event, ui) {
        event.preventDefault();
        //$(this).val(ui.item.label);
    }
     
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      return $("<li></li>")
        .data("item.ui-autocomplete", item)
        .append("<a><strong>" + item.label + "</strong> <br> " + item.desc + "</a>")
        .appendTo(ul);
    };
    $( "#subject" ).blur(function(){
       (!select&&$(this).val().length>0)?($("#topicId").val("17346"),$("#subTopicId").val("18033")):"";
        });
     }
     catch(err){}
});
