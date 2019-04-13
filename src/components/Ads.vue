<template>
    <div>
        <h2>Ads</h2>
        <div class="row">
            <div class="col-sm-12">
                <router-link :to="'ads/new'" class="btn btn-primary">Create</router-link>
            </div>
        </div>
        <br>
        <div class="row"  v-if="progressFile !=0">
            <div class="col-sm-12">
                <p>File loading...</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar"  :style="{width: progressFile + '%'}" aria-valuemin="0" aria-valuemax="100">{{progressFile}}%</div>
                </div>
            </div>
        </div>
        <div class="card w-100 mt-2" v-for="ad of ads">
            <div class="card-body">
                <router-link :to="'/ads/' + ad.id" tag="h5" class="card-title" style="cursor: pointer">
                    {{ad.title}}
                </router-link>
                <p class="card-text">{{ad.desc}}</p>
                <router-link :to="'/ads/' + ad.id + '/edit'" class="btn btn-warning m-2">Edit</router-link>
                <a href="#" class="btn btn-danger" @click.prevent="adDelete(ad.id)">Delete</a>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Ads",
        computed: {
            ads() {
                return this.$store.getters.getAds;
            },
            progressFile() {
                return this.$store.getters.getFileProgress;
            }
        },
        methods: {
            adDelete(id) {
                this.$store.dispatch('deleteAd', id)
                    .then(() => {
                        this.$store.dispatch('getAllAds');
                    })
            }
        }
    }
</script>

<style scoped>

</style>
