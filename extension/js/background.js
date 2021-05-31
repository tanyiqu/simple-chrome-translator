console.log('Simple Chrome Translator：扩展执行');









// function loadExternalJs(success) {
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function (tabs) {
//         chrome.tabs.executeScript(tabs[0].id, {
//             file: 'js/axios.min.js'
//         });
//         success();
//     });
// }



function http(url, params) {
    return "";
}

var Ajax = {
    get: function (url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}


// 添加使用默认搜索引擎搜索
chrome.contextMenus.create({
    title: '翻译: 【%s】', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
        alert('翻译：' + params.selectionText)
    }
});


// 添加图标的点击事件
chrome.browserAction.onClicked.addListener(function (tab) {
    // alert('作者：tanyiqu\n项目地址：https://github.com/tanyiqu/simple-chrome-translator');

    console.log('send');
    
    Ajax.get('http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=apple', (a, b) => {
        console.log('success');
        console.log(a);
        console.log(b);
    });
    // loadExternalJs(() => {
    //     axios.get('/user?ID=12345')
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // });


});