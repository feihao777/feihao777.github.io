var localUrl = "http://crm.honor.cn/";
//var localUrl = "http://122.112.230.191/"
var _baseUrl = "http://www.honor.cn/";
//var base = new Base64();
//登出2017-9-25

var theRequest = {};
GetRequest();

var uuid = $.parseJSON(decodeURIComponent(GetQueryStringSID("uuid")))

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
}

console.log("uuid === " + uuid)
// console.log(theRequest)

if (uuid != null) {
    document.cookie = "UserId=" + uuid.userId + ";path=/;";
    document.cookie = "UserAccount=" + uuid.userAccount + ";path=/;";
    document.cookie = "nickName=" + uuid.nickName + ";path=/;";
    document.cookie = "token=" + uuid.token + ";path=/;";
    document.cookie = "ticket=" + uuid.ticket + ";path=/;";

    funcUrlDel('uuid')
}

// 删除url中某个参数,并跳转
function funcUrlDel(name) {
    var url = window.location.href;
    var arr = url.split('?');
    var ar = arr[0];
    console.log('ar === ' + ar)
    window.location.href = ar;
}

NickName = getCookie('nickName');        //名称
user_account = getCookie('UserAccount');   //账号
UserId = getCookie('UserId');    //UserId

console.log(user_account + 'name' + NickName + '？UserId===' + UserId + '?test');

if (user_account != null) {

    $('.sign_in').hide()
    $('.sign_on').show()

    if (NickName == '' || NickName == null) {
        $('.user_name').html(user_account)
    } else {
        $('.user_name').html(NickName)
    }

    $('#hbt1').attr('href', 'http://sale.honor.cn/?userid=' + UserId);
    $('#hbt2').attr('href', 'http://sale.honor.cn/?userid=' + UserId);
}

$('.userOut').click(function () {

    var ticket = getCookie('ticket');
    delAllCookie();

    console.log("ticket === " + ticket + "???" + getCookie('ticket'))
//  window.location.href = "http://crm.honor.cn/id1/logout.html?url=http://crm.honor.cn/id1/pclogout.html&ticket="+ticket;
    window.location.href = "http://crm.honor.cn/id1/logout.html?url=" + _baseUrl + "&type=1&ticket=" + ticket + "userId=" + UserId;

})

//清除所有cookie 201-9-25
function clearAllCookie() {

    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);

    console.log("keys == " + keys.length)

    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }

    console.log(document.cookie)
}

function delAllCookie() {

    var expdate = new Date();
    expdate.setTime(expdate.getTime() - 1);

    document.cookie = "UserId=;expires=" + expdate.toGMTString() + ";path=/;";
    document.cookie = "UserAccount=;expires=" + expdate.toGMTString() + ";path=/;";
    document.cookie = "nickName=;expires=" + expdate.toGMTString() + ";path=/;";
    document.cookie = "token=;expires=" + expdate.toGMTString() + ";path=/;";
    document.cookie = "ticket=;expires=" + expdate.toGMTString() + ";path=/;";

    console.log(document.cookie)

}

function getCookie(name) {

    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;

}

// 登录或者注册点击
$(".sign_in a").on('click', function () {

    if (user_account != null) {

    } else {

        var urlencode = encodeURIComponent('http://crm.honor.cn/id1/index.html?type=0&url=' + window.location.href);
        //跳转登录页面
        console.log(urlencode)
        _smq.push(['custom', 'homepage_upside_pc', 'LoginorRegister']);
        _jcq.push(['_track', 'loginRegister']);
        window.location.href = 'http://crm.honor.cn/id1/pcindex.html?type=0&url=' + window.location.href

    }

});


function base64Encode(input) {
    var rv;
    rv = encodeURIComponent(input);
    rv = unescape(rv);
    rv = window.btoa(rv);
    return rv;
}

function base64Decode(input) {
    rv = window.atob(input);
    rv = escape(rv);
    rv = decodeURIComponent(rv);
    return rv;
}


function GetQueryStringSID(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

var mb = isIE();

function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}


//加入对比添加右侧栏目
var _isDuibBordBoolean = false;
var _isDuibBord = getCookie('isDuibBord');

if (_isDuibBord == null || _isDuibBord == '') {
    _isDuibBordBoolean = false
} else {
    _isDuibBordBoolean = true;
}

var haveArr = [];
var haveName = [];
var haveNr = [];
var _first = 0;

if (!$('.page-campare').length) {
    addRightDBInit()
}

//点击下方对比ico
setInterval(function () {
    if (_isDuibBordBoolean) {
        $('#ico-duibi').hide()
    } else {
        $('#ico-duibi').show()
    }
})

$('#ico-duibi').click(function () {
    addIcoDuibi();
})

function addIcoDuibi() {
    if (!_isDuibBordBoolean && haveArr.length < 4) {
        document.cookie = "isDuibBord=true;path=/;";
        _isDuibBordBoolean = true;
        addRightDB();
        addRightIcoBord();

        _smq.push(['custom', 'homepage_sidebar_pc', 'Compare']);
    }
}

function addRightIcoBord() {
    var _li = document.createElement('li')
    var _div = document.createElement("div")
    $(_div).addClass('ico-add')
    $(_li).append(_div)
    var _p = document.createElement("p")
    $(_p).addClass('ico-p')
    $(_p).html('添加对比项')
    $(_li).append(_p)
    var _hot = document.createElement("div")
    $(_hot).addClass('hot')
    $(_li).append(_hot)
    $(_li).addClass('li-add')
    $('.comparepop-list').append(_li)
}

function changeDifferent() {

    if ($('.checkbox-different').attr('checked') == 'checked') {
        for (var i = 0; i < $('#canChange').find('tr').length; i++) {
            var _tr = $('#canChange').find('tr')[i];
            if ($(_tr).hasClass('bg-same')) {
                $(_tr).hide()
            }
        }
    } else {
        for (var i = 0; i < $('#canChange').find('tr').length; i++) {
            var _tr = $('#canChange').find('tr')[i];
            if ($(_tr).hasClass('bg-same')) {
                $(_tr).show()
            }
        }
    }
}

function addRightDBInit() {

    var arr = getCookie('haveArr')
    console.log("cookie arr === " + arr)

    if (arr != '' && arr != undefined && arr != null) {

        if (arr.length > 0) {

            arr = arr.split(',')
            haveArr = arr;
            haveName = getCookie('haveName').split(',');
            haveNr = getCookie('haveNr').split(',');

            if (mb) {
                var _html = '<div class="comparepop" style="right:18px;"><div class="comparepop-content"><div class="comparepop-tit">0/4 对比栏<i class="ff ff-right" style="display:none;"></i><span class="tit-close"></span></div><ul class="comparepop-list" style="height: auto;"></ul><div id="divCompare" class="comparepop-select"><a class="j-compare-begin">开始对比</a><a target="_self" class="j-compare-clear" href="javascript:void(0);"><i class="ff ff-delete"></i> 清空</a></div></div></div>'

            } else {
                var _html = '<div class="comparepop"><div class="comparepop-content"><div class="comparepop-tit">0/4 对比栏<i class="ff ff-right" style="display:none;"></i><span class="tit-close"></span></div><ul class="comparepop-list" style="height: auto;"></ul><div id="divCompare" class="comparepop-select"><a class="j-compare-begin">开始对比</a><a target="_self" class="j-compare-clear" href="javascript:void(0);"><i class="ff ff-delete"></i> 清空</a></div></div></div>'

            }

            $('body').append(_html)

            getDataForRight(haveName[_first], haveNr[_first])

            if (_isDuibBordBoolean) {
                addRightIcoBord();
            }

        } else {
            haveArr = []
            haveName = []
            haveNr = []
        }

    } else {

        haveArr = []
        haveName = []
        haveNr = []

        if (_isDuibBordBoolean) {
            addRightDB();
            addRightIcoBord();
        }

    }
}

function getDataForRight(name, txt) {

    _first++;

    if (_first > haveArr.length) {
        return;
    }

    var _name = base64Encode(name)
    var _txt = base64Encode(txt);

    $.ajax({
        url: localUrl + 'id1/system/parameter',
        type: 'POST',
        dataType: 'jsonp',
        async: true,
        jsonpCallback: 'testFun',
        data: {'mobileName': _name, 'mainPart': _txt, 'limit': 9999, 'page': 1},
        success: function (data) {
            console.log("请求1.3.3接口成功 === ")
            console.log(data)
            if (data.resultCode == 0) {
                if (data.resultList.list.length > 0) {
                    var _num = data.resultList.list[0]._id;
                    addRightDB()
                    addRightDataFirst(data.resultList.list[0], _num, _name, _txt);
                    getDataForRight(haveName[_first], haveNr[_first])
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("请求1.3.3接口error === ")
            console.log(XMLHttpRequest)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}

function addRightDB() {

    if ($('.comparepop').length) {

    } else {
        if (mb) {
            var _html = '<div class="comparepop" style="right:18px;"><div class="comparepop-content"><div class="comparepop-tit">0/4 对比栏<i class="ff ff-right" style="display:none;"></i><span class="tit-close"></span></div><ul class="comparepop-list" style="height: auto;"></ul><div id="divCompare" class="comparepop-select"><a class="j-compare-begin">开始对比</a><a target="_self" class="j-compare-clear" href="javascript:void(0);"><i class="ff ff-delete"></i> 清空</a></div></div></div>'

        } else {
            var _html = '<div class="comparepop"><div class="comparepop-content"><div class="comparepop-tit">0/4 对比栏<i class="ff ff-right" style="display:none;"></i><span class="tit-close"></span></div><ul class="comparepop-list" style="height: auto;"></ul><div id="divCompare" class="comparepop-select"><a class="j-compare-begin">开始对比</a><a target="_self" class="j-compare-clear" href="javascript:void(0);"><i class="ff ff-delete"></i> 清空</a></div></div></div>'

        }

        $('body').append(_html)

    }
}

function addRightDataFirst(data, _num, name, txt) {

    var _li = document.createElement('li')
    var _div = document.createElement("div")
    $(_div).addClass('figure')
    var _img = document.createElement("img")
    $(_li).append(_div)
    $(_div).append(_img)
    $(_img).attr('src', data.color1ThumbUrl)
    var _p = document.createElement("p")
    $(_p).html(data.mobileName + '<br/><span>' + data.mainPart + '</span>')
    $(_li).append(_p)
    var _i = document.createElement("i")
    $(_i).addClass('icon16 icon16-close')
    $(_i).attr('data-click', _num)
    $(_i).attr('name-click', name)
    $(_i).attr('txt-click', txt)
    $(_li).append(_i)

    if (_isDuibBordBoolean) {
        $('.li-add').before(_li)
    } else {
        $('.comparepop-list').append(_li)
    }
    $('.comparepop-tit').html(haveArr.length + '/4 对比栏' + '<span class="tit-close"></span>')

    if (haveArr.length == 4) {
        $('.li-add').remove()
        _isDuibBordBoolean = false;
        document.cookie = "isDuibBord=;path=/;";
    }

}

function addRightData(data, _num, name, txt) {

    haveArr.push(_num)
    haveName.push(base64Decode(name))
    haveNr.push(base64Decode(txt))

    var _li = document.createElement('li')
    var _div = document.createElement("div")
    $(_div).addClass('figure')
    var _img = document.createElement("img")
    $(_li).append(_div)
    $(_div).append(_img)
    $(_img).attr('src', data.color1ThumbUrl)
    var _p = document.createElement("p")
    $(_p).html(data.mobileName + '<br/><span>' + data.mainPart + '</span>')
    $(_li).append(_p)
    var _i = document.createElement("i")
    $(_i).addClass('icon16 icon16-close')
    $(_i).attr('data-click', _num)
    $(_i).attr('name-click', name)
    $(_i).attr('txt-click', txt)
    $(_li).append(_i)

    if (_isDuibBordBoolean) {
        $('.li-add').before(_li)
    } else {
        $('.comparepop-list').append(_li)
    }
    $('.comparepop-tit').html(haveArr.length + '/4 对比栏' + '<span class="tit-close"></span>')

    if (haveArr.length == 4) {
        $('.li-add').remove()
        _isDuibBordBoolean = false;
        document.cookie = "isDuibBord=;path=/;";
    }

    document.cookie = "haveArr=" + haveArr + ";path=/;";
    document.cookie = "haveName=" + haveName + ";path=/;";
    document.cookie = "haveNr=" + haveNr + ";path=/;";
}

$(document).on('click', '.icon16-close', function () {

    console.log($(this).attr('data-click'))
    haveArr.splice($.inArray($(this).attr('data-click'), haveArr), 1);
    haveName.splice($.inArray(base64Decode($(this).attr('name-click')), haveName), 1);
    haveNr.splice($.inArray(base64Decode($(this).attr('txt-click')), haveNr), 1);

    var _obj = $(this).parent();
    $(_obj).remove()

    $('.comparepop-tit').html(haveArr.length + '/4 对比栏' + '<span class="tit-close"></span>')
//	if(haveArr.length <= 0 && !_isDuibBordBoolean){
//		$('.comparepop').remove()
//	}
    document.cookie = "haveArr=" + haveArr + ";path=/;";
    document.cookie = "haveName=" + haveName + ";path=/;";
    document.cookie = "haveNr=" + haveNr + ";path=/;";

})

$(document).on('click', '.j-compare-clear,.tit-close', function () {
    $('.comparepop').remove()
    haveArr = []
    haveName = []
    haveNr = []
    document.cookie = "haveArr=" + haveArr + ";path=/;";
    document.cookie = "haveName=" + haveName + ";path=/;";
    document.cookie = "haveNr=" + haveNr + ";path=/;";
    document.cookie = "isDuibBord=;path=/;";
    _isDuibBordBoolean = false;

    _smq.push(['custom', 'homepage_relevantrecommendations_contrast_pc', 'Clean']);
})

$(document).on('click', '.j-compare-begin', function () {
    if (haveArr.length < 2) {
        alert('请选择至少两种机型进行对比')
        return;
    }
    var txtarr = [];
    for (i = 0; i < haveArr.length; i++) {
        var obj = $('.spec-wrapper').find('large')[haveArr[i]]
        txtarr.push($(obj).text())
    }
    _smq.push(['custom', 'homepage_relevantrecommendations_contrast_pc', 'StartContrast']);
    window.location.href = '/products/campare/';
})

$(document).on('click', '.li-add .hot', function () {
    $('.choose_con').remove()
    var _choose_con = document.createElement("div")
    $(_choose_con).addClass('choose_con')
    //标题
    var _title = document.createElement("div")
    $(_title).addClass('title')
    $(_title).html('请选择')
    $(_choose_con).append(_title)
    //选择机型
    var model_select = document.createElement("div")
    $(model_select).addClass('model-select')
    $(_choose_con).append(model_select)
    var _span1 = document.createElement("span")
    $(_span1).html('选择手机型号')
    $(model_select).append(_span1)
    var _ul1 = document.createElement("ul")
    $(_ul1).addClass('dropdown')
    $(model_select).append(_ul1)
    $.post('/products/all_phone/', {'device_name': name}, function (data) {
        $.each(data, function (i, n) {
            var _li = document.createElement("li");
            $(_li).html(n.device_name)
            $(_ul1).append(_li)
        })
    }, "json")
    //选择版本
    var version_select = document.createElement("div")
    $(version_select).addClass('version-select')
    $(_choose_con).append(version_select)
    var _span2 = document.createElement("span")
    $(_span2).html('选择版本型号')
    $(version_select).append(_span2)
    var _ul2 = document.createElement("ul")
    $(_ul2).addClass('dropdown')
    $(version_select).append(_ul2)
    //箭头
    var _arrow = document.createElement("div")
    $(_arrow).addClass('arrow')
    $(_choose_con).append(_arrow)
    $('.li-add').append(_choose_con)
    //关闭
    var _choose_close = document.createElement("div")
    $(_choose_close).addClass('choose_close')
    $(_choose_con).append(_choose_close)
})


//对比页面
var _campareData = [];
var _numCampareNum = 0;
if ($('.page-campare').length) {
    $('#ico-duibi').hide()
    var arr = getCookie('haveArr')
    if (arr != '' && arr != undefined && arr != null) {
        if (arr.length > 1) {
            arr = arr.split(',')
            haveArr = arr;
            haveName = getCookie('haveName').split(',');
            haveNr = getCookie('haveNr').split(',');
            document.cookie = "haveArr=;path=/;";
            document.cookie = "haveName=;path=/;";
            document.cookie = "haveNr=;path=/;";
            document.cookie = "isDuibBord=;path=/;";
            getCampareData(haveName[_numCampareNum], haveNr[_numCampareNum])
        }
    }
    else {
        _campareData = [null, null, null, null]
        haveArr = [null, null, null, null]
        haveName = [null, null, null, null]
        haveNr = [null, null, null, null]
    }
    _isDuibBord = false;
    getModelList()

    $(document).on('click', '.ico-color', function () {
        $($($(this).parent()).find('.ico-color')).removeClass('active')
        $(this).addClass('active')
        console.log($(this).attr('bigImg-value'))
        var _obj = $('.page-campare').find('.text-ul-pic')[$(".page-campare .step-list").index($(this).parent())]
        var _img = $(_obj).find('img')
        $(_img).attr('src', $(this).attr('bigImg-value'))
    })

    $(document).on('click', '.js-btn-delete', function () {
        console.log($(this).attr('data-index'))
        removeCampareData($(this).attr('data-index'));
    })

    $(document).on('click', '.model-select', function (event) {
        $(this).parents('.js-items-select').siblings('.js-items-select').find('.model-select').removeClass('active');
        $(this).toggleClass('active');
        event.stopPropagation();
    })
    $('.model-select .dropdown').on('click', 'li', function () {
        $(this).parent('ul').siblings('span').text($(this).text());
        getXHlist($(this).text(), $($(this).parent('ul')).attr('dropdown'));
    })
    $(document).click(function () {
        $('.model-select').removeClass('active');
        $('.version-select').removeClass('active');
    })

    $(document).on('click', '.version-select', function (event) {
        $(this).parents('.js-items-select').siblings('.js-items-select').find('.version-select').removeClass('active');
        $(this).toggleClass('active');
        event.stopPropagation();
    })
    $('.version-select .dropdown').on('click', 'li', function () {
        console.log($.inArray($(this).text(), haveNr))
        console.log($(this).text())
        console.log(haveNr)
        console.log($($(this).parent()).attr('name'))
        if ($.inArray($(this).text(), haveNr) != -1 && $.inArray($($(this).parent()).attr('name'), haveName) != -1) {
            alert('该机型已加入对比，请选择其他机型')
            return;
        }
        else {
            getCampareDataAgain($($(this).parent('ul')).attr('name'), $(this).text(), $($(this).parent('ul')).attr('dropdown'));

        }
    })
} else {
    $(document).on('click', '.model-select', function (event) {
        $(this).parents('.choose_con').siblings('.choose_con').find('.model-select').removeClass('active');
        $(this).toggleClass('active');
        event.stopPropagation();
    })
    $(document).on('click', '.model-select .dropdown li', function (event) {
        $(this).parent('ul').siblings('span').text($(this).text());
        var _dropdown = $('.version-select .dropdown')
        var url = "/products/phone_specification/"
        $.post(url, {'device_name': $(this).text()}, function (data) {
            $(_dropdown).empty()
            $.each(data, function (i, n) {
                _versionArr.push(n.edition_name)
                var _li = document.createElement("li");
                $(_li).html(n.edition_name)
                $(_dropdown).append(_li)
            })
        }, "json")
    })

    $(document).on('click', '.version-select', function (event) {
        $(this).parents('.choose_con').siblings('.choose_con').find('.version-select').removeClass('active');
        $(this).toggleClass('active');
        event.stopPropagation();
    })

    $(document).on('click', '.version-select .dropdown li', function (event) {

        if (haveArr.length == 4) {
            alert('最多选择4款机型进行对比，点击【开始对比】进行比较')
            return;
        }

        var name = base64Encode($('.model-select span').text())
        console.log('name' + name)
        var txt = base64Encode($(this).text());

        $.ajax({
            url: localUrl + 'id1/system/parameter',
            type: 'POST',
            dataType: 'jsonp',
            async: true,
            jsonpCallback: 'testFun',
            data: {'mobileName': name, 'mainPart': txt, 'limit': 9999, 'page': 1},
            success: function (data) {
                if (data.resultCode == 0) {

                    if (data.resultList.list.length > 0) {

                        var _num = data.resultList.list[0]._id;

                        if ($.inArray(_num, haveArr) == -1) {

                        } else {
                            alert('该机型已加入对比，请选择其他机型')
                            return;
                        }

                        $('.choose_con').remove()
                        addRightDB()
                        addRightData(data.resultList.list[0], _num, name, txt);

                        console.log("haveArr = " + haveArr)

                    } else {
                        alert('暂时无法对比该机型，请选择其他产品对比')
                    }

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("请求1.3.3接口error === ")
                console.log(XMLHttpRequest)
                console.log(textStatus)
                console.log(errorThrown)
            }
        })

    })

    $(document).click(function () {
        $('.model-select').removeClass('active');
        $('.version-select').removeClass('active');
    })

    $(document).on('click', '.choose_close', function () {
        $('.choose_con').remove()
    })

}

function getCampareData(name, txt) {
    _numCampareNum++;
    if (_numCampareNum > haveArr.length) {
        if (_campareData.length < 4) {
            var _len = 4 - _campareData.length
            for (var i = 0; i < _len; i++) {
                _campareData.push(null)
                haveArr.push(null)
                haveName.push(null)
                haveNr.push(null)
            }
        }
        setGlobalCampare();
        return;
    }

    var _name = base64Encode(name)
    var _txt = base64Encode(txt);

    $.ajax({
        url: localUrl + 'id1/system/parameter',
        type: 'POST',
        dataType: 'jsonp',
        async: true,
        jsonpCallback: 'testFun',
        data: {'mobileName': _name, 'mainPart': _txt, 'limit': 9999, 'page': 1},
        success: function (data) {
            console.log("请求1.3.3接口成功 === ")
            console.log(data)
            if (data.resultCode == 0) {
                if (data.resultList.list.length > 0) {
                    _campareData.push(data.resultList.list[0])
                    getCampareData(haveName[_numCampareNum], haveNr[_numCampareNum])
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("请求1.3.3接口error === ")
            console.log(XMLHttpRequest)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}

function getCampareDataAgain(name, txt, num) {

    var _model_selectcon = $('.page-campare').find('.model-selectcon')[num];
    var _version_selectcon = $('.page-campare').find('.version-selectcon')[num];

    $(_model_selectcon).addClass('hide')
    $(_version_selectcon).addClass('hide')
    $($(_model_selectcon).find('span')).html('选择手机型号')
    $($(_version_selectcon).find('.dropdown')).empty()

    if ($('.checkbox-different').attr('checked') == 'checked') {
        $('.checkbox-different').attr('checked', '')
        $('.different').removeClass('on')
        for (var i = 0; i < $('#canChange').find('tr').length; i++) {
            var _tr = $('#canChange').find('tr')[i];
            if ($(_tr).hasClass('bg-same')) {
                $(_tr).show()
            }
        }
    }

    var _name = base64Encode(name)
    var _txt = base64Encode(txt);

    $.ajax({
        url: localUrl + 'id1/system/parameter',
        type: 'POST',
        dataType: 'jsonp',
        async: true,
        jsonpCallback: 'testFun',
        data: {'mobileName': _name, 'mainPart': _txt, 'limit': 9999, 'page': 1},
        success: function (data) {
            console.log("请求1.3.3接口成功 === ")
            console.log(data)
            if (data.resultCode == 0) {
                if (data.resultList.list.length > 0) {
                    console.log('indexOf === ' + getNullNum())
                    _campareData.splice(getNullNum(), 1, data.resultList.list[0])
                    haveArr.splice(getNullNum(), 1, data.resultList.list[0]._id)
                    haveName.splice(getNullNum(), 1, name)
                    haveNr.splice(getNullNum(), 1, txt)
                    setGlobalCampare();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("请求1.3.3接口error === ")
            console.log(XMLHttpRequest)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}

function getNullNum() {
    for (var i = 0; i < _campareData.length; i++) {
        if (_campareData[i] == null) {
            return i;
        }
    }
}

function removeCampareData(num) {
    var _model_selectcon = $('.page-campare').find('.model-selectcon')[num];
    var _version_selectcon = $('.page-campare').find('.version-selectcon')[num];
    $(_model_selectcon).removeClass('hide')
    $(_version_selectcon).removeClass('hide')

    if ($('.checkbox-different').attr('checked') == 'checked') {
        $('.checkbox-different').attr('checked', '')
        $('.different').removeClass('on')
        for (var i = 0; i < $('#canChange').find('tr').length; i++) {
            var _tr = $('#canChange').find('tr')[i];
            if ($(_tr).hasClass('bg-same')) {
                $(_tr).show()
            }
        }
    }

    _campareData.splice(num, 1)
    _campareData.push(null)
    haveArr.splice(num, 1)
    haveArr.push(null)
    haveName.splice(num, 1)
    haveName.push(null)
    haveNr.splice(num, 1)
    haveNr.push(null)
    setGlobalCampare();
}

function setGlobalCampare() {
    for (var i = 0; i < _campareData.length; i++) {
        if (_campareData[i] != null) {

            var _model_selectcon = $('.page-campare').find('.model-selectcon')[i];
            $(_model_selectcon).addClass('hide')
            var _version_selectcon = $('.page-campare').find('.version-selectcon')[i];
            $(_version_selectcon).addClass('hide')

            var _text_ul_pic = $('.page-campare').find('.text-ul-pic')[i];
            $($(_text_ul_pic).find('img')).attr('src', _campareData[i].color1ThumbUrl)
            var f = document.getElementById('printf');
            $($($(f).contents().find("body")).find('.text-ul-pic')[i]).find('img').attr('src', _campareData[i].color1ThumbUrl)
            var _text_ul_name = $('.page-campare').find('.text-ul-name')[i];
            $(_text_ul_name).html(_campareData[i].mobileName)
            $(_text_ul_name).show()
            var _js_btn_delete = $('.page-campare').find('.js-btn-delete')[i];
            $(_js_btn_delete).show()
            var _text_ul_selectcon = $('.page-campare').find('.text-ul-selectcon')[i];
            var rt = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(_campareData[i].mainPart);
            if (rt != null) {
                var _mainPartTxt = rt[1] + '<br/>(' + rt[2] + ')'
            }
            else {
                var _mainPartTxt = _campareData[i].mainPart
            }

            $($(_text_ul_selectcon).find('span')).html(_mainPartTxt);
            $(_text_ul_selectcon).show()
            var _text_ul_buy = $('.page-campare').find('.text-ul-buy')[i];
            console.log('_campareData[i].pcvamllUrl === ' + _campareData[i].pcvamllUrl)
            if (_campareData[i].pcvamllUrl != null && _campareData[i].pcvamllUrl != 'null' && _campareData[i].pcvamllUrl != '') {
                $($(_text_ul_buy).find('a')).attr('href', _campareData[i].pcvamllUrl)
                $(_text_ul_buy).show()
            }

            var _step_list = $('.page-campare').find('.step-list')[i];
            $(_step_list).show()
            $(_step_list).empty()
            for (var j = 0; j < 5; j++) {
                var _li = document.createElement('li')
                $(_li).addClass('ico-color')
//				var _i = document.createElement("i")
//				$(_li).append(_i)
                var _iImg = document.createElement("div")
                $(_iImg).addClass('img')
                $(_li).append(_iImg)
                var _img = document.createElement("img")
                $(_iImg).append(_img)
                var _span = document.createElement("span")
                $(_li).append(_span)
                if (j == 0) {
                    console.log('_campareData[i].color1 === ' + _campareData[i].color1)
                    if (_campareData[i].color1 && _campareData[i].color1 != null && _campareData[i].color1 != ' ') {
                        $(_li).addClass('active')
                        $(_li).attr('data-value', _campareData[i].color1)
                        $(_li).attr('bigImg-value', _campareData[i].color1ThumbUrl)
//						$(_i).css("background-image","url("+_campareData[i].color1ImgUrl+")");
                        $(_img).attr('src', _campareData[i].color1ImgUrl)
                        $($(_li).find('span')).html(_campareData[i].color1)
                        $(_step_list).append(_li)
                    }
                }
                else if (j == 1) {
                    if (_campareData[i].color2 && _campareData[i].color2 != null && _campareData[i].color2 != ' ') {
                        $(_li).attr('data-value', _campareData[i].color2)
                        $(_li).attr('bigImg-value', _campareData[i].color2ThumbUrl)
//						$(_i).css("background-image","url("+_campareData[i].color2ImgUrl+")");
                        $(_img).attr('src', _campareData[i].color2ImgUrl)
                        $($(_li).find('span')).html(_campareData[i].color2)
                        $(_step_list).append(_li)
                    }
                }
                else if (j == 2) {
                    if (_campareData[i].color3 && _campareData[i].color3 != null && _campareData[i].color3 != ' ') {
                        $(_li).attr('data-value', _campareData[i].color3)
                        $(_li).attr('bigImg-value', _campareData[i].color3ThumbUrl)
//						$(_i).css("background-image","url("+_campareData[i].color3ImgUrl+")");
                        $(_img).attr('src', _campareData[i].color3ImgUrl)
                        $($(_li).find('span')).html(_campareData[i].color3)
                        $(_step_list).append(_li)
                    }
                }
                else if (j == 3) {
                    if (_campareData[i].color4 && _campareData[i].color4 != null && _campareData[i].color4 != ' ') {
                        $(_li).attr('data-value', _campareData[i].color4)
                        $(_li).attr('bigImg-value', _campareData[i].color4ThumbUrl)
//						$(_i).css("background-image","url("+_campareData[i].color4ImgUrl+")");
                        $(_img).attr('src', _campareData[i].color4ImgUrl)
                        $($(_li).find('span')).html(_campareData[i].color4)
                        $(_step_list).append(_li)
                    }
                }
                else if (j == 4) {
                    if (_campareData[i].color5 && _campareData[i].color5 != null && _campareData[i].color5 != ' ') {
                        $(_li).attr('data-value', _campareData[i].color5)
                        $(_li).attr('bigImg-value', _campareData[i].color5ThumbUrl)
//						$(_i).css("background-image","url("+_campareData[i].color5ImgUrl+")");
                        $(_img).attr('src', _campareData[i].color5ImgUrl)
                        $($(_li).find('span')).html(_campareData[i].color5)
                        $(_step_list).append(_li)
                    }
                }
            }
            //上市时间
            var _sssj = $('#sssj').find('td')[i];
            //系统界面
            var _xtjm = $('#xtjm').find('td')[i];
            //长度
            var _cd = $('#cd').find('td')[i];
            //宽度
            var _kd = $('#kd').find('td')[i];
            //厚度
            var _hd = $('#hd').find('td')[i];
            //机身重量
            var _jszl = $('#jszl').find('td')[i];
            //双卡
            var _sk = $('#sk').find('td')[i];
            //SIM卡类型
            var _simklx = $('#simklx').find('td')[i];
            //电池类型
            var _dclx = $('#dclx').find('td')[i];
            //电池容量
            var _dcrl = $('#dcrl').find('td')[i];
            //电池更换
            var _dcgh = $('#dcgh').find('td')[i];
            //CPU型号
            var _cpuxh = $('#cpuxh').find('td')[i];
            //CPU核数
            var _cpuhs = $('#cpuhs').find('td')[i];
            //CPU主频
            var _cpuzp = $('#cpuzp').find('td')[i];
            //GPU
            var _gpu = $('#gpu').find('td')[i];
            //运行内存
            var _yxnc = $('#yxnc').find('td')[i];
            //机身内存
            var _jsnc = $('#jsnc').find('td')[i];
            //存储卡类型
            var _ccklx = $('#ccklx').find('td')[i];
            //最大支持扩展
            var _zdzckz = $('#zdzckz').find('td')[i];
            //制式
            var _zz = $('#zz').find('td')[i];
            //数据
            var _sj = $('#sj').find('td')[i];
            //频率
            var _pl = $('#pl').find('td')[i];
            //尺寸
            var _cc = $('#cc').find('td')[i];
            //色彩
            var _sc = $('#sc').find('td')[i];
            //类型
            var _lx = $('#lx').find('td')[i];
            //分辨率
            var _fbl = $('#fbl').find('td')[i];
            //PPI
            var _ppi = $('#ppi').find('td')[i];
            //主摄像头
            var _zsxt = $('#zsxt').find('td')[i];
            //副摄像头
            var _fsxt = $('#fsxt').find('td')[i];
            //传感器类型
            var _cgqlx = $('#cgqlx').find('td')[i];
            //闪光灯
            var _sgd = $('#sgd').find('td')[i];
            //视频拍摄
            var _spps = $('#spps').find('td')[i];
            //防抖模式
            var _fdms = $('#fdms').find('td')[i];
            //自动对焦
            var _zddj = $('#zddj').find('td')[i];
            //照片分辨率
            var _zpfbl = $('#zpfbl').find('td')[i];
            //数据线接口
            var _sjxjk = $('#sjxjk').find('td')[i];
            //耳机接口
            var _ejjk = $('#ejjk').find('td')[i];
            //MHL
            var _mhl = $('#mhl').find('td')[i];
            //HDMI
            var _hdmi = $('#hdmi').find('td')[i];
            //wlan
            var _wlan = $('#wlan').find('td')[i];
            //dlna
            var _dlna = $('#dlna').find('td')[i];
            //wlan热点
            var _wlanrd = $('#wlanrd').find('td')[i];
            //多屏互动
            var _dphd = $('#dphd').find('td')[i];
            //蓝牙
            var _ly = $('#ly').find('td')[i];
            //红外遥控
            var _hwyk = $('#hwyk').find('td')[i];
            //天际通
            var _tjt = $('#tjt').find('td')[i];
            //MHL转HDMI
            var _mhlzhdmi = $('#mhlzhdmi').find('td')[i];
            //GPS
            var _gps = $('#gps').find('td')[i];
            //重力感应器
            var _zlgyq = $('#zlgyq').find('td')[i];
            //光线传感器
            var _gxcgq = $('#gxcgq').find('td')[i];
            //距离传感器
            var _jlcgq = $('#jlcgq').find('td')[i];
            //红外传感器
            var _hwcgq = $('#hwcgq').find('td')[i];
            //温度传感器
            var _wdcgq = $('#wdcgq').find('td')[i];
            //霍尔传感器
            var _hecgq = $('#hecgq').find('td')[i];
            //陀螺仪
            var _tly = $('#tly').find('td')[i];
            //指南针
            var _znz = $('#znz').find('td')[i];
            //NFC
            var _nfc = $('#nfc').find('td')[i];

            if (i == 0) {
                console.log('测试年月1')
                console.log(_campareData[i].realeaseTime)
                console.log(new Date(_campareData[i].realeaseTime).getMonth())
                var _data = new Date(_campareData[i].realeaseTime).getFullYear() + '年' + (new Date(_campareData[i].realeaseTime).getMonth() + 1) + '月'
                $(_sssj).html('<b>上市日期</b><span>' + _data + '</span>')
                $(_xtjm).html('<b>系统界面</b><span>' + _campareData[i].system + '</span>')
                $(_cd).html('<b>长度</b><span>' + _campareData[i].length + '</span>')
                $(_kd).html('<b>宽度</b><span>' + _campareData[i].width + '</span>')
                $(_hd).html('<b>厚度</b><span>' + _campareData[i].thickness + '</span>')
                $(_jszl).html('<b>机身重量</b><span>' + _campareData[i].bodyWeight + '</span>')
                $(_sk).html('<b>双卡</b><span>' + _campareData[i].dualCard + '</span>')
                $(_simklx).html('<b>SIM卡类型</b><span>' + _campareData[i].simCardType + '</span>')
                $(_dclx).html('<b>电池类型</b><span>' + _campareData[i].batteryType + '</span>')
                $(_dcrl).html('<b>电池容量</b><span>' + _campareData[i].batteryCapacity + '</span>')
                $(_dcgh).html('<b>电池更换</b><span>' + _campareData[i].batteryReplacement + '</span>')
                $(_cpuxh).html('<b>CPU型号</b><span>' + _campareData[i].cpuModel + '</span>')
                $(_cpuhs).html('<b>CPU核数</b><span>' + _campareData[i].cpuCoreCount + '</span>')
                $(_cpuzp).html('<b>CPU主频</b><span>' + _campareData[i].cpuFrequency + '</span>')
                $(_gpu).html('<b>GPU</b><span>' + _campareData[i].gpu + '</span>')

                $(_yxnc).html('<b>运行内存</b><span>' + _campareData[i].ram + '</span>')
                $(_jsnc).html('<b>机身内存</b><span>' + _campareData[i].rom + '</span>')
                $(_ccklx).html('<b>存储卡类型</b><span>' + _campareData[i].memoryCardType + '</span>')
                $(_zdzckz).html('<b>最大支持扩展</b><span>' + _campareData[i].maxSupportExt + '</span>')

                $(_zz).html('<b>制式</b><span>' + _campareData[i].standard + '</span>')
                $(_sj).html('<b>数据</b><span>' + _campareData[i].data + '</span>')
                $(_pl).html('<b>频率</b><span>' + _campareData[i].supportFrequency + '</span>')

                $(_cc).html('<b>尺寸</b><span>' + _campareData[i].size + '</span>')
                $(_sc).html('<b>色彩</b><span>' + _campareData[i].color + '</span>')
                $(_lx).html('<b>类型</b><span>' + _campareData[i].type + '</span>')
                $(_fbl).html('<b>分辨率</b><span>' + _campareData[i].resolution + '</span>')
                $(_ppi).html('<b>PPI</b><span>' + _campareData[i].ppi + '</span>')

                $(_zsxt).html('<b>主摄像头</b><span>' + _campareData[i].mainCamera + '</span>')
                $(_fsxt).html('<b>副摄像头</b><span>' + _campareData[i].viceCamera + '</span>')
                $(_cgqlx).html('<b>传感器类型</b><span>' + _campareData[i].sensorType + '</span>')
                $(_sgd).html('<b>闪光灯</b><span>' + _campareData[i].flash + '</span>')
                $(_spps).html('<b>视频拍摄</b><span>' + _campareData[i].videoCapture + '</span>')
                $(_fdms).html('<b>防抖模式</b><span>' + _campareData[i].imageStabilizationMode + '</span>')
                $(_zddj).html('<b>自动对焦</b><span>' + _campareData[i].autoFocus + '</span>')
                $(_zpfbl).html('<b>照片分辨率</b><span>' + _campareData[i].photoResolution + '</span>')

                $(_sjxjk).html('<b>数据线接口</b><span>' + _campareData[i].dataLineInterface + '</span>')
                $(_ejjk).html('<b>耳机接口</b><span>' + _campareData[i].headphoneJack + '</span>')
                $(_mhl).html('<b>MHL</b><span>' + _campareData[i].mhl + '</span>')
                $(_hdmi).html('<b>HDMI</b><span>' + _campareData[i].hdmi + '</span>')
                $(_wlan).html('<b>WLAN</b><span>' + _campareData[i].wlan + '</span>')
                $(_dlna).html('<b>DLNA</b><span>' + _campareData[i].dlna + '</span>')
                $(_wlanrd).html('<b>WLAN热点</b><span>' + _campareData[i].wlanHotspot + '</span>')
                $(_dphd).html('<b>多屏互动</b><span>' + _campareData[i].multiScreenInteractive + '</span>')
                $(_ly).html('<b>蓝牙</b><span>' + _campareData[i].bluetooth + '</span>')
                $(_hwyk).html('<b>红外遥控</b><span>' + _campareData[i].infraredRemote + '</span>')
                $(_tjt).html('<b>天际通</b><span>' + _campareData[i].skyline + '</span>')
                $(_mhlzhdmi).html('<b>MHL转HDMI</b><span>' + _campareData[i].mhlToHdmi + '</span>')
                $(_gps).html('<b>GPS</b><span>' + _campareData[i].gps + '</span>')

                $(_zlgyq).html('<b>重力感应器</b><span>' + _campareData[i].gravitySensor + '</span>')
                $(_gxcgq).html('<b>光线传感器</b><span>' + _campareData[i].lightSensor + '</span>')
                $(_jlcgq).html('<b>距离传感器</b><span>' + _campareData[i].distanceSensor + '</span>')
                $(_hwcgq).html('<b>红外传感器</b><span>' + _campareData[i].infraredSensor + '</span>')
                $(_wdcgq).html('<b>温度传感器</b><span>' + _campareData[i].temperatureSensor + '</span>')
                $(_hecgq).html('<b>霍尔传感器</b><span>' + _campareData[i].hallSensor + '</span>')
                $(_tly).html('<b>陀螺仪</b><span>' + _campareData[i].gyro + '</span>')
                $(_znz).html('<b>指南针</b><span>' + _campareData[i].compass + '</span>')
                $(_nfc).html('<b>NFC</b><span>' + _campareData[i].nfc + '</span>')
            }
            else {
                console.log('测试年月2')
                console.log(_campareData[i].realeaseTime)
                console.log(new Date(_campareData[i].realeaseTime).getMonth())
                var _data = new Date(_campareData[i].realeaseTime).getFullYear() + '年' + (new Date(_campareData[i].realeaseTime).getMonth() + 1) + '月'
                $(_sssj).html('<b>&nbsp;</b><span>' + _data + '</span>')
                $(_xtjm).html('<b>&nbsp;</b><span>' + _campareData[i].system + '</span>')
                $(_cd).html('<b>&nbsp;</b><span>' + _campareData[i].length + '</span>')
                $(_kd).html('<b>&nbsp;</b><span>' + _campareData[i].width + '</span>')
                $(_hd).html('<b>&nbsp;</b><span>' + _campareData[i].thickness + '</span>')
                $(_jszl).html('<b>&nbsp;</b><span>' + _campareData[i].bodyWeight + '</span>')
                $(_sk).html('<b>&nbsp;</b><span>' + _campareData[i].dualCard + '</span>')
                $(_simklx).html('<b>&nbsp;</b><span>' + _campareData[i].simCardType + '</span>')
                $(_dclx).html('<b>&nbsp;</b><span>' + _campareData[i].batteryType + '</span>')
                $(_dcrl).html('<b>&nbsp;</b><span>' + _campareData[i].batteryCapacity + '</span>')
                $(_dcgh).html('<b>&nbsp;</b><span>' + _campareData[i].batteryReplacement + '</span>')
                $(_cpuxh).html('<b>&nbsp;</b><span>' + _campareData[i].cpuModel + '</span>')
                $(_cpuhs).html('<b>&nbsp;</b><span>' + _campareData[i].cpuCoreCount + '</span>')
                $(_cpuzp).html('<b>&nbsp;</b><span>' + _campareData[i].cpuFrequency + '</span>')
                $(_gpu).html('<b>&nbsp;</b><span>' + _campareData[i].gpu + '</span>')

                $(_yxnc).html('<b>&nbsp;</b><span>' + _campareData[i].ram + '</span>')
                $(_jsnc).html('<b>&nbsp;</b><span>' + _campareData[i].rom + '</span>')
                $(_ccklx).html('<b>&nbsp;</b><span>' + _campareData[i].memoryCardType + '</span>')
                $(_zdzckz).html('<b>&nbsp;</b><span>' + _campareData[i].maxSupportExt + '</span>')

                $(_zz).html('<b>&nbsp;</b><span>' + _campareData[i].standard + '</span>')
                $(_sj).html('<b>&nbsp;</b><span>' + _campareData[i].data + '</span>')
                $(_pl).html('<b>&nbsp;</b><span>' + _campareData[i].supportFrequency + '</span>')

                $(_cc).html('<b>&nbsp;</b><span>' + _campareData[i].size + '</span>')
                $(_sc).html('<b>&nbsp;</b><span>' + _campareData[i].color + '</span>')
                $(_lx).html('<b>&nbsp;</b><span>' + _campareData[i].type + '</span>')
                $(_fbl).html('<b>&nbsp;</b><span>' + _campareData[i].resolution + '</span>')
                $(_ppi).html('<b>&nbsp;</b><span>' + _campareData[i].ppi + '</span>')

                $(_zsxt).html('<b>&nbsp;</b><span>' + _campareData[i].mainCamera + '</span>')
                $(_fsxt).html('<b>&nbsp;</b><span>' + _campareData[i].viceCamera + '</span>')
                $(_cgqlx).html('<b>&nbsp;</b><span>' + _campareData[i].sensorType + '</span>')
                $(_sgd).html('<b>&nbsp;</b><span>' + _campareData[i].flash + '</span>')
                $(_spps).html('<b>&nbsp;</b><span>' + _campareData[i].videoCapture + '</span>')
                $(_fdms).html('<b>&nbsp;</b><span>' + _campareData[i].imageStabilizationMode + '</span>')
                $(_zddj).html('<b>&nbsp;</b><span>' + _campareData[i].autoFocus + '</span>')
                $(_zpfbl).html('<b>&nbsp;</b><span>' + _campareData[i].photoResolution + '</span>')

                $(_sjxjk).html('<b>&nbsp;</b><span>' + _campareData[i].dataLineInterface + '</span>')
                $(_ejjk).html('<b>&nbsp;</b><span>' + _campareData[i].headphoneJack + '</span>')
                $(_mhl).html('<b>&nbsp;</b><span>' + _campareData[i].mhl + '</span>')
                $(_hdmi).html('<b>&nbsp;</b><span>' + _campareData[i].hdmi + '</span>')
                $(_wlan).html('<b>&nbsp;</b><span>' + _campareData[i].wlan + '</span>')
                $(_dlna).html('<b>&nbsp;</b><span>' + _campareData[i].dlna + '</span>')
                $(_wlanrd).html('<b>&nbsp;</b><span>' + _campareData[i].wlanHotspot + '</span>')
                $(_dphd).html('<b>&nbsp;</b><span>' + _campareData[i].multiScreenInteractive + '</span>')
                $(_ly).html('<b>&nbsp;</b><span>' + _campareData[i].bluetooth + '</span>')
                $(_hwyk).html('<b>&nbsp;</b><span>' + _campareData[i].infraredRemote + '</span>')
                $(_tjt).html('<b>&nbsp;</b><span>' + _campareData[i].skyline + '</span>')
                $(_mhlzhdmi).html('<b>&nbsp;</b><span>' + _campareData[i].mhlToHdmi + '</span>')
                $(_gps).html('<b>&nbsp;</b><span>' + _campareData[i].gps + '</span>')

                $(_zlgyq).html('<b>&nbsp;</b><span>' + _campareData[i].gravitySensor + '</span>')
                $(_gxcgq).html('<b>&nbsp;</b><span>' + _campareData[i].lightSensor + '</span>')
                $(_jlcgq).html('<b>&nbsp;</b><span>' + _campareData[i].distanceSensor + '</span>')
                $(_hwcgq).html('<b>&nbsp;</b><span>' + _campareData[i].infraredSensor + '</span>')
                $(_wdcgq).html('<b>&nbsp;</b><span>' + _campareData[i].temperatureSensor + '</span>')
                $(_hecgq).html('<b>&nbsp;</b><span>' + _campareData[i].hallSensor + '</span>')
                $(_tly).html('<b>&nbsp;</b><span>' + _campareData[i].gyro + '</span>')
                $(_znz).html('<b>&nbsp;</b><span>' + _campareData[i].compass + '</span>')
                $(_nfc).html('<b>&nbsp;</b><span>' + _campareData[i].nfc + '</span>')
            }

        }
        else {

            var _model_selectcon = $('.page-campare').find('.model-selectcon')[i];
            $(_model_selectcon).removeClass('hide')
            var _version_selectcon = $('.page-campare').find('.version-selectcon')[i];
            $(_version_selectcon).removeClass('hide')

            var _text_ul_pic = $('.page-campare').find('.text-ul-pic')[i];
            var _url = $($(_text_ul_pic).find('img')).attr('data-src')
            console.log("_url === " + _url)
            $($(_text_ul_pic).find('img')).attr('src', _url)
            var _text_ul_name = $('.page-campare').find('.text-ul-name')[i];
            $(_text_ul_name).hide()
            var _js_btn_delete = $('.page-campare').find('.js-btn-delete')[i];
            $(_js_btn_delete).hide()
            var _text_ul_selectcon = $('.page-campare').find('.text-ul-selectcon')[i];
            $(_text_ul_selectcon).hide()
            var _text_ul_buy = $('.page-campare').find('.text-ul-buy')[i];
            $(_text_ul_buy).hide()
            var _step_list = $('.page-campare').find('.step-list')[i];
//			$(_step_list).hide()
            $(_step_list).empty()

            //上市时间
            var _sssj = $('#sssj').find('td')[i];
            //系统界面
            var _xtjm = $('#xtjm').find('td')[i];
            //长度
            var _cd = $('#cd').find('td')[i];
            //宽度
            var _kd = $('#kd').find('td')[i];
            //厚度
            var _hd = $('#hd').find('td')[i];
            //机身重量
            var _jszl = $('#jszl').find('td')[i];
            //双卡
            var _sk = $('#sk').find('td')[i];
            //SIM卡类型
            var _simklx = $('#simklx').find('td')[i];
            //电池类型
            var _dclx = $('#dclx').find('td')[i];
            //电池容量
            var _dcrl = $('#dcrl').find('td')[i];
            //电池更换
            var _dcgh = $('#dcgh').find('td')[i];
            //CPU型号
            var _cpuxh = $('#cpuxh').find('td')[i];
            //CPU核数
            var _cpuhs = $('#cpuhs').find('td')[i];
            //CPU主频
            var _cpuzp = $('#cpuzp').find('td')[i];
            //GPU
            var _gpu = $('#gpu').find('td')[i];
            //运行内存
            var _yxnc = $('#yxnc').find('td')[i];
            //机身内存
            var _jsnc = $('#jsnc').find('td')[i];
            //存储卡类型
            var _ccklx = $('#ccklx').find('td')[i];
            //最大支持扩展
            var _zdzckz = $('#zdzckz').find('td')[i];
            //制式
            var _zz = $('#zz').find('td')[i];
            //数据
            var _sj = $('#sj').find('td')[i];
            //频率
            var _pl = $('#pl').find('td')[i];
            //尺寸
            var _cc = $('#cc').find('td')[i];
            //色彩
            var _sc = $('#sc').find('td')[i];
            //类型
            var _lx = $('#lx').find('td')[i];
            //分辨率
            var _fbl = $('#fbl').find('td')[i];
            //PPI
            var _ppi = $('#ppi').find('td')[i];
            //主摄像头
            var _zsxt = $('#zsxt').find('td')[i];
            //副摄像头
            var _fsxt = $('#fsxt').find('td')[i];
            //传感器类型
            var _cgqlx = $('#cgqlx').find('td')[i];
            //闪光灯
            var _sgd = $('#sgd').find('td')[i];
            //视频拍摄
            var _spps = $('#spps').find('td')[i];
            //防抖模式
            var _fdms = $('#fdms').find('td')[i];
            //自动对焦
            var _zddj = $('#zddj').find('td')[i];
            //照片分辨率
            var _zpfbl = $('#zpfbl').find('td')[i];
            //数据线接口
            var _sjxjk = $('#sjxjk').find('td')[i];
            //耳机接口
            var _ejjk = $('#ejjk').find('td')[i];
            //MHL
            var _mhl = $('#mhl').find('td')[i];
            //HDMI
            var _hdmi = $('#hdmi').find('td')[i];
            //wlan
            var _wlan = $('#wlan').find('td')[i];
            //dlna
            var _dlna = $('#dlna').find('td')[i];
            //wlan热点
            var _wlanrd = $('#wlanrd').find('td')[i];
            //多屏互动
            var _dphd = $('#dphd').find('td')[i];
            //蓝牙
            var _ly = $('#ly').find('td')[i];
            //红外遥控
            var _hwyk = $('#hwyk').find('td')[i];
            //天际通
            var _tjt = $('#tjt').find('td')[i];
            //MHL转HDMI
            var _mhlzhdmi = $('#mhlzhdmi').find('td')[i];
            //GPS
            var _gps = $('#gps').find('td')[i];
            //重力感应器
            var _zlgyq = $('#zlgyq').find('td')[i];
            //光线传感器
            var _gxcgq = $('#gxcgq').find('td')[i];
            //距离传感器
            var _jlcgq = $('#jlcgq').find('td')[i];
            //红外传感器
            var _hwcgq = $('#hwcgq').find('td')[i];
            //温度传感器
            var _wdcgq = $('#wdcgq').find('td')[i];
            //霍尔传感器
            var _hecgq = $('#hecgq').find('td')[i];
            //陀螺仪
            var _tly = $('#tly').find('td')[i];
            //指南针
            var _znz = $('#znz').find('td')[i];
            //NFC
            var _nfc = $('#nfc').find('td')[i];

            $(_sssj).html('<b>&nbsp;</b><span></span>')
            $(_xtjm).html('<b>&nbsp;</b><span></span>')
            $(_cd).html('<b>&nbsp;</b><span></span>')
            $(_kd).html('<b>&nbsp;</b><span></span>')
            $(_hd).html('<b>&nbsp;</b><span></span>')
            $(_jszl).html('<b>&nbsp;</b><span></span>')
            $(_sk).html('<b>&nbsp;</b><span></span>')
            $(_simklx).html('<b>&nbsp;</b><span></span>')
            $(_dclx).html('<b>&nbsp;</b><span></span>')
            $(_dcrl).html('<b>&nbsp;</b><span></span>')
            $(_dcgh).html('<b>&nbsp;</b><span></span>')
            $(_cpuxh).html('<b>&nbsp;</b><span></span>')
            $(_cpuhs).html('<b>&nbsp;</b><span></span>')
            $(_cpuzp).html('<b>&nbsp;</b><span></span>')
            $(_gpu).html('<b>&nbsp;</b><span></span>')

            $(_yxnc).html('<b>&nbsp;</b><span></span>')
            $(_jsnc).html('<b>&nbsp;</b><span></span>')
            $(_ccklx).html('<b>&nbsp;</b><span></span>')
            $(_zdzckz).html('<b>&nbsp;</b><span></span>')

            $(_zz).html('<b>&nbsp;</b><span></span>')
            $(_sj).html('<b>&nbsp;</b><span></span>')
            $(_pl).html('<b>&nbsp;</b><span></span>')

            $(_cc).html('<b>&nbsp;</b><span></span>')
            $(_sc).html('<b>&nbsp;</b><span></span>')
            $(_lx).html('<b>&nbsp;</b><span></span>')
            $(_fbl).html('<b>&nbsp;</b><span></span>')
            $(_ppi).html('<b>&nbsp;</b><span></span>')

            $(_zsxt).html('<b>&nbsp;</b><span></span>')
            $(_fsxt).html('<b>&nbsp;</b><span></span>')
            $(_cgqlx).html('<b>&nbsp;</b><span></span>')
            $(_sgd).html('<b>&nbsp;</b><span></span>')
            $(_spps).html('<b>&nbsp;</b><span></span>')
            $(_fdms).html('<b>&nbsp;</b><span></span>')
            $(_zddj).html('<b>&nbsp;</b><span></span>')
            $(_zpfbl).html('<b>&nbsp;</b><span></span>')

            $(_sjxjk).html('<b>&nbsp;</b><span></span>')
            $(_ejjk).html('<b>&nbsp;</b><span></span>')
            $(_mhl).html('<b>&nbsp;</b><span></span>')
            $(_hdmi).html('<b>&nbsp;</b><span></span>')
            $(_wlan).html('<b>&nbsp;</b><span></span>')
            $(_dlna).html('<b>&nbsp;</b><span></span>')
            $(_wlanrd).html('<b>&nbsp;</b><span></span>')
            $(_dphd).html('<b>&nbsp;</b><span></span>')
            $(_ly).html('<b>&nbsp;</b><span></span>')
            $(_hwyk).html('<b>&nbsp;</b><span></span>')
            $(_tjt).html('<b>&nbsp;</b><span></span>')
            $(_mhlzhdmi).html('<b>&nbsp;</b><span></span>')
            $(_gps).html('<b>&nbsp;</b><span></span>')

            $(_zlgyq).html('<b>&nbsp;</b><span></span>')
            $(_gxcgq).html('<b>&nbsp;</b><span></span>')
            $(_jlcgq).html('<b>&nbsp;</b><span></span>')
            $(_hwcgq).html('<b>&nbsp;</b><span></span>')
            $(_wdcgq).html('<b>&nbsp;</b><span></span>')
            $(_hecgq).html('<b>&nbsp;</b><span></span>')
            $(_tly).html('<b>&nbsp;</b><span></span>')
            $(_znz).html('<b>&nbsp;</b><span></span>')
            $(_nfc).html('<b>&nbsp;</b><span></span>')
        }
    }

    addCampareClass();

}

var _allPhoneName = [];

function getModelList() {
    $.post('/products/all_phone/', {'device_name': name}, function (data) {
        $.each(data, function (i, n) {
            _allPhoneName.push(n.device_name)
        })
        for (var i = 0; i < 4; i++) {
            var _model_selectcon = $('.page-campare').find('.model-select')[i];
            var _dropdown = $(_model_selectcon).find('.dropdown')
            for (var j = 0; j < _allPhoneName.length; j++) {
                var _li = document.createElement("li");
                $(_li).html(_allPhoneName[j])
                $(_dropdown).append(_li)
            }
        }
    }, "json")
}

var _versionArr = [];

function getXHlist(name, num) {
    _versionArr = [];
    var _version_selectcon = $('.page-campare').find('.version-select')[num];
    var _dropdown = $(_version_selectcon).find('.dropdown')
    var url = "/products/phone_specification/"
    $.post(url, {'device_name': name}, function (data) {
        $.each(data, function (i, n) {
            _versionArr.push(n.edition_name)
        })
        $(_dropdown).empty()
        $(_dropdown).attr('name', name)
        console.log(_versionArr + '?' + num)
        for (var i = 0; i < _versionArr.length; i++) {
            var _li = document.createElement("li");
            $(_li).html(_versionArr[i])
            $(_dropdown).append(_li)
        }
    }, "json")
}

function addCampareClass() {
    for (var i = 0; i < $('#canChange').find('tr').length; i++) {
        var _tr = $('#canChange').find('tr')[i];
        var _arr = [];
        for (var j = 0; j < _campareData.length; j++) {
            if (_campareData[j] != null) {
                var _span = $($(_tr).find('td')[j]).find('span');
                _arr.push($(_span).text())
            }
        }

        if (isAllEqual(_arr)) {
            if (_arr[0] == '' || _arr[0] == ' ') {
                $(_tr).css({'display': 'none'})
            }
            else {
                $(_tr).css({'display': 'block'})
                $(_tr).removeClass('bg-same').removeClass('bg-blue').addClass('bg-same')
            }
        }
        else {
            $(_tr).css({'display': 'block'})
            $(_tr).removeClass('bg-same').removeClass('bg-blue').addClass('bg-blue')
        }
    }
}

function isAllEqual(array) {
    if (array.length > 0) {
        return !array.some(function (value, index) {
            return value !== array[0];
        });
    } else {
        return true;
    }
}


//导航搜索验证
function toSearchVoid() {
    if ($('#search').val().length <= 0) {
        alert("请输入关键字")
        return false;
    }
    else {
        _jcq.push(['_track', 'Search', {keyword: $('#search').val()}]);
        return true;
    }
}

function toProSearchVoid() {
    if ($('#searchPro').val().length <= 0) {
        alert("请输入关键字")
        return false;
    }
    else {
        return true;
    }
}


//获取是否为第一次打开首页
isFirstAlertSession = $.session.get('alertsession');
console.log('isFirstAlertSession === ' + isFirstAlertSession)

if (isFirstAlertSession == '' || isFirstAlertSession == null) {

    $.session.set('alertsession', '0');
    $('#video_alert').css({'z-index': 999999})
    $('#video_alert').show()

} else {

    if ($('#video_alert').length) {
        $('#video_alert').hide()
        var _video = $('#video_alert video')[0]
        _video.pause()
    }

}
