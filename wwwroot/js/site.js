document.addEventListener("DOMContentLoaded", function () {
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
});