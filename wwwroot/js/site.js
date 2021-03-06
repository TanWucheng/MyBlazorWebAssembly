/**
 * 根据UA获取浏览器平台信息
 * @constructor
 */
const BrowserType = () => {
    const ua = navigator.userAgent.toLowerCase();
    const testUa = regexp => regexp.test(ua);
    const testVs = regexp => ua.match(regexp).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".");

    /**系统*/
    let system = "unknown";
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
        system = "windows"; // windows系统
    } else if (testUa(/macintosh|macintel/g)) {
        system = "macos"; // macos系统
    } else if (testUa(/x11/g)) {
        system = "linux"; // linux系统
    } else if (testUa(/android|adr/g)) {
        system = "android"; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
        system = "ios"; // ios系统
    }

    /**系统版本*/
    let systemVersion = "unknown";
    if (system === "windows") {
        if (testUa(/windows nt 5.0|windows 2000/g)) {
            systemVersion = "2000";
        } else if (testUa(/windows nt 5.1|windows xp/g)) {
            systemVersion = "xp";
        } else if (testUa(/windows nt 5.2|windows 2003/g)) {
            systemVersion = "2003";
        } else if (testUa(/windows nt 6.0|windows vista/g)) {
            systemVersion = "vista";
        } else if (testUa(/windows nt 6.1|windows 7/g)) {
            systemVersion = "7";
        } else if (testUa(/windows nt 6.2|windows 8/g)) {
            systemVersion = "8";
        } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
            systemVersion = "8.1";
        } else if (testUa(/windows nt 10.0|windows 10/g)) {
            systemVersion = "10";
        }
    } else if (system === "macos") {
        systemVersion = testVs(/os x [\d._]+/g);
    } else if (system === "android") {
        systemVersion = testVs(/android [\d._]+/g);
    } else if (system === "ios") {
        systemVersion = testVs(/os [\d._]+/g);
    }

    /**平台*/
    let platform = "unknown";
    if (system === "windows" || system === "macos" || system === "linux") {
        platform = "desktop"; // 桌面端
    } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
        platform = "mobile"; // 移动端
    }

    /**内核*/
    let engine = "unknown";
    /**载体*/
    let supporter = "unknown";
    if (testUa(/applewebkit/g)) {
        engine = "webkit"; // webkit内核
        if (testUa(/edge/g)) {
            supporter = "edge"; // edge浏览器
        } else if (testUa(/opr/g)) {
            supporter = "opera"; // opera浏览器
        } else if (testUa(/chrome/g)) {
            supporter = "chrome"; // chrome浏览器
        } else if (testUa(/safari/g)) {
            supporter = "safari"; // safari浏览器
        }
    } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
        engine = "gecko"; // gecko内核
        supporter = "firefox"; // firefox浏览器
    } else if (testUa(/presto/g)) {
        engine = "presto"; // presto内核
        supporter = "opera"; // opera浏览器
    } else if (testUa(/trident|compatible|msie/g)) {
        engine = "trident"; // trident内核
        supporter = "iexplore"; // ie浏览器
    }

    /**内核版本*/
    let engineVersion = "unknown";
    if (engine === "webkit") {
        engineVersion = testVs(/applewebkit\/[\d._]+/g);
    } else if (engine === "gecko") {
        engineVersion = testVs(/gecko\/[\d._]+/g);
    } else if (engine === "presto") {
        engineVersion = testVs(/presto\/[\d._]+/g);
    } else if (engine === "trident") {
        engineVersion = testVs(/trident\/[\d._]+/g);
    }

    /**载体版本*/
    let supporterVersion = "unknown";
    if (supporter === "chrome") {
        supporterVersion = testVs(/chrome\/[\d._]+/g);
    } else if (supporter === "safari") {
        supporterVersion = testVs(/version\/[\d._]+/g);
    } else if (supporter === "firefox") {
        supporterVersion = testVs(/firefox\/[\d._]+/g);
    } else if (supporter === "opera") {
        supporterVersion = testVs(/opr\/[\d._]+/g);
    } else if (supporter === "iexplore") {
        supporterVersion = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
    } else if (supporter === "edge") {
        supporterVersion = testVs(/edge\/[\d._]+/g);
    }

    /**外壳*/
    let shell = "none";
    /**外壳版本*/
    let shellVersion = "unknown";
    if (testUa(/micromessenger/g)) {
        shell = "wechat"; // 微信浏览器
        shellVersion = testVs(/micromessenger\/[\d._]+/g);
    } else if (testUa(/qqbrowser/g)) {
        shell = "qq"; // QQ浏览器
        shellVersion = testVs(/qqbrowser\/[\d._]+/g);
    } else if (testUa(/ucbrowser/g)) {
        shell = "uc"; // UC浏览器
        shellVersion = testVs(/ucbrowser\/[\d._]+/g);
    } else if (testUa(/qihu 360se/g)) {
        shell = "360"; // 360浏览器(无版本)
    } else if (testUa(/2345explorer/g)) {
        shell = "2345"; // 2345浏览器
        shellVersion = testVs(/2345explorer\/[\d._]+/g);
    } else if (testUa(/metasr/g)) {
        shell = "sougou"; // 搜狗浏览器(无版本)
    } else if (testUa(/lbbrowser/g)) {
        shell = "liebao"; // 猎豹浏览器(无版本)
    } else if (testUa(/maxthon/g)) {
        shell = "maxthon"; // 遨游浏览器
        shellVersion = testVs(/maxthon\/[\d._]+/g);
    }


    return Object.assign({
        engine, // webkit gecko presto trident
        engineVersion,
        platform, // desktop mobile
        supporter, // chrome safari firefox opera iexplore edge
        supporterVersion,
        system, // windows macos linux android ios
        systemVersion
    }, shell === "none" ? {} : {
        shell, // wechat qq uc 360 2345 sougou liebao maxthon
        shellVs: shellVersion
    });
};

/**
 * 渲染Markdown文件
 * @param {string} fileName Markdown文件名称
 * @param {string} modalId modal ID
 * @param {string} elemId 元素Id
 */
const showBlogModal = (fileName, modalId, elemId) => {
    const modalElem = document.getElementById(modalId);
    if (modalElem) {
        const modal = M.Modal.getInstance(modalElem);
        modal.open();
        modalElem.style.maxHeight = "80%";
        modalElem.style.height = "80%";
        modalElem.style.width = "75%";
        renderMarkdown(fileName, elemId);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const browserType = BrowserType();
    if (browserType.platform === "desktop") {
        let arrIndex = 0;
        document.body.addEventListener(
            "click",
            function (e) {
                const r = Math.random() * 255;
                const g = Math.random() * 255;
                const b = Math.random() * 255;
                const color = "rgb(" + r + "," + g + "," + b + ")";
                const arr = [
                    "人之初，性本善", "性相近，习相远",
                    "苟不教，性乃迁", "教之道，贵以专",
                    "昔孟母，择邻处", "子不学，断机杼",
                    "窦燕山，有义方", "教五子，名俱扬",
                    "养不教，父之过", "教不严，师之惰",
                    "子不学，非所宜", "幼不学，老何为",
                    "玉不琢，不成器", "人不学，不知义"
                ];
                const promptSpan = document.createElement("span");
                promptSpan.innerText = arr[arrIndex];
                arrIndex = (arrIndex + 1) % arr.length;
                const x = e.pageX;
                const y = e.pageY;
                const size = Math.random() * 10 + 8 + "px";
                promptSpan.style.zIndex = 99999;
                promptSpan.style.top = `${y - 20}px`;
                promptSpan.style.left = `${x}px`;
                promptSpan.style.position = "absolute";
                promptSpan.style.fontWeight = "800";
                promptSpan.style.fontSize = size;
                promptSpan.style.color = color;
                document.body.append(promptSpan);
                promptSpan.animate(
                    [
                        // keyframes
                        {transform: "translateY(-200px)"},
                    ],
                    {
                        // timing options
                        duration: 1500,
                        iterations: 1,
                    }
                ).onfinish = () => {
                    promptSpan.remove();
                };
            },
            false
        );
    }
});

/**
 * materialize组件初始化
 */
window.materializeComponentInit = () => {
    const sideNavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNavElems, {});

    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems, {});

    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems, {dismissible: false});
};

/**
 * 渲染Markdown文件
 * @param {string} fileName Markdown文件名称
 * @param {string} elemId 元素Id
 */
window.renderMarkdown = (fileName, elemId) => {
    const element = document.getElementById(elemId);
    if (element) {
        fetch(`Markdown/${fileName}`, {method: "GET"}).then(response => {
            if (response.ok) {
                response.text().then(responseText => {
                    element.innerHTML = marked(responseText);
                }).catch(error => {
                    console.error(error);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }
};