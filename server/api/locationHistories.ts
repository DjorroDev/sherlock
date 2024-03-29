export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  $fetch(`${process.env["NUXT_API_SECRET"]}/api/location-histories/`, {
    method: "POST",
    body: {
      contract_id: query.id,
      latitude: query.latitude,
      longitude: query.longitude,
      accuracy: query.accuracy,
    },
    headers: { "Content-Type": "application/json" },
  });
  return true;
});
