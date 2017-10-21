<template>
    <div class="footer">
        Copyright © 2017-{{year}} {{user}}.
    </div>
</template>

<script>
export default {
    name: 'FarFooter',
    data() {
        return {
            user: 'Primo',
            year: (new Date()).getFullYear()
        }
    }
}
</script>

<style scoped>
.footer {
    margin-top: 30px;
    line-height: 50px;
    text-align: center;
    font-size: 13px;
}
</style>
