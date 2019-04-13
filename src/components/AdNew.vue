<template>
    <div>
        <h2>Ad new</h2>
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
        name: "AdNew",
        data() {
            return {
                title: '',
                desc: '',
                image: null,
                imagePreview: null
            }
        },
        methods: {
            submit() {
                const ad = {
                    title: this.title,
                    desc: this.desc,
                    imgSrc: this.image
                };

                this.$store.dispatch('createAd', ad)
                    .then(() => {
                        this.$router.push('/ads')
                    })
                    .catch(e => {
                        console.log(e)
                    });

                this.title = '';
                this.desc = '';
                this.image = null;
                this.imagePreview = null;
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
