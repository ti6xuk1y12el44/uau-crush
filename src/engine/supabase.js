const SUPABASE_URL = "https://shdiqihnykypvxemkcbf.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZGlxaWhueWt5cHZ4ZW1rY2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1Mzk4NzUsImV4cCI6MjEwMDExNTg3NX0.4fP_OKYM8WMte9eD-_DBjM1qtEjYaBJSQIb_CVKSVX8";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

export async function submitScore(playerName, score, level, levelName, stars) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        player_name: playerName,
        score,
        level,
        level_name: levelName,
        stars,
      }),
    });
    return await res.json();
  } catch (e) {
    console.error("Submit score error:", e);
    return null;
  }
}

export async function getLeaderboard(limit = 100) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?select=*&order=score.desc&limit=${limit}`,
      { headers }
    );
    return await res.json();
  } catch (e) {
    console.error("Leaderboard error:", e);
    return [];
  }
}