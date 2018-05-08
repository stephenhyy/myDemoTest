$(document).ready(function(){
    initCdnButton();
    loadTableData();
    // 编辑广告组提交
    $("#editMajor #editOkBtn").click(function(){
        $("#editMajorForm").data('bootstrapValidator').destroy();
        $('#editMajorForm').data('bootstrapValidator', null);
        Validalidator('editMajorForm');
        $('#editMajorForm').data('bootstrapValidator').validate();
        var flag = $('#editMajorForm').data('bootstrapValidator').isValid()//验证是否通过true/false
        if(flag) {
            $('#addMajorForm')[0].reset();
            $("#editMajor").modal('hide');
            toastr.success('编辑成功！');
        }

    });
    //关闭编辑框触发事件
    $("#editMajor").on('hidden.bs.modal',function(){
        $('#addMajorForm')[0].reset();
        //移除上次的校验配置
        $("#editMajorForm").data('bootstrapValidator').destroy();
        $('#editMajorForm').data('bootstrapValidator', null);

        //错误标识删了
        $('.form-group .errorTip').removeClass('show')
    });


    //添加填充
    $("#addMajor").on('show.bs.modal',function(){

        // $.get("queryUnBindElementsByPage",function(result){
        //     //初始化两个下拉框
        //     var outerOption='<option  value="HomePage_web">跳转webview</option>';
        //     var functionOptions=getFunctionOption();
        //     var innerOption='<option  value="empty">无</option>';
        //     for(var i=0;i<functionOptions.length;i++){
        //         var func = functionOptions[i];
        //         if(func.code!='HomePage_web'){
        //             innerOption += '<option value='+func.code+'>'+func.name+'</option>';
        //         }
        //     }
        //
        //     var childrenData=copyObject(result.dataSet);
        //     var currentChildren ={"children":childrenData};
        //     var child   =  $("#child-tpl").html();
        //     var template = Handlebars.compile(child);
        //     $("#addfunctionCode").html(innerOption);
        //     for(var i=0;i<childrenData.length;i++){
        //         childrenData[i].picPath=childrenData[i].picSavepath !="/"?("getImg/"+childrenData[i].picSavepath):"/resource/admin/zzb/img/default.png";
        //     }
        //     var currentChildren ={"children":childrenData};
        //     var bbb = template(currentChildren);
        //     $("#addChildList").html(bbb);
        //     $('.addChildList input[type=checkbox]').iCheck({
        //         checkboxClass: 'icheckbox_square-blue',
        //         radioClass: 'iradio_square-blue',
        //         increaseArea: '20%' // optional
        //     });
        //     $('.addChildList input[type=checkbox]').on('ifClicked', function(event){
        //         $('.form-group .errorTip').removeClass('show');
        //     });
        //     //选择类型时
        //     var radioCtrl='<label><input type="radio" name="headerCtl"  value="0">显示</label>&nbsp<label><input type="radio" name="headerCtl"  value="1">不显示</label>';
        //     $("#addMajorgroupType").change(function () {
        //         $("#addMajorForm").data('bootstrapValidator').destroy();
        //         $('#addMajorForm').data('bootstrapValidator', null);
        //         if(parseInt($("#addMajorgroupType option:selected").val())>1){
        //             $("#addMajorHeaderCtrl").html(radioCtrl);
        //             $("#addMajor input[name='headerCtl'][value='0']").attr("checked",'checked');
        //         }else{
        //             $("#addMajorHeaderCtrl").html(radioCtrl);
        //             $("#addMajor input[name='headerCtl'][value='1']").attr("checked",'checked');
        //         }
        //         Validalidator('addMajorForm');
        //     });
            Validalidator('addMajorForm');
        //     $("#hideAddFunctionCode").attr('disabled','disabled');
        //     $("#addswitchType").change(function () {
        //         if(parseInt($(this).find("input[name='switchType']:checked").val())==0){
        //             $("#addfunctionCode").html(outerOption);
        //         }else{
        //             $("#addfunctionCode").html(innerOption);
        //         }
        //     });
        // })

    })
    // 增加广告组提交
    $("#addMajor #addOkBtn").click(function () {
        Validalidator('addMajorForm');
        $('#addMajorForm').data('bootstrapValidator').validate();
        var flag = $('#addMajorForm').data('bootstrapValidator').isValid()//验证是否通过true/false
        if(flag){
            $('#addMajorForm')[0].reset();
            $("#addMajor").modal('hide');
            toastr.success('新增成功！')

        }
    });
    //关闭add对话框触发的事件
    $("#addMajor").on('hidden.bs.modal',function(){
        $('#addMajorForm')[0].reset();
        //移除上次的校验配置
        $("#addMajorForm").data('bootstrapValidator').destroy();
        $('#addMajorForm').data('bootstrapValidator', null);

        //错误标识删了
        $('.form-group .errorTip').removeClass('show')

        $("#addMajorForm img[name='preImg']").attr('src','/resource/admin/zzb/img/default.png');
        $("#addMajorForm img[name='preIcon']").attr('src','/resource/admin/zzb/img/default.png');
        $("#addMajorForm input[name='picGroupName']").val('');
        $("#addMajorForm input[name='picFileName']").val('');
        $("#addMajorForm input[name='iconGroupName']").val('');
        $("#addMajorForm input[name='iconFileName']").val('');
        $('#addMajorForm input[name="optionChild"]:checked').removeAttr("checked")

    });

    // 删除广告组
    $("#deleteMajor #deleteOkBtn").click(function () {
        $("#deleteMajor").modal('hide');
        toastr.success('删除成功！');
    })
    //发布
    $("#publishOkBtn").click(function () {
        $("#publishMajor").modal('hide');
        toastr.success("发布成功！");
    })
    //change cdn
    $("#changeCdnOkBtn").click(function () {
        $('#changeCdnMajor button').attr('disabled','disabled');
        var self=this;
        self.changeToStatus = countCdnSwitch%2;
        $('#changeCdnMajor button').removeAttr('disabled');
        $("#changeCdnMajor").modal('hide');
        $("#labelChange").click();
        if (self.changeToStatus == 0) {
            $('#changeCdn').removeClass('off').addClass('on');
            $(".change-text").html("是")
        } else {
            $('#changeCdn').removeClass('on').addClass('off');
            $(".change-text").html('否')
        }
    })
    //
    $("#changeCdnMajor").on('show.bs.modal',function(){
        var cdnStatus=getCdnStatus();
        //设置一个隐藏域，存要切换为的状态
        var statusTo=cdnStatus%2;
        $("input[name='changeToStatus']").val(statusTo);
    });
});
//
function changeCount() {
    countCdnSwitch++;
}
//验证
function Validalidator(formId){
    $('#'+formId)
        .bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    message: 'rname is not valid',
                    validators: {
                        notEmpty: {
                            message: '主标题不能为空！'
                        }
                    }
                },
                weight: {
                    message: 'The weight is not valid',
                    validators: {
                        notEmpty: {
                            message: '权重不能为空！'
                        },
                        regexp:{
                            regexp: /^[0-9]+$/,
                            message: '请输入正整数'
                        },
                        stringLength:{
                            max:10,
                            message: '权重长度不能超过10'
                        }
                    }
                },
                headerCtl: {
                    message: 'The choice is not valid',
                    validators: {
                        callback: {
                            message: '当header显示时，类型只能是1*2或1*4的图片;当header不显示时，类型只能是1*1图片或1*1图文',
                            callback:function(value, validator){
                                if(parseInt(validator.$form.find("input[name='headerCtl']:checked").val())==0) {
                                    return parseInt(validator.$form.find("select[name='groupType'] option:selected").val()) > 1
                                }else{
                                    return !(parseInt(validator.$form.find("select[name='groupType'] option:selected").val()) > 1)
                                }
                            }
                        }
                    }
                },
                iosVersion: {
                    validators: {
                        regexp: {
                            regexp: /^\d+(\.\d+)*$/,
                            message: '请正确的版本号'
                        },
                    }
                },
                androidVersion: {
                    validators: {
                        regexp: {
                            regexp: /^\d+(\.\d+)*$/,
                            message: '请正确的版本号'
                        },
                    }
                },
                urlIos: {
                    message: 'urlIso is not valid',
                    validators: {
                        callback: {
                            message: '当跳转外部时必须填写IOS跳转路径',
                            callback: function (value, validator, $field) {
                                if (parseInt(validator.$form.find("input[name='switchType']:checked").val()) == 0) {
                                    return $field.val().trim() != '';
                                } else {
                                    return true;
                                }
                            }
                        }
                    }
                },
                urlAndroid: {
                    message: 'urlAndroid is not valid',
                    validators: {
                        callback: {
                            message: '当跳转外部时必须填写Android跳转路径',
                            callback:function(value, validator){
                                if(parseInt(validator.$form.find("input[name='switchType']:checked").val())==0) {
                                    return value.trim() !='';
                                }else{
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e) {
        // 阻止默认事件提交
        e.preventDefault();
    });
}
//上传图片
function uploadImg(formId){
    var formData = new FormData();
    if($("#"+formId+" input[name='addImage']").get(0).files.length==0){
        return false;
    }
    formData.append('upfile',$("#"+formId+" input[name='addImage']").get(0).files[0]);
    // $.ajax({
    //     url:'uploadImg',
    //     type:'post',
    //     contentType:false,
    //     data:formData,
    //     type:'post',
    //     processData:false,
    //     success:function(info){
    //         var returnCode = info.returnCode;
    //         if(returnCode=='0'){
    //             var data = info.dataSet[0];
    //             var groupName = data.groupName;
    //             var fileName = data.fileName;
    //             $("#"+formId+" img[name='preImg']").attr('src',"getImg/"+groupName+"/"+fileName);
    //             $("#"+formId+" input[name='picGroupName']").val(groupName);
    //             $("#"+formId+" input[name='picFileName']").val(fileName);
    //         }else{
    //             var returnInfo = info.returnInfo;
    //             alert(returnInfo);
    //         }
    //     },
    //     error:function(error){
    //         alert('error:'+error);
    //     }
    // });
}
function uploadIcon(formId){
    var formData = new FormData();
    if($("#"+formId+" input[name='addIcon']").get(0).files.length==0){
        return false;
    }
    formData.append('upfile',$("#"+formId+" input[name='addIcon']").get(0).files[0]);
    // $.ajax({
    //     url:'uploadImg',
    //     type:'post',
    //     contentType:false,
    //     data:formData,
    //     processData:false,
    //     success:function(info){
    //         var returnCode = info.returnCode;
    //         if(returnCode=='0'){
    //             var data = info.dataSet[0];
    //             var groupName = data.groupName;
    //             var fileName = data.fileName;
    //             $("#"+formId+" img[name='preIcon']").attr('src',"getImg/"+groupName+"/"+fileName);
    //             $("#"+formId+" input[name='iconGroupName']").val(groupName);
    //             $("#"+formId+" input[name='iconFileName']").val(fileName);
    //         }else{
    //             var returnInfo = info.returnInfo;
    //             alert(returnInfo);
    //         }
    //     },
    //     error:function(error){
    //         alert('error:'+error);
    //     }
    // });
}
//init CDN选择
function initCdnButton(){
    var cdnStatus=getCdnStatus();
    if(cdnStatus==0){
        $('#changeCdn').removeClass('off').addClass('on');
        $(".change-text").html("是")
    }else{
        $('#changeCdn').removeClass('on').addClass('off');
        $(".change-text").html('否')
    }
}
//init表格
function loadTableData() {
    var data = getAllCards();
    for(var i=0;i<data.length;i++){
        data[i].typeString=typeString[data[i].groupType]
        data[i].zoneString = data[i].isTop==0?"置顶组":"普通组"
        data[i].funString = data[i].name;
        data[i].statusString = data[i].status==0?"下架":"上架"
        data[i].switchTypeString = data[i].switchType==0?"跳转地址":"跳转原生"
        data[i].headerCtlString = data[i].headerCtl==0?"显示":"不显示"
    }
    table = $('#tableContent').DataTable({
        data:data,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'typeString'},
            { data: 'weight'},
            { data: 'zoneString'},
            { data: 'funString'},
            { data: 'headerCtlString'},
            { data: 'switchTypeString'},
            { data: 'statusString'},
        ],
        "columnDefs": [ {
            "targets": -1,
            "data": null,
            "render": function(data, type, row) {
                return data + '<div class="tools"><span title="查看" data-toggle="modal" data-target="#viewMajor">查看</span><span title="编辑" data-toggle="modal" data-target="#editMajor">编辑</span><span title="删除" data-toggle="modal" data-target="#deleteMajor">删除</span></div>';
            },
        } ],
        language: {
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            }
        },
        'paging'      : true,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : false,
        'info'        : false,
        'autoWidth'   : false
    })
    var dataMajor=null;
    // 表格内容事件
    $("table#tableContent tbody").delegate("tr","click",function(){
        dataMajor = table.row(this).data();
    });
    // 编辑广告组
    $("#editMajor").on('show.bs.modal',function(){
        var newObject=copyObject(dataMajor);
        initEditTable(newObject);
    });
    // 查看广告组
    $("#viewMajor").on('show.bs.modal',function(){
        var newObject=copyObject(dataMajor);
        initViewTable(newObject);
    });
    // 删除广告组
    $("#deleteMajor").on('show.bs.modal',function(){
        $("#deleteMajor input[name='majorId']").val(dataMajor.id);
    })


}
//获取当前的CDN状态
function getCdnStatus(){
    var self=this;
    // $.ajax({
    //     url:"getCdnStatus",
    //     async:false,
    //     success:function(result) {
    //         self.cdnStatus=parseInt(result.returnInfo) ==3?1:0;
    //     }
    // });
    self.cdnStatus=countCdnSwitch
    return self.cdnStatus;
}
//获取所有广告组
function getAllCards(){
    var self=this;
    // $.ajax({
    //     url:"queryCardsByPage",
    //     async:false,
    //     success:function(result) {
    //         self.cards=result.data;
    //     }
    // });
    return [
        {
            functionCode: "HomePage_reversebonds",
            groupType: "1",
            headerCtl: "1",
            icon: "",
            iconSavepath: "/",
            id: "2018050415590210",
            isCdn: "1",
            isTop: "0",
            name: "广告组1*1图文关联3个元件",
            pic: " ",
            picSavepath: "/",
            status: "1",
            switchType: "1",
            weight: "30000"
        },
        {
            abstractCnt: "22",
            androidVersion: "111",
            functionCode: "HomePage_web",
            groupType: "2",
            headerCtl: "0",
            icon: "",
            iconSavepath: "/",
            id: "201804269394000",
            iosVersion: "11",
            isCdn: "1",
            isTop: "0",
            name: "一键开户",
            pic: "",
            picSavepath: "",
            status: "0",
            switchType: "0",
            urlAndroid: "1",
            urlIos: "123",
            weight: "888"
        }
    ]
}
//获取目标广告组的关联元素
function getRelatedElements(id){
    // var self=this;
    // $.ajax({
    //     url:"queryElementsByCardId?cardId="+id,
    //     async:false,
    //     success:function(result) {
    //         self.elements=result.dataSet;
    //     }
    // });
    // var elements=self.elements;
    // return elements;
    return [];
}
//获取所有未绑定的
function getAllUnbindElement() {
    // var self=this;
    // $.ajax({
    //     url:"queryUnBindElementsByPage",
    //     async:false,
    //     success:function(result) {
    //         self.unbindElements=result.dataSet;
    //     }
    // });
    // return self.unbindElements;
    return [];
}
//获取功能编码
function getFunctionOption(){
    // var self=this;
    // $.ajax({
    //     url:'queryAllFunction',
    //     type:'post',
    //     async:false,
    //     contentType:false,
    //     data:null,
    //     processData:false,
    //     success:function(info){
    //         var returnCode = info.returnCode;
    //         if(returnCode=='0'){
    //             self.functionArr = info.dataSet;
    //         }
    //     },
    //     error:function(error){
    //         alert('error:'+error);
    //     }
    // });
    //return self.functionArr
    return [];
}
//查询卡片
function searchElement(flag){
    // var status = parseInt($('#searchStatus').find("option:selected").val());
    // var query=status==2?'':'status='+status;
    // if(flag){
    //     table.ajax.url('queryCardsByPage?'+query).load();
    //     $("input[name='search']").val("")
    //     return false;
    // }
    // var searchValue = $("input[name='search']").val();
    // if(searchValue){
    //     table.ajax.url('queryCardsByPage?name='+searchValue+'&'+query).load();
    // }else{
    //     table.ajax.url('queryCardsByPage?'+query).load();
    // }


}
//填充查看框的内容
function initViewTable(data) {
    var relateElement=getRelatedElements(data.id);
    var major   =  $("#view-major-tpl").html();
    var template = Handlebars.compile(major);
    data.typeSelect=[
        {
            num:0,
            name:typeString["0"],
            selected:data.groupType==0?"selected":""
        },
        {
            num:1,
            name:typeString["1"],
            selected:data.groupType==1?"selected":""
        },
        {
            num:2,
            name:typeString["2"],
            selected:data.groupType==2?"selected":""
        },
        {
            num:3,
            name:typeString["3"],
            selected:data.groupType==3?"selected":""
        },
    ];
    data.zoneSelect=[
        {
            num:0,
            name:zoneString["0"],
            selected:data.isTop==0?"selected":""
        },
        {
            num:1,
            name:zoneString["1"],
            selected:data.isTop==1?"selected":""
        }
    ];
    data.headerRadio=[
        {
            num:0,
            name:'显示',
            selected:data.headerCtl==0?"checked":""
        },
        {
            num:1,
            name:'不显示',
            selected:data.headerCtl==1?"checked":""
        }
    ];
    data.statusRadio=[
        {
            num:0,
            name:"下架",
            checked:data.status==0?"checked":""
        },
        {
            num:1,
            name:"上架",
            checked:data.status==1?"checked":""
        }
    ];
    data.cdnRadio=[
        {
            num:0,
            name:"使用",
            checked:data.isCdn==0?"checked":""
        },
        {
            num:1,
            name:"不使用",
            checked:data.isCdn==1?"checked":""
        }
    ];
    data.switchRadio=[
        {
            num:0,
            name:"跳转地址",
            checked:data.switchType==0?"checked":""
        },
        {
            num:1,
            name:"跳转原生",
            checked:data.switchType==1?"checked":""
        }
    ];
    data.children=relateElement;
    //data.picPath=data.picSavepath!='/'?("getImg/"+data.picSavepath):"/resource/admin/zzb/img/default.png";
    //data.iconPath=data.iconSavepath!='/'?("getImg/"+data.iconSavepath):"/resource/admin/zzb/img/default.png";
    data.urlIos=data.urlIos?data.urlIos:"缺失";
    data.urlAndroid=data.urlAndroid?data.urlAndroid:"缺失";
    data.abstractCnt=data.abstractCnt?data.abstractCnt:"缺失";
    data.iosVersion=data.iosVersion?data.iosVersion:"缺失";
    data.androidVersion=data.androidVersion?data.androidVersion:"缺失";
    var aaa = template(data);
    $("#viewMajorForm").html(aaa);
    var functionOptions=getFunctionOption();
    var func = functionOptions.filter(function (item) {
        return item.code==data.functionCode
    })
    var option = ''
    if(func.length>0){
    	option='<option value='+func[0].code+'>'+func[0].name+'</option>'
    }
    else
    {
    	option='<option value="empty">无</option>'
    }
    $("#viewfunctionCode").html(option);
}
//填充编辑框的内容
function initEditTable(data) {
    //Validalidator('editMajorForm');

    var element=[];
    var relateElement=copyObject(getRelatedElements(data.id));
    for(var i=0;i<relateElement.length;i++)
    {
        relateElement[i].checked="checked"
        relateElement[i].picPath=relateElement[i].picSavepath !="/"?("getImg/"+relateElement[i].picSavepath):"/resource/admin/zzb/img/default.png";
        element.push(relateElement[i]);
    }
    var major   =  $("#major-tpl").html();
    var template = Handlebars.compile(major);
    data.typeSelect=[
        {
            num:0,
            name:typeString["0"],
            selected:data.groupType==0?"selected":""
        },
        {
            num:1,
            name:typeString["1"],
            selected:data.groupType==1?"selected":""
        },
        {
            num:2,
            name:typeString["2"],
            selected:data.groupType==2?"selected":""
        },
        {
            num:3,
            name:typeString["3"],
            selected:data.groupType==3?"selected":""
        },
    ];
    data.zoneSelect=[
        {
            num:0,
            name:zoneString["0"],
            selected:data.isTop==0?"selected":""
        },
        {
            num:1,
            name:zoneString["1"],
            selected:data.isTop==1?"selected":""
        }
    ];
    data.headerRadio=[
        {
            num:0,
            name:'显示',
            checked:data.headerCtl==0?"checked":""
        },
        {
            num:1,
            name:'不显示',
            checked:data.headerCtl==1?"checked":""
        }
    ];
    data.statusRadio=[
        {
            num:0,
            name:"下架",
            checked:data.status==0?"checked":""
        },
        {
            num:1,
            name:"上架",
            checked:data.status==1?"checked":""
        }
    ];
    data.cdnRadio=[
        {
            num:0,
            name:"使用",
            checked:data.isCdn==0?"checked":""
        },
        {
            num:1,
            name:"不使用",
            checked:data.isCdn==1?"checked":""
        }
    ];
    data.switchRadio=[
        {
            num:0,
            name:"跳转地址",
            checked:data.switchType==0?"checked":""
        },
        {
            num:1,
            name:"跳转原生",
            checked:data.switchType==1?"checked":""
        }
    ];
    //data.picPath=data.picSavepath!='/'?("getImg/"+data.picSavepath):"/resource/admin/zzb/img/default.png";
    //data.iconPath=data.iconSavepath!='/'?("getImg/"+data.iconSavepath):"/resource/admin/zzb/img/default.png";
    data.picGroupName=data.picSavepath!='/'?data.picSavepath.split('/')[0]:'';
    data.picFileName=data.picSavepath!='/'?data.picSavepath.split('/')[1]:'';
    data.iconGroupName=data.iconSavepath!='/'?data.iconSavepath.split('/')[0]:'';
    data.iconFileName=data.iconSavepath!='/'?data.iconSavepath.split('/')[1]:'';
    var aaa = template(data);
    $("#editCard").html(aaa);

    //初始化两个下拉框
    var outerOption='<option  value="HomePage_web">跳转webview</option>';
    var functionOptions=getFunctionOption();
    var innerOption='<option  value="empty">无</option>';
    for(var i=0;i<functionOptions.length;i++){
        var func = functionOptions[i];
        if(func.code!='HomePage_web'){
            var selected=func.code==data.functionCode?'selected' :''
            innerOption += '<option '+ selected+' value='+func.code+'>'+func.name+'</option>';
        }
    }
    if(data.switchType==0){
        $("#editfunctionCode").html(outerOption);
    }else{
        $("#editfunctionCode").html(innerOption);
    }
    var child   =  $("#child-tpl").html();
    var template = Handlebars.compile(child);
    var unbindElement=copyObject(getAllUnbindElement());
    var length = unbindElement.length
    for (var i = 0; i < length; i++) {
        unbindElement[i].checked="";
        //unbindElement[i].picPath=unbindElement[i].picSavepath !="/"?("getImg/"+unbindElement[i].picSavepath):"/resource/admin/zzb/img/default.png";
        element.push(unbindElement[i]);
    }
    var currentChildren ={"children":element};
    var bbb = template(currentChildren);
    $("#editChildList").html(bbb);
    $('.editChildList input[type=checkbox]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    $('.editChildList input[type=checkbox]').on('ifClicked', function(event){
        $('.form-group .errorTip').removeClass('show');
    });
    //选择类型时
    var radioCtrl='<label><input type="radio" name="headerCtl"  value="0">显示</label>&nbsp<label><input type="radio" name="headerCtl"  value="1">不显示</label>';
    $("#editMajorType").change(function () {
        $("#editMajorForm").data('bootstrapValidator').destroy();
        $('#editMajorForm').data('bootstrapValidator', null);
        if(parseInt($("#editMajorType option:selected").val())>1){
            $("#editMajorHeaderCtrl").html(radioCtrl);
            $("#editMajor input[name='headerCtl'][value='0']").attr("checked",'checked');
        }else{
            $("#editMajorHeaderCtrl").html(radioCtrl);
            $("#editMajor input[name='headerCtl'][value='1']").attr("checked",'checked');
        }
        Validalidator('editMajorForm');
    });

    $("#editswitchType").change(function () {
        if(parseInt($(this).find("input[name='switchType']:checked").val())==0){
            $("#editfunctionCode").html(outerOption);
        }else{
            $("#editfunctionCode").html(innerOption);
        }
    });
    Validalidator('editMajorForm');
}
//
function searchStatus(){

    // var status=parseInt($('#searchStatus').find("option:selected").val())
    // if(status!=2){
    //     table.ajax.url('queryCardsByPage?status='+status).load();
    // }else{
    //     table.ajax.url('queryCardsByPage').load();
    // }
}

