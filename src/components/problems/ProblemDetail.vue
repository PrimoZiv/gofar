<template>
    <div>
        Problem Detail of {{key}}.
    </div>
</template>

<script>
export default {
    name: 'ProblemDetail',
    data() {
        return {
            key: parseInt(this.$route.params.key, 10)
        }
    }
}
</script>

<style>

</style>
