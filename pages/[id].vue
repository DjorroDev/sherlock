<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const params = route.params.id;
const name = params.replaceAll("-", " ");

const { data, pending, errorr } = await useAsyncData("contracts", () =>
  $fetch(`${config.apiSecret}/api/contracts-by-name/${name}`)
);

const isOpen = ref(false);
const { coords, locatedAt, error, resume, pause } = useGeolocation();

onMounted(() => {
  isOpen.value = true;
});

function sendLocation() {
  // console.log(data.value.data.id, coords.value.latitude, coords.value.longitude, error.value, "p");
  const res = useFetch(
    `/api/locationHistories?id=${data.value.data.id}&latitude=${coords.value.latitude}&longitude=${coords.value.longitude}`
  );
  return false;
}

// function accessLocation() {
//   const { coords, locatedAt, error, resume, pause } = useGeolocation();
//   setTimeout(() => {
//     console.log(
//       data.value.data.id,
//       coords.value.latitude,
//       coords.value.longitude,
//       error.value,
//       "p"
//     );
//   }, 100);
//   resume;

//   if (!error) {
// $fetch("/api/contact", {
//   method: "POST",
//   body: { contract_id: data.data.id, latitude: coords.latitude, longitude: coords.longitude },
// });
//   }
// }

useHead({
  title: "BFI TAGIHAN",
  htmlAttrs: {
    lang: "id",
  },
  meta: [
    {
      hid: "og:image:secure_url",
      property: "og:image:secure_url",
      content: `https://gcdnb.pbrd.co/images/0vkymoEyd5AF.jpg`,
    },

    {
      hid: "og:image",
      property: "og:image",
      content: `https://gcdnb.pbrd.co/images/0vkymoEyd5AF.jpg`,
    },
    {
      hid: "og:image:width",
      property: "og:image:width",
      content: `400`,
    },
    {
      hid: "og:image:height",
      property: "og:image:height",
      content: `300`,
    },
  ],
});
</script>

<template>
  <div v-if="!errorr">
    <div class="min-h-screen flex items-center">
      <img
        class="overflow-x-auto my-auto"
        src="https://gcdnb.pbrd.co/images/0vkymoEyd5AF.jpg"
        alt="tagihan"
      />
    </div>
    <!-- <img src="http://127.0.0.1:5000/static/DAMIAN.jpg" alt="" /> -->
    <!-- <UButton>buka</UButton> -->
    <!-- <pre>Accuracy: {{ coords.accuracy }}</pre>
    <pre>Longitude: {{ coords.longitude }}</pre>
    <pre>Latitude: {{ coords.latitude }}</pre>
    <pre>{{ error }}</pre> -->
    <!-- <ULink
      target="_blank"
      :to="`https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`"
      >GMaps</ULink
    > -->
    <!-- <UButton @click="resume">resume</UButton>
    <UButton @click="pause">pause</UButton> -->
    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: '' }">
        <template #header>
          <h1 class="text-4xl">BFI</h1>
        </template>
        <h3 class="text-xl">{{ data.data.customer.name }} - {{ data.data.application_id }}</h3>
        <template #footer class="flex justify-end">
          <div class="flex justify-end">
            <UButton variant="ghost" @click="isOpen = sendLocation()"> LIHAT TAGIHAN</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
    <!-- <pre>{{ data.data }}</pre> -->
  </div>
  <div v-else>No data</div>
</template>
