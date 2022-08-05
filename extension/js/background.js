console.log('Simple Chrome Translator：扩展执行');



// function GetXmlHttpObject() {
//     var objXMLHttp = null;
//     if (window.XMLHttpRequest) {
//         objXMLHttp = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         objXMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     return objXMLHttp;
// }

// const xhr = new GetXmlHttpObject();

async function getJSON(url) {
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('Request Failed', error);
    }
}



/**
 * 封装ajax
 */
const MyHttp = {
    get: async (url, success) => {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        // var xhr = new XMLHttpRequest();

        // const xhr = new XMLHttpRequest()
        // xhr.open('GET', url, true);
        // xhr.onreadystatechange = function () {
        //     // readyState == 4说明请求已完成
        //     if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
        //         // 从服务器获得数据 
        //         success(xhr.responseText);
        //     }
        // };
        // xhr.send();
        try {
            let response = await fetch(url);
            // return await response.json();
            console.log(response);
            success(response.json());
        } catch (error) {
            console.log('Request Failed', error);
        }

    },
}





/**
 * 封装对话框
 */
const MyDialog = {
    show: (str) => {
        alert(str)
        console.log(str);
    }
}



// // 添加使用默认搜索引擎搜索
// chrome.contextMenus.create({
//     id: "aasdas",
//     title: '翻译: 【%s】', // %s表示选中的文字
//     contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单

//     // onclick: async function (params) {
//     //     await MyHttp.get(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${params.selectionText}`, (res) => {
//     //         let obj = JSON.parse(res)
//     //         let result = obj.translateResult[0][0]['tgt'];
//     //         console.log(result);

//     //         MyDialog.show('翻译：' + params.selectionText + '\n' + '结果：' + result);
//     //     });
//     // }

// });

// const url = 'https://i.stack.imgur.com/HF6fu.jpg';

// chrome.notifications.create(
//     'notify_alert1', // notifyId
//     {
//         type: "basic",
//         iconUrl: url,
//         title: "更新完成！",
//         message: "请查看页面数据是否已更新。"
//     }
// );

// const url = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAA==";


// const response = await fetch('https://yourexternalimageurl.com/image.jpg');
// const blob = await response.blob();
// const url = URL.createObjectURL(blob);



// chrome.notifications.create(null, {
//     type: 'basic',
//     iconUrl: url,
//     title: 'Title',
//     message: 'Message',
// });


// 添加使用默认搜索引擎搜索
chrome.contextMenus.create({
    id: "translate",
    title: '翻译: 【%s】', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
});

// 点击菜单的回调
chrome.contextMenus.onClicked.addListener(async (info, tab) => {

    // console.log(tab);

    // chrome.tabs.executeScript(tab.id, { file: 'js/alert.js' });

    // chrome.scripting.executeScript({
    //     target: {
    //         tabId: tab.id,
    //         allFrames: true
    //     },
    //     files: ['js/alert.js'],
    // });

    // 获取选中的文本
    text = '';
    if (info.menuItemId === 'translate') {
        text = info.selectionText;
    }

    let r = await getJSON(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${text}`);
    // let obj = JSON.parse(r);
    result = r.translateResult[0][0]['tgt'];
    // MyDialog.show('翻译：' + text + '\n' + '结果：' + result);
    // Dialog(result);

    const url = 'https://i.stack.imgur.com/HF6fu.jpg';

    chrome.notifications.create(
        'simple-chrome-translator-notification', {
            type: "basic",
            iconUrl: url,
            title: `翻译：${text}`,
            message: `结果：${result}`,
            contextMessage: 'Simple Chrome Translator'
        }
    );



    // console.log(tr);

    // console.log(text);
    // await MyHttp.get(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${text}`, (res) => {
    //     let obj = JSON.parse(res)
    //     let result = obj.translateResult[0][0]['tgt'];
    //     console.log(result);

    //     MyDialog.show('翻译：' + text + '\n' + '结果：' + result);
    // });

    // let res = await getJSON(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${text}`);
    // console.log(res);


});




// // 添加图标的点击事件
// chrome.browserAction.onClicked.addListener(function (tab) {
//     MyDialog.show('Simple Chrome Translator');
// });