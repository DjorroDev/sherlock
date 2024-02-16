export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return $fetch("http://localhost:5000/api/contracts/" + query.id);
});
