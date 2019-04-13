<template>
    <div v-if="adData">
        <h2>Edit: "{{ adData.title}}"</h2>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" placeholder="Title"
                       v-model="title"
                >
            </div>
            <div class="form-group">
                <label for="desc">Description</label>
                <textarea cols="30" rows="10" class="form-control"
                          v-model="desc"></textarea>
            </div>

            <div class="form-group">
                <img :src="imagePreview" v-if="imagePreview" height="200px">
                <br>
                <br>
                <input type="file" style="display: none" ref="inputFile" @change.stop="uploadImage($event)">
                <button type="button" class="btn btn-warning" @click.prevent="uploadFileTrigger">upload</button>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="submit">Submit</button>

        </form>
    </div>
</template>

<script>
    export default {
        name: "AdEdit",
        props: ['id'],
        data() {
            return {
                title: this.$store.getters.getAdById(this.id).title,
                desc:  this.$store.getters.getAdById(this.id).desc,
                image: null,
                imagePreview:  this.$store.getters.getAdById(this.id).imgSrc,
            }
        },
        computed: {
            adData() {
                return this.$store.getters.getAdById(this.id)
            }
        },
        methods: {
            submit() {
                const ad = {
                    id: this.$props.id,
                    title: this.title,
                    desc: this.desc,
                    imgSrc: this.image
                };

                this.$store.dispatch('updateAd', ad)
                    .then(() => {
                        this.$router.push('/ads');
                    });

                this.title = '';
                this.desc = '';
                this.imagePreview = null;
                this.image = null;
            },
            uploadFileTrigger() {
                this.$refs.inputFile.click();
            },
            uploadImage(event) {
                this.image = event.target.files[0];

                const reader = new FileReader();

                reader.onload = () => {
                    this.imagePreview = reader.result;
                };
                reader.readAsDataURL(this.image);
            }
        }
    }
</script>

<style scoped>

</style>
