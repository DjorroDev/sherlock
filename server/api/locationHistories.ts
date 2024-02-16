export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  $fetch("http://127.0.0.1:5000/api/location-histories/", {
    method: "POST",
    body: {
      contract_id: Number(query.id),
      latitude: query.latitude,
      longitude: query.longitude,
    },
    headers: { "Content-Type": "application/json" },
  });
  return "ok";
});
