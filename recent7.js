// recent7.js

function recent7(records, today) {
  // 計算 7 天的起始日（今天往前 6 天）
  var todayMs = new Date(today).getTime();
  var startMs = todayMs - 6 * 24 * 60 * 60 * 1000; // 6 天前，含今天共 7 天

  var totalMinutes = 0;
  var count = 0;

  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    var dateMs = new Date(r.log_date).getTime();

    // 規則 1 & 2：只算 startMs～todayMs 範圍內
    if (dateMs < startMs || dateMs > todayMs) continue;

    // 規則 3：minutes 為 null、undefined 或 0 視為無效
    var m = r.minutes;
    if (m == null || m === 0) continue;

    // 規則 5：有效範圍 10～120 分鐘（含邊界）
    if (m < 10 || m > 120) continue;

    totalMinutes += m;
    count += 1;
  }

  // 規則 4：無有效紀錄時回傳 { minutes: 0, count: 0 }
  return { minutes: totalMinutes, count: count };
}
