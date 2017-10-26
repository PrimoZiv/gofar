<template>
    <div>
        <problem-item v-for="p in problems" :key="p.key" :data="p"></problem-item>
    </div>
</template>

<script>
import ProblemItem from './ProblemItem'
export default {
    name: 'Problems',
    data () {
        return {
            problems: []
        }
    },
    mounted () {
        this.$getData('/static/data/problems.json').then(data => {
            this.problems = this.problems.concat(data)
        })
    },
    components: {
        ProblemItem
    }
}
</script>

<style>

</style>
