
window.onload = function () {
  var dataPoints1 = [], dataPoints2 = [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    theme: "light2",
    animationEnabled: true,
    title:{
      text:"Multi-Series StockChart with Navigator"
    },
    subtitles: [{
      text: "No of Trades: BTC/USD vs BTC/EUR"
    }],
    charts: [{
      axisY: {
        title: "No of Trades"
      },
      toolTip: {
        shared: true
      },
      legend: {
            cursor: "pointer",
            itemclick: function (e) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible)
                e.dataSeries.visible = false;
              else
                e.dataSeries.visible = true;
              e.chart.render();
            }
        },
      data: [{
        showInLegend: true,
        name: "No of Trades in $",
        yValueFormatString: "#,##0",
        xValueType: "dateTime",
        dataPoints : dataPoints1
      },{
        showInLegend: true,
        name: "No of Trades in €",
        yValueFormatString: "#,##0",
        dataPoints : dataPoints2
      }]
    }],
    rangeSelector: {
      enabled: false
    },
    navigator: {
      data: [{
        dataPoints: dataPoints1
      }],
      slider: {
        minimum: new Date(2018, 00, 15),
        maximum: new Date(2018, 02, 01)
      }
    }
  });
  $.getJSON("https://canvasjs.com/data/docs/btcvolume2018.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dataPoints1.push({x: new Date(data[i].date), y: Number(data[i].volume_btc_usd)});
      dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume_btc_eur)});
    }
    stockChart.render();
  });
}
