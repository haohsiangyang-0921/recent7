// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  // 算出 7 天前的日期（含今天，共 7 天）
  const todayDate = new Date(today);
  const cutoff = new Date(todayDate);
  cutoff.setDate(cutoff.getDate() - 6); // today - 6 天 = 7 天範圍
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  let minutes = 0;
  let count = 0;

  for (const r of records) {
    // 日期在範圍內（cutoff ≤ log_date ≤ today）
    if (r.log_date >= cutoffStr && r.log_date <= today) {
      count++;
      if (r.minutes != null) minutes += r.minutes;
    }
  }

  return { minutes, count };
}
