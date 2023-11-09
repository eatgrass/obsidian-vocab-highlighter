<script lang="ts">
export let variable: number
const incr = () => {
    variable++
}
</script>

<div class="number" style="border:none">
    <span>My number is {variable}!</span>
</div>
<span
    ><div>foo</div>
    <span>bar</span></span
>
<button on:click={incr}>button</button>

<div class="number" style="border:none">daf</div>

<style>
.number {
    color: red;
}
</style>
