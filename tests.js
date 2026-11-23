// tests.js：測試都寫在這個檔。一條測試呼叫一次 addCase，格式見 README.md。

// ── 規則 1：範圍含今天，往前推 6 天（共 7 天），第 8 天不算 ──────────────

addCase({
  name: '規則 1：今天的紀錄算在內',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 }
  ],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：範圍內最早一天（今天往前第 6 天）算在內',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-17', minutes: 20 }
  ],
  expect: { minutes: 20, count: 1 }
});

addCase({
  name: '規則 1：剛好滿 7 天前（11/16）不算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 30 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 1：範圍內多筆，分鐘數與筆數都累加',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: 30 },
    { log_date: '2026-11-22', minutes: 40 }
  ],
  expect: { minutes: 70, count: 2 }
});

// ── 規則 2：未來日期排除 ───────────────────────────────────────────────────

addCase({
  name: '規則 2：明天的紀錄不算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-24', minutes: 30 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 2：有效紀錄與未來紀錄混合，只算有效的',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 50 },
    { log_date: '2026-11-25', minutes: 60 }
  ],
  expect: { minutes: 50, count: 1 }
});

// ── 規則 3：minutes 為 null、undefined 或 0 視為無效 ──────────────────────

addCase({
  name: '規則 3：minutes 為 null 不計',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: null }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：minutes 欄位完全沒有（undefined）不計',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23' }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：minutes 為 0 視為無效不計',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 0 }
  ],
  expect: { minutes: 0, count: 0 }
});

// ── 規則 4：7 天內完全沒有有效紀錄，回傳 0 分鐘 0 筆 ───────────────────

addCase({
  name: '規則 4：records 是空陣列，回傳 0 分鐘 0 筆',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 4：所有紀錄都在範圍外，回傳 0 分鐘 0 筆',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 30 },
    { log_date: '2026-11-24', minutes: 30 }
  ],
  expect: { minutes: 0, count: 0 }
});

// ── 規則 5：有效範圍 10～120 分鐘（含邊界），超出不計且不加 count ─────────

addCase({
  name: '規則 5：剛好 10 分鐘，算有效',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 10 }
  ],
  expect: { minutes: 10, count: 1 }
});

addCase({
  name: '規則 5：剛好 120 分鐘，算有效',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 120 }
  ],
  expect: { minutes: 120, count: 1 }
});

addCase({
  name: '規則 5：少於 10 分鐘（9 分鐘），不計入分鐘數也不計入筆數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 9 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 5：超過 120 分鐘（121 分鐘），不計入分鐘數也不計入筆數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 121 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 5：有效與無效分鐘數混合，只累加有效的',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-22', minutes: 5 },
    { log_date: '2026-11-21', minutes: 200 }
  ],
  expect: { minutes: 30, count: 1 }
});
