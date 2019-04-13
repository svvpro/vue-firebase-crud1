<template>
    <div v-if="ad">
        <img src="https://loremflickr.com/320/240" alt="">
        <h2>{{ad.title}}</h2>
        <p>{{ad.desc}}</p>
    </div>
</template>

<script>
    export default {
        name: "Ad",
        props: ['id'],
        computed: {
            ad() {
                return this.$store.getters.getAdById(this.id);
            },
            progessFile() {
                return this.$store.getters.getFileProgress
            }
        }
    }
</script>

<style scoped>

</style>
