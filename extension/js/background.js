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

const MyHttp = {
    get: (url, success) => {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                success(xhr.responseText);
            }
        };
        xhr.send();
    },
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

    MyHttp.get('http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=banana', (res) => {
        console.log('success');
        console.log(res);
        let obj = JSON.parse(res)
        console.log(obj);
        console.log(obj.translateResult);
        console.log(obj.translateResult[0]);
        console.log(obj.translateResult[0][0]);
        alert(obj.translateResult[0][0]['tgt'])
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