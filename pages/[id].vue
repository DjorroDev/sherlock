<script setup>
const config = useRuntimeConfig();
const route = useRoute();

const params = route.params.id;
const name = params.replaceAll("-", " ");

const { data, pending, errorr } = await useAsyncData("contracts", () =>
  $fetch(`${config.apiSecret}/api/contracts-by-name/${name}`)
);

// console.log(data.value);

const isOpen = ref(false);
const { coords, locatedAt, error, resume, pause } = useGeolocation();

onMounted(() => {
  isOpen.value = true;
});

function sendLocation() {
  // console.log(data.value.data.id, coords.value.latitude, coords.value.longitude, error.value, "p");
  const res = useFetch(
    `/api/locationHistories?id=${data.value.data.id}&latitude=${coords.value.latitude}&longitude=${coords.value.longitude}&accuracy=${coords.value.accuracy}`
  );
  return false;
}

useHead({
  title: "BFI History Payment Customer",
  htmlAttrs: {
    lang: "id",
  },
  meta: [
    {
      hid: "og:image",
      property: "og:image",
      content: `${data.value.data.data}`,
    },
    {
      hid: "og:image:secure_url",
      property: "og:image:secure_url",
      content: `${data.value.data.data}`,
    },
    {
      hid: "og:image:width",
      property: "og:image:width",
      content: `1200`,
    },
    {
      hid: "og:image:height",
      property: "og:image:height",
      content: `627`,
    },
    {
      hid: "twitter:title",
      property: "twitter:title",
      content: ``,
    },
    {
      hid: "twitter:card",
      property: "twitter:card",
      content: `summary_large_image`,
    },
    {
      hid: "twitter:image",
      property: "twitter:image",
      content: `${data.value.data.data}`,
    },
  ],
});
</script>

<template>
  <div v-if="!errorr">
    <div class="min-h-screen flex items-center">
      <img class="overflow-x-auto my-auto" :src="data.data.data" alt="tagihan" />
    </div>
    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: '' }">
        <template #header>
          <h1 class="text-4xl">BFI FINANCE</h1>
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
