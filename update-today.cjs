// update-today.js
const fs = require('fs');
const https = require('https');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Node.js' } }, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', reject);
  });
}

const json = await fetchJSON(url);

// Debugging: print how many completions we fetched and the first few timestamps
console.log(`Fetched ${json.data.length} completions.`);
json.data.slice(0, 5).forEach((k, i) =>
  console.log(`${i+1}. ${k.name} – completedAt: ${k.completedAt}`)
);

const todayKatas = json.data.filter(k => k.completedAt.startsWith(today));

async function fetchKatas() {
  const username = 'codenamedon';  // ← replace this
  const today = new Date().toISOString().slice(0, 10);
  const url = `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=0`;

  const json = await fetchJSON(url);
  const todayKatas = json.data.filter(k => k.completedAt.startsWith(today));

  if (todayKatas.length === 0) {
    console.log('No katas completed today.');
    return;
  }

  const lines = todayKatas.map(
    k => `- [${k.name}](https://www.codewars.com/kata/${k.id})`
  );
  fs.writeFileSync('today.md', lines.join('\n') + '\n');
  console.log(`Wrote ${todayKatas.length} kata(s) to today.md`);
}

fetchKatas().catch(err => {
  console.error(err);
  process.exit(1);
});
