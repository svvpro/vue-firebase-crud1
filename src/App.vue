<template>
    <div id="app">
        <div class="container">
            <ul class="nav">
                <router-link :to="'/'" tag="li" class="nav-item">
                    <a class="nav-link">Home</a>
                </router-link>
                <router-link :to="'/ads'" tag="li" class="nav-item">
                    <a class="nav-link">Ads</a>
                </router-link>
            </ul>

            <hr>

            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss">

</style>
