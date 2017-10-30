/**
 * Created by acera on 2017/10/29.
 */
// 3. 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('myBox1'));
// 绘制柱状图, 需要哪些东西?
// 标题, x轴, y轴, 数据
// 4. 配置数据
var option = {
    // 标题
    title: {
        text: "2017年注册人数"
    },
    // 写个 tooltip:{}, 就是在告诉 echarts 我需要提示框
    // 提示框
    tooltip: {},
    // 图例
    legend: {
        data: ["人数"]
    },
    // x轴
    xAxis: {
        data: ["一月", "二月", "三月", "四月", "五月", "六月"]
    },
    // y轴
    yAxis: {
        // y轴里面的 data, 最好通过数据动态生成
        //      data: [ 10, 20, 30, 40 ]
    },
    // 数据, 有可能有多组数据对比, 所以是一个数组
    series: [{
        name: "人数",
        type: "bar", // type: bar 柱状图, line 折线图, pie 饼图
        data: [150, 130, 180, 120, 250, 200]
    }, ]
};
var myChart2 = echarts.init(document.getElementById('myBox2'));
// 5. 通过 setOption方法, 根据 option 生成图标
var option1 = {
    // 标题
    title: {
        text: "热门品牌销售",
        x: "center"
    },
    // 写个 tooltip:{}, 就是在告诉 echarts 我需要提示框
    // 提示框
    tooltip: {},
    // 图例
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ["耐克", "阿迪", "李宁", "361", "新百伦"]
    },
    // x轴
    // xAxis: {
    //     data: ["耐克", "阿迪", "李宁", "361", "新百伦"]
    // },
    // y轴
    // yAxis: {
    //     // y轴里面的 data, 最好通过数据动态生成
    //     //      data: [ 10, 20, 30, 40 ]
    // },
    // 数据, 有可能有多组数据对比, 所以是一个数组
    series: [{
            name: ["耐克"],
            type: "pie", // type: bar 柱状图, line 折线图, pie 饼图
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 80, name: "耐克" },
                { value: 234, name: "阿迪" },
                { value: 56, name: "李宁" },
                { value: 443, name: "361" },
                { value: 686, name: "新百伦" }
            ]
        }, ]
        // itemStyle: [{
        //     emphasis: {
        //         shadowBlur: 10,
        //         shadowOffsetX: 0,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //     }
        // }]
};

myChart.setOption(option);
myChart2.setOption(option1);